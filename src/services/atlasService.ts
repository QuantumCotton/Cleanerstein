// Atlas AI Service - Conversation Engine & Lead Qualification
import { callGeminiAPI, GeminiMessage, CONTRACTOR_ACQUISITION_PROMPT } from './geminiService';

export interface AtlasMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
  leadData?: Partial<LeadData>;
  qualificationScore?: number;
}

export interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  zip?: string;
  projectType?: 'kitchen' | 'bathroom' | 'other';
  timeline?: string;
  budget?: string;
  propertyType?: string;
  currentStatus?: string;
  details?: string;
}

export interface AtlasConversation {
  id: string;
  startedAt: Date;
  messages: AtlasMessage[];
  leadData: LeadData;
  qualificationScore: number; // 0-100
  stage: ConversationStage;
  isQualified: boolean;
  transferredToHuman: boolean;
}

export type ConversationStage = 
  | 'greeting'
  | 'discovery'
  | 'qualification'
  | 'scheduling'
  | 'completed'
  | 'disqualified';

// Conversation state machine
class AtlasEngine {
  private conversation: AtlasConversation;

  constructor(conversationId: string) {
    this.conversation = {
      id: conversationId,
      startedAt: new Date(),
      messages: [],
      leadData: {},
      qualificationScore: 0,
      stage: 'greeting',
      isQualified: false,
      transferredToHuman: false
    };
    
    // Add initial greeting
    this.addMessage({
      role: 'assistant',
      content: `Hi! I'm Atlas from Elite Service Hub. 👋

Are you a contractor looking to grow your business? We build professional websites and generate qualified leads for kitchen and bathroom remodeling contractors.

What brings you here today?`,
      quickReplies: ['I am a Contractor', 'Looking for a Contractor', 'Tell Me More']
    });
  }

  private addMessage(msg: Omit<AtlasMessage, 'id' | 'timestamp'>) {
    const message: AtlasMessage = {
      ...msg,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };
    this.conversation.messages.push(message);
  }

  async processUserMessage(userInput: string): Promise<AtlasMessage> {
    // Analyze user input and extract data
    await this.analyzeInput(userInput);
    
    // Update qualification score
    this.updateQualificationScore();
    
    // Generate appropriate response based on stage
    const response = await this.generateResponse(userInput);
    
    // Add assistant message
    this.addMessage(response);
    
    return this.conversation.messages[this.conversation.messages.length - 1];
  }

  private async analyzeInput(input: string): Promise<void> {
    const lowerInput = input.toLowerCase();
    
    // Extract project type
    if (!this.conversation.leadData.projectType) {
      if (lowerInput.includes('kitchen')) {
        this.conversation.leadData.projectType = 'kitchen';
      } else if (lowerInput.includes('bathroom') || lowerInput.includes('bath')) {
        this.conversation.leadData.projectType = 'bathroom';
      }
    }
    
    // Extract timeline
    if (!this.conversation.leadData.timeline) {
      if (lowerInput.includes('asap') || lowerInput.includes('immediately') || lowerInput.includes('soon')) {
        this.conversation.leadData.timeline = 'ASAP';
      } else if (lowerInput.match(/\d+\s*(month|week)/)) {
        this.conversation.leadData.timeline = input;
      }
    }
    
    // Extract budget signals
    if (!this.conversation.leadData.budget) {
      const budgetMatch = lowerInput.match(/\$?\d+[k,]?\d*k?/);
      if (budgetMatch) {
        this.conversation.leadData.budget = budgetMatch[0];
      } else if (lowerInput.includes('flexible') || lowerInput.includes('depends')) {
        this.conversation.leadData.budget = 'Flexible';
      }
    }
    
    // Extract contact info
    const emailMatch = input.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch && !this.conversation.leadData.email) {
      this.conversation.leadData.email = emailMatch[0];
    }
    
    const phoneMatch = input.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (phoneMatch && !this.conversation.leadData.phone) {
      this.conversation.leadData.phone = phoneMatch[0];
    }
    
    const zipMatch = input.match(/\b\d{5}\b/);
    if (zipMatch && !this.conversation.leadData.zip) {
      this.conversation.leadData.zip = zipMatch[0];
    }
  }

  private updateQualificationScore(): void {
    let score = 0;
    const data = this.conversation.leadData;
    
    // Scoring criteria
    if (data.projectType) score += 15;
    if (data.timeline) score += 10;
    if (data.budget) score += 20;
    if (data.zip) score += 15;
    if (data.email) score += 20;
    if (data.phone) score += 20;
    
    // Bonus for high-value indicators
    if (data.budget && (data.budget.includes('50') || data.budget.includes('75') || data.budget.includes('100'))) {
      score += 10;
    }
    
    if (data.timeline === 'ASAP') {
      score += 5;
    }
    
    this.conversation.qualificationScore = Math.min(score, 100);
    this.conversation.isQualified = score >= 60;
  }

  private async generateResponse(userInput: string): Promise<Omit<AtlasMessage, 'id' | 'timestamp'>> {
    const { leadData, qualificationScore } = this.conversation;
    
    // Build conversation history for Gemini
    const geminiMessages: GeminiMessage[] = this.conversation.messages
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));
    
    // Add current context to system prompt
    const contextPrompt = `${CONTRACTOR_ACQUISITION_PROMPT}

CURRENT CONVERSATION CONTEXT:
- Collected Data: ${JSON.stringify(leadData)}
- Qualification Score: ${qualificationScore}/100
- User just said: "${userInput}"

Based on what you know, ask the NEXT most relevant question to qualify this contractor. Keep it conversational and natural.`;
    
    // Call Gemini API
    const aiResponse = await callGeminiAPI(geminiMessages, contextPrompt);
    
    // Determine if we should provide quick replies based on context
    const quickReplies = this.generateQuickReplies(leadData);
    
    return {
      role: 'assistant',
      content: aiResponse,
      quickReplies
    };
  }
  
  private generateQuickReplies(leadData: LeadData): string[] | undefined {
    // Provide quick replies based on missing data
    if (!leadData.projectType) {
      return ['Kitchen Remodeling', 'Bathroom Remodeling', 'Both'];
    }
    if (!leadData.timeline) {
      return ['ASAP', '1-3 months', '3-6 months'];
    }
    return undefined;
  }

  private getDiscoveryResponse(): Omit<AtlasMessage, 'id' | 'timestamp'> {
    const { projectType, timeline } = this.conversation.leadData;
    
    if (!projectType) {
      return {
        role: 'assistant',
        content: 'What type of project are you planning?',
        quickReplies: ['Kitchen Remodeling', 'Bathroom Remodeling', 'Both', 'Other']
      };
    }
    
    if (!timeline) {
      return {
        role: 'assistant',
        content: `Great! ${projectType === 'kitchen' ? 'Kitchen' : 'Bathroom'} remodeling is one of our specialties. 

When are you looking to start this project?`,
        quickReplies: ['ASAP', '1-3 months', '3-6 months', '6+ months']
      };
    }
    
    return this.getQualificationResponse();
  }

  private getQualificationResponse(): Omit<AtlasMessage, 'id' | 'timestamp'> {
    const { budget, zip } = this.conversation.leadData;
    
    if (!budget) {
      return {
        role: 'assistant',
        content: 'Do you have a budget range in mind for this project?',
        quickReplies: ['$15k-$25k', '$25k-$50k', '$50k-$75k', '$75k+', 'Not sure yet']
      };
    }
    
    if (!zip) {
      return {
        role: 'assistant',
        content: 'What\'s your ZIP code? This helps us connect you with the best contractors in your area.',
        quickReplies: []
      };
    }
    
    return this.getSchedulingResponse();
  }

  private getSchedulingResponse(): Omit<AtlasMessage, 'id' | 'timestamp'> {
    const { email, phone, zip } = this.conversation.leadData;
    
    // Check if ZIP is in service area
    const isInServiceArea = this.checkServiceArea(zip || '');
    
    if (!isInServiceArea) {
      return {
        role: 'assistant',
        content: `Thank you for your interest! Unfortunately, we don't currently serve the ${zip} area yet. 

Would you like to join our waitlist? We're expanding rapidly!`,
        quickReplies: ['Yes, join waitlist', 'No thanks']
      };
    }
    
    if (!email) {
      return {
        role: 'assistant',
        content: 'Perfect! We have elite contractors available in your area. What\'s the best email to send you contractor matches?',
        quickReplies: []
      };
    }
    
    if (!phone) {
      return {
        role: 'assistant',
        content: 'And what\'s the best phone number to reach you? Our contractors typically respond within 24 hours.',
        quickReplies: []
      };
    }
    
    return this.getCompletedResponse();
  }

  private getCompletedResponse(): Omit<AtlasMessage, 'id' | 'timestamp'> {
    const { projectType, name } = this.conversation.leadData;
    
    // Trigger lead notification
    this.notifyNewLead();
    
    return {
      role: 'assistant',
      content: `Excellent${name ? `, ${name}` : ''}! 🎉

I've matched you with our top ${projectType || ''} contractors in your area. 

Here's what happens next:
✅ You'll receive an email within 5 minutes with contractor profiles
✅ A contractor will reach out within 24 hours
✅ Free consultation to discuss your project

Your qualification score: ${this.conversation.qualificationScore}/100 (High Priority!)

Is there anything else you'd like to know?`,
      quickReplies: ['What makes ESH different?', 'How much does this cost?', 'Talk to a human']
    };
  }

  private checkServiceArea(zip: string): boolean {
    // Treasure Coast ZIP codes
    const serviceZips = ['34945', '34946', '34947', '34948', '34949', '34950', '34951', '34952', '34953', '34954', '34955', '34956', '34957'];
    return serviceZips.includes(zip);
  }

  private async notifyNewLead(): Promise<void> {
    // TODO: Send to Supabase and trigger email notifications
    console.log('[Atlas] New qualified lead:', this.conversation.leadData);
    
    // Store in localStorage for now
    const leads = JSON.parse(localStorage.getItem('esh_atlas_leads') || '[]');
    leads.push({
      conversationId: this.conversation.id,
      leadData: this.conversation.leadData,
      qualificationScore: this.conversation.qualificationScore,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('esh_atlas_leads', JSON.stringify(leads));
  }

  getConversation(): AtlasConversation {
    return this.conversation;
  }
}

// Active conversations
const conversations = new Map<string, AtlasEngine>();

// Start new conversation
export const startConversation = async (): Promise<AtlasConversation> => {
  const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const engine = new AtlasEngine(conversationId);
  conversations.set(conversationId, engine);
  return engine.getConversation();
};

// Send message to conversation
export const sendMessage = async (
  conversationId: string,
  userInput: string
): Promise<AtlasMessage> => {
  let engine = conversations.get(conversationId);
  
  if (!engine) {
    // Restore conversation if not in memory
    engine = new AtlasEngine(conversationId);
    conversations.set(conversationId, engine);
  }
  
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
  
  const response = await engine.processUserMessage(userInput);
  return response;
};

// Get conversation status
export const getConversation = (conversationId: string): AtlasConversation | null => {
  const engine = conversations.get(conversationId);
  return engine ? engine.getConversation() : null;
};

// Export all leads for admin dashboard
export const getAllLeads = (): any[] => {
  return JSON.parse(localStorage.getItem('esh_atlas_leads') || '[]');
};
