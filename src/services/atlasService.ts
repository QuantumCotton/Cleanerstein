// Atlas AI Service - Conversation Engine & Lead Qualification
import { callGeminiAPI, GeminiMessage, CONTRACTOR_ACQUISITION_PROMPT } from './geminiService';

const OPENAI_ENDPOINT = '/.netlify/functions/atlas-openai';
const LEAD_EMAIL_ENDPOINT = '/.netlify/functions/send-atlas-lead';
const OPENAI_TIMEOUT_MS = 10000;

export type ConversationMode = 'askAround' | 'intake';
export type IntakeQuestionKey =
  | 'name'
  | 'contact'
  | 'projectType'
  | 'timeline'
  | 'budget'
  | 'zip'
  | 'services'
  | 'financing'
  | 'details';

export interface AtlasMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
  leadData?: Partial<LeadData>;
  qualificationScore?: number;
}

export interface AtlasServiceResponse {
  message: AtlasMessage;
  conversation: AtlasConversation;
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
  mode: ConversationMode;
  intake: {
    active: boolean;
    estimatedQuestions: number;
    askedQuestions: IntakeQuestionKey[];
  };
  leadNotificationSent: boolean;
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
      transferredToHuman: false,
      mode: 'askAround',
      intake: {
        active: false,
        estimatedQuestions: 6,
        askedQuestions: []
      },
      leadNotificationSent: false
    };
    
    // Add initial greeting
    this.addMessage({
      role: 'assistant',
      content: `Hi! I'm Atlas from Elite Service Hub. 👋

What brings you here today? Are you a contractor looking for growth support, or are you just exploring?`,
      quickReplies: ['I am a Contractor', 'Just exploring', 'Tell me about Elite Service Hub']
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
    // Record user message for transcript and context
    const userMessage: AtlasMessage = {
      id: `msg_user_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      role: 'user',
      content: userInput,
      timestamp: new Date()
    };
    this.conversation.messages.push(userMessage);

    // Analyze user input and extract data
    await this.analyzeInput(userInput);

    // Update intake state based on user intent
    this.detectModeSwitch(userInput);
    this.updateIntakeProgress();
    
    // Update qualification score
    this.updateQualificationScore();
    
    // Generate appropriate response based on stage
    const response = await this.generateResponse(userInput);
    
    // Add assistant message
    this.addMessage(response);

    const lastMessage = this.conversation.messages[this.conversation.messages.length - 1];

    if (this.shouldTriggerLeadNotification()) {
      await this.notifyNewLead();
    }

    return {
      ...lastMessage,
      leadData: { ...this.conversation.leadData },
      qualificationScore: this.conversation.qualificationScore
    };
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

    // Extract name cues
    if (!this.conversation.leadData.name) {
      const nameMatch = input.match(/(?:my name is|this is|i'm|i am)\s+([A-Za-z][A-Za-z\s'.-]{1,40})/i);
      if (nameMatch) {
        const name = nameMatch[1].trim();
        if (name.split(' ').length <= 4) {
          this.conversation.leadData.name = name;
        }
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
    const inServiceArea = data.zip ? this.checkServiceArea(data.zip) : true;

    // Scoring criteria
    if (data.projectType) score += 15;
    if (data.timeline) score += 10;
    if (data.budget) score += 20;
    if (data.zip) score += 15;
    if (data.email) score += 20;
    if (data.phone) score += 20;
    if (!inServiceArea) {
      score -= 10;
    }

    // Bonus for high-value indicators
    if (data.budget && (data.budget.includes('50') || data.budget.includes('75') || data.budget.includes('100'))) {
      score += 10;
    }

    if (data.timeline === 'ASAP') {
      score += 5;
    }

    this.conversation.qualificationScore = Math.min(Math.max(score, 0), 100);
    this.conversation.isQualified = this.conversation.qualificationScore >= 60 && inServiceArea;
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
- Mode: ${this.conversation.mode}
- Intake Active: ${this.conversation.intake.active}
- Intake Progress: ${this.conversation.intake.askedQuestions.join(', ') || 'none'}
- Collected Data: ${JSON.stringify(leadData)}
- Qualification Score: ${qualificationScore}/100
- User just said: "${userInput}"

You must always respect the current mode:
- If mode is "askAround", keep things light, ask one question at a time, learn how much time the visitor wants to spend chatting, and offer to start a full intake when appropriate.
- If mode is "intake", focus on filling in missing intake fields (${this.getPendingIntakeKeys().join(', ') || 'none'}). Mention roughly how many questions remain (${Math.max(0, this.conversation.intake.estimatedQuestions - this.conversation.intake.askedQuestions.length)}).
- When the user asks about financing, clarify we do not directly provide financing but offer free consultation on how to get approved.
- Connect intake questions to the contractor forms: brand identity, growth goals, launch readiness, and neighborhood coverage, but only ask what feels relevant to their trade.
- Always keep responses concise (2-3 sentences) and end with a question.

Based on what you know, respond naturally and progress toward qualification.`;

    const aiResponse = await this.requestOpenAI(geminiMessages, contextPrompt);

    // Determine if we should provide quick replies based on context
    const quickReplies = this.generateQuickReplies(leadData);

    return {
      role: 'assistant',
      content: aiResponse,
      quickReplies
    };
  }

  private async requestOpenAI(messages: GeminiMessage[], prompt: string): Promise<string> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);
      const response = await fetch(OPENAI_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, systemPrompt: prompt }),
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`OpenAI request failed: ${response.status}`);
      }

      const data = await response.json();
      if (data?.text) {
        return data.text;
      }
      throw new Error('OpenAI response missing text');
    } catch (error) {
      console.warn('[Atlas] OpenAI fallback to Gemini:', error);
      return callGeminiAPI(messages, prompt);
    }
  }
  
  private generateQuickReplies(leadData: LeadData): string[] | undefined {
    // Provide quick replies based on missing data
    if (!this.conversation.intake.active) {
      return ['Start full intake evaluation', 'Just browsing'];
    }

    if (!leadData.name) {
      return ['Sure, my name is...', 'Prefer to stay anonymous'];
    }

    if (!leadData.email && !leadData.phone) {
      return ['Here is my email', 'Here is my phone number'];
    }

    if (!leadData.projectType) {
      return ['Kitchen Remodeling', 'Bathroom Remodeling', 'Both'];
    }
    if (!leadData.timeline) {
      return ['ASAP', '1-3 months', '3-6 months'];
    }
    return undefined;
  }

  private checkServiceArea(zip: string): boolean {
    // Treasure Coast ZIP codes
    const serviceZips = ['34945', '34946', '34947', '34948', '34949', '34950', '34951', '34952', '34953', '34954', '34955', '34956', '34957'];
    return serviceZips.includes(zip);
  }

  private shouldTriggerLeadNotification(): boolean {
    const { intake, leadData } = this.conversation;
    if (!intake.active) {
      return false;
    }
    const hasContact = Boolean(leadData.email || leadData.phone);
    return (
      hasContact &&
      intake.askedQuestions.includes('name') &&
      !this.conversation.transferredToHuman &&
      !this.conversation.leadNotificationSent
    );
  }

  private async notifyNewLead(): Promise<void> {
    try {
      const payload = {
        conversationId: this.conversation.id,
        leadData: this.conversation.leadData,
        qualificationScore: this.conversation.qualificationScore,
        startedAt: this.conversation.startedAt,
        mode: this.conversation.mode,
        intake: this.conversation.intake,
        transcript: this.conversation.messages.map(msg => ({
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp
        }))
      };

      await fetch(LEAD_EMAIL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      this.conversation.leadNotificationSent = true;
    } catch (error) {
      console.error('[Atlas] Failed to send lead email', error);
    }
  }

  private detectModeSwitch(input: string) {
    const lower = input.toLowerCase();
    if (lower.includes('full intake') || lower.includes('intake evaluation')) {
      this.conversation.mode = 'intake';
      this.conversation.intake.active = true;
      return;
    }

    if (this.conversation.mode === 'askAround') {
      const contractorSignals = ['contractor', 'builder', 'remodel'];
      if (contractorSignals.some(signal => lower.includes(signal))) {
        this.conversation.mode = 'askAround';
      }

      const readinessSignals = ['sign me up', 'get started', 'apply', 'yes let\'s do intake'];
      if (readinessSignals.some(signal => lower.includes(signal))) {
        this.conversation.mode = 'intake';
        this.conversation.intake.active = true;
      }
    }

    if (this.conversation.mode === 'intake' && (lower.includes('later') || lower.includes('not now'))) {
      this.conversation.mode = 'askAround';
      this.conversation.intake.active = false;
    }
  }

  private updateIntakeProgress() {
    if (!this.conversation.intake.active) {
      return;
    }

    const dataMap: Array<[IntakeQuestionKey, unknown]> = [
      ['name', this.conversation.leadData.name],
      ['contact', this.conversation.leadData.email || this.conversation.leadData.phone],
      ['projectType', this.conversation.leadData.projectType],
      ['timeline', this.conversation.leadData.timeline],
      ['budget', this.conversation.leadData.budget],
      ['zip', this.conversation.leadData.zip],
      ['services', this.conversation.leadData.propertyType],
      ['financing', this.conversation.leadData.currentStatus],
      ['details', this.conversation.leadData.details]
    ];

    const asked: IntakeQuestionKey[] = [];
    dataMap.forEach(([key, value]) => {
      if (value) {
        asked.push(key);
      }
    });
    this.conversation.intake.askedQuestions = asked;

    // Adjust estimated question count based on missing fields
    const pending = this.getPendingIntakeKeys();
    const estimated = Math.max(asked.length + pending.length, asked.length + 1);
    this.conversation.intake.estimatedQuestions = estimated;
  }

  private getPendingIntakeKeys(): IntakeQuestionKey[] {
    const required: IntakeQuestionKey[] = ['name', 'contact'];
    const optional: IntakeQuestionKey[] = ['projectType', 'timeline', 'budget', 'zip', 'services', 'financing', 'details'];
    const missing: IntakeQuestionKey[] = [];

    required.forEach(key => {
      if (!this.conversation.intake.askedQuestions.includes(key)) {
        missing.push(key);
      }
    });

    optional.forEach(key => {
      if (!this.conversation.intake.askedQuestions.includes(key)) {
        missing.push(key);
      }
    });

    return missing;
  }
  private snapshotConversation(): AtlasConversation {
    return {
      ...this.conversation,
      messages: this.conversation.messages.map(msg => ({ ...msg })),
      leadData: { ...this.conversation.leadData },
      intake: {
        ...this.conversation.intake,
        askedQuestions: [...this.conversation.intake.askedQuestions]
      }
    };
  }

  getConversation(): AtlasConversation {
    return this.snapshotConversation();
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
): Promise<AtlasServiceResponse> => {
  let engine = conversations.get(conversationId);
  
  if (!engine) {
    // Restore conversation if not in memory
    engine = new AtlasEngine(conversationId);
    conversations.set(conversationId, engine);
  }
  
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
  
  const message = await engine.processUserMessage(userInput);
  return {
    message,
    conversation: engine.getConversation()
  };
};

// Get conversation status
export const getConversation = (conversationId: string): AtlasConversation | null => {
  const engine = conversations.get(conversationId);
  return engine ? engine.getConversation() : null;
};

// Temporary stub for admin page until Supabase integration is complete
export const getAllLeads = (): any[] => {
  return [];
};
