import { useState } from 'react';
import { Send, CheckCircle, Sparkles } from 'lucide-react';
import Button from '../components/shared/Button';

export default function OwnerQuestionnairePageNew() {
  const [formData, setFormData] = useState({
    // Website & Design Questions
    websiteLikes: '',
    websiteDislikes: '',
    competitorWebsites: '',
    brandPersonality: '',
    colorPreferences: '',
    websiteFeatures: '',
    
    // Content & Assets
    hasPhotos: '',
    needPhotography: '',
    hasTestimonials: '',
    videoContent: '',
    
    // Service Pricing & Details
    cleaningPricing: '',
    cleaningPackages: '',
    pressureWashingPricing: '',
    pressureWashingServices: '',
    detailingPricing: '',
    detailingServices: '',
    handymanServices: '',
    handymanPricing: '',
    
    // Marketing Strategy
    targetCustomerDetails: '',
    servicesPrioritize: '',
    geographicExpansion: '',
    pricingStrategy: '',
    
    // Lead Generation
    leadSources: '',
    conversionChallenges: '',
    followUpProcess: '',
    crm: '',
    
    // Growth Vision
    shortTermGoals: '',
    longTermVision: '',
    specificSupport: '',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          subject: 'Cleanerstein Owner Questionnaire - Erik Esenaliev',
          from_name: 'Cleanerstein Strategic Planning',
          ...formData,
          // Include Erik's known information in submission
          owner: 'Erik Esenaliev',
          business: 'Cleanerstein LLC',
          email: 'erikesenaliev@gmail.com',
          phone: '(843) 986-7677',
          yearsInBusiness: '8 years',
          serviceArea: 'Port Royal, SC (35 mile radius)'
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('There was an error submitting your questionnaire. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your questionnaire. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle size={80} className="text-green-500" />
          </div>
          <h1 className="text-5xl font-light mb-6 font-serif">Thank You, Erik!</h1>
          <p className="text-xl text-zinc-400 mb-8">
            Your responses have been received. We'll review your goals and get started on building your digital presence strategy.
          </p>
          <Button 
            variant="primary" 
            onClick={() => window.location.href = '/'}
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative py-24 border-b border-zinc-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 mb-6">
            <Sparkles size={32} className="text-blue-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-light mb-6 font-serif">Owner Strategic Questionnaire</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mb-8">
            Help us understand your vision so we can build the perfect digital marketing strategy for Cleanerstein.
          </p>

          {/* Known Business Information */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 space-y-2">
            <h3 className="text-lg font-semibold text-white mb-3">Business Profile</h3>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div><span className="text-zinc-500">Owner:</span> <span className="text-white ml-2">Erik Esenaliev</span></div>
              <div><span className="text-zinc-500">Business:</span> <span className="text-white ml-2">Cleanerstein LLC</span></div>
              <div><span className="text-zinc-500">Phone:</span> <span className="text-white ml-2">(843) 986-7677</span></div>
              <div><span className="text-zinc-500">Email:</span> <span className="text-white ml-2">erikesenaliev@gmail.com</span></div>
              <div><span className="text-zinc-500">Years in Business:</span> <span className="text-white ml-2">8 years</span></div>
              <div><span className="text-zinc-500">Service Area:</span> <span className="text-white ml-2">Port Royal, SC (35 miles)</span></div>
              <div className="md:col-span-2"><span className="text-zinc-500">Services:</span> <span className="text-white ml-2">Residential Cleaning, Pressure Washing, Handyman</span></div>
              <div className="md:col-span-2"><span className="text-zinc-500">Crew Size:</span> <span className="text-white ml-2">2 person team</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Questionnaire Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Website Design & Branding */}
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <h2 className="text-3xl font-light font-serif text-white">Website Design & Branding</h2>
                <p className="text-zinc-500 mt-2">Your vision for your online presence</p>
              </div>

              <div>
                <label htmlFor="websiteLikes" className="block text-sm font-medium text-zinc-300 mb-2">
                  What do you LIKE about your current website (or competitors' sites)? *
                </label>
                <textarea
                  id="websiteLikes"
                  name="websiteLikes"

                  rows={3}
                  value={formData.websiteLikes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Clean design, easy navigation, professional photos, simple booking process..."
                />
              </div>

              <div>
                <label htmlFor="websiteDislikes" className="block text-sm font-medium text-zinc-300 mb-2">
                  What do you DISLIKE or want to avoid? *
                </label>
                <textarea
                  id="websiteDislikes"
                  name="websiteDislikes"

                  rows={3}
                  value={formData.websiteDislikes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Too much clutter, outdated look, hard to find pricing, complicated contact forms..."
                />
              </div>

              <div>
                <label htmlFor="competitorWebsites" className="block text-sm font-medium text-zinc-300 mb-2">
                  Competitor or inspiration websites (URLs)
                </label>
                <textarea
                  id="competitorWebsites"
                  name="competitorWebsites"
                  rows={2}
                  value={formData.competitorWebsites}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="www.competitor1.com, www.inspirationsite.com..."
                />
              </div>

              <div>
                <label htmlFor="brandPersonality" className="block text-sm font-medium text-zinc-300 mb-2">
                  How would you describe Cleanerstein's brand personality? *
                </label>
                <textarea
                  id="brandPersonality"
                  name="brandPersonality"

                  rows={3}
                  value={formData.brandPersonality}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Professional, trustworthy, high standards, reliable, family-friendly, premium..."
                />
              </div>

              <div>
                <label htmlFor="colorPreferences" className="block text-sm font-medium text-zinc-300 mb-2">
                  Color preferences or existing brand colors
                </label>
                <input
                  type="text"
                  id="colorPreferences"
                  name="colorPreferences"
                  value={formData.colorPreferences}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Blue and white, earth tones, no preference..."
                />
              </div>

              <div>
                <label htmlFor="websiteFeatures" className="block text-sm font-medium text-zinc-300 mb-2">
                  Must-have website features *
                </label>
                <textarea
                  id="websiteFeatures"
                  name="websiteFeatures"

                  rows={3}
                  value={formData.websiteFeatures}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Online booking, before/after gallery, live chat, pricing calculator, testimonials, service area map..."
                />
              </div>
            </div>

            {/* Content & Visual Assets */}
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <h2 className="text-3xl font-light font-serif text-white">Content & Visual Assets</h2>
                <p className="text-zinc-500 mt-2">What we have to work with</p>
              </div>

              <div>
                <label htmlFor="hasPhotos" className="block text-sm font-medium text-zinc-300 mb-2">
                  Do you have professional photos of your work? *
                </label>
                <select
                  id="hasPhotos"
                  name="hasPhotos"

                  value={formData.hasPhotos}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="yes-many">Yes, have many before/after photos</option>
                  <option value="yes-some">Yes, have some basic photos</option>
                  <option value="can-take">No, but can take them</option>
                  <option value="need-help">No, need professional photography</option>
                </select>
              </div>

              <div>
                <label htmlFor="needPhotography" className="block text-sm font-medium text-zinc-300 mb-2">
                  Would you like us to arrange professional photography? *
                </label>
                <select
                  id="needPhotography"
                  name="needPhotography"

                  value={formData.needPhotography}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="yes-asap">Yes, as soon as possible</option>
                  <option value="yes-later">Yes, but later</option>
                  <option value="no-have">No, we have photos</option>
                  <option value="no-diy">No, we'll do it ourselves</option>
                </select>
              </div>

              <div>
                <label htmlFor="hasTestimonials" className="block text-sm font-medium text-zinc-300 mb-2">
                  Do you have customer testimonials/reviews we can use? *
                </label>
                <select
                  id="hasTestimonials"
                  name="hasTestimonials"

                  value={formData.hasTestimonials}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="yes-google">Yes, have Google/Yelp reviews</option>
                  <option value="yes-written">Yes, have written testimonials</option>
                  <option value="can-collect">Can collect from happy customers</option>
                  <option value="none">Don't have any yet</option>
                </select>
              </div>

              <div>
                <label htmlFor="videoContent" className="block text-sm font-medium text-zinc-300 mb-2">
                  Interest in video content (team intro, before/after, process videos)? *
                </label>
                <select
                  id="videoContent"
                  name="videoContent"

                  value={formData.videoContent}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="yes-essential">Yes, this is essential for marketing</option>
                  <option value="yes-interested">Yes, interested in exploring this</option>
                  <option value="maybe-later">Maybe later, not a priority</option>
                  <option value="no">No, not interested</option>
                </select>
              </div>
            </div>

            {/* Service Pricing & Offerings - THE MONEY SECTION */}
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <h2 className="text-3xl font-light font-serif text-white">Service Pricing & Offerings</h2>
                <p className="text-zinc-500 mt-2">Help us showcase your services with accurate pricing</p>
              </div>

              {/* RESIDENTIAL CLEANING */}
              <div className="bg-blue-900/10 border border-blue-800/30 rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">Residential Cleaning Pricing</h3>
                
                <div>
                  <label htmlFor="cleaningPricing" className="block text-sm font-medium text-zinc-300 mb-2">
                    How do you price residential cleaning?
                  </label>
                  <textarea
                    id="cleaningPricing"
                    name="cleaningPricing"
                    rows={5}
                    value={formData.cleaningPricing}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Examples:
• Square footage rate: $0.15/sq ft
• Flat rates: 1BR $120, 2BR $150, 3BR $180
• Hourly rate: $45/hour (2 person crew)
• Deep clean premium: +$50-100
• Move in/out: Starting at $250

Include your actual rates so we can display them accurately!"
                  />
                </div>

                <div>
                  <label htmlFor="cleaningPackages" className="block text-sm font-medium text-zinc-300 mb-2">
                    Cleaning packages or recurring service discounts?
                  </label>
                  <textarea
                    id="cleaningPackages"
                    name="cleaningPackages"
                    rows={4}
                    value={formData.cleaningPackages}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Examples:
• Weekly service: 10% off regular rate
• Bi-weekly: 5% off
• Monthly deep clean package: $XXX/month
• First-time customer discount: 15% off

We can create attractive package displays on the website!"
                  />
                </div>
              </div>

              {/* PRESSURE WASHING */}
              <div className="bg-cyan-900/10 border border-cyan-800/30 rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Pressure Washing Pricing</h3>
                
                <div>
                  <label htmlFor="pressureWashingPricing" className="block text-sm font-medium text-zinc-300 mb-2">
                    Pressure washing rates & pricing model
                  </label>
                  <textarea
                    id="pressureWashingPricing"
                    name="pressureWashingPricing"
                    rows={5}
                    value={formData.pressureWashingPricing}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Examples:
• House washing: $0.25-0.40/sq ft or $200-500 per house
• Driveway: $0.20/sq ft or $100-250 flat rate
• Deck/Patio: $150-300 depending on size
• Fence: $1-3 per linear foot
• Roof soft wash: $300-600

Give us real numbers to quote customers!"
                  />
                </div>

                <div>
                  <label htmlFor="pressureWashingServices" className="block text-sm font-medium text-zinc-300 mb-2">
                    What surfaces/areas can you pressure wash? (Check all that apply)
                  </label>
                  <textarea
                    id="pressureWashingServices"
                    name="pressureWashingServices"
                    rows={3}
                    value={formData.pressureWashingServices}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="List all: House siding, driveways, walkways, decks, patios, fences, roofs (soft wash), commercial buildings, parking lots, pool areas, docks/boats, concrete, brick, stucco, etc."
                  />
                </div>
              </div>

              {/* MOBILE DETAILING */}
              <div className="bg-purple-900/10 border border-purple-800/30 rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-semibold text-purple-400 mb-3">Mobile Detailing Services</h3>
                
                <div>
                  <label htmlFor="detailingServices" className="block text-sm font-medium text-zinc-300 mb-2">
                    What detailing services do you offer? (Be specific!)
                  </label>
                  <textarea
                    id="detailingServices"
                    name="detailingServices"
                    rows={6}
                    value={formData.detailingServices}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Check all that you do:
□ Basic wash & vacuum
□ Full interior detail
□ Full exterior detail
□ Complete detail (interior + exterior)
□ Paint correction (1-step, 2-step, 3-step)
□ Ceramic coating
□ Wax & polish
□ Headlight restoration
□ Engine bay cleaning
□ Pet hair removal
□ Odor elimination
□ Leather conditioning
□ Fabric protection
□ Clay bar treatment

List EVERYTHING you can do - even specialty services for luxury vehicles!"
                  />
                </div>

                <div>
                  <label htmlFor="detailingPricing" className="block text-sm font-medium text-zinc-300 mb-2">
                    Detailing packages & pricing
                  </label>
                  <textarea
                    id="detailingPricing"
                    name="detailingPricing"
                    rows={6}
                    value={formData.detailingPricing}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Package examples:
• Basic Detail - $80-120 (sedan/SUV)
• Premium Detail - $150-250
• Ultimate Detail - $300-500
• Ceramic Coating - $500-1500
• Paint Correction - Starting at $400

Add-ons:
• Pet hair removal +$50
• Headlight restoration +$75
• Engine bay +$50

Give us your actual menu and prices!"
                  />
                </div>
              </div>

              {/* HANDYMAN SERVICES */}
              <div className="bg-amber-900/10 border border-amber-800/30 rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-semibold text-amber-400 mb-3">Handyman Services</h3>
                
                <div>
                  <label htmlFor="handymanServices" className="block text-sm font-medium text-zinc-300 mb-2">
                    Complete list of handyman services you offer
                  </label>
                  <textarea
                    id="handymanServices"
                    name="handymanServices"
                    rows={10}
                    value={formData.handymanServices}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Check ALL services you can do:

REPAIRS:
□ Drywall repair & patching
□ Interior/exterior painting
□ Door repair & installation
□ Window repair & caulking
□ Deck repair & staining
□ Fence repair
□ Stucco repair
□ Concrete crack repair
□ Tile repair & re-grouting

PLUMBING:
□ Fix leaky faucets
□ Unclog drains
□ Toilet repair
□ Garbage disposal installation
□ Sink installation

ELECTRICAL (if licensed):
□ Light fixture installation
□ Ceiling fan installation
□ Outlet/switch replacement
□ GFCI installation

INSTALLATIONS:
□ TV mounting
□ Shelving installation
□ Closet organization systems
□ Cabinet hardware
□ Mirrors & artwork hanging
□ Blinds & curtain rods

ASSEMBLY:
□ Furniture assembly
□ Grill assembly
□ Gazebo/pergola assembly
□ Playground equipment

CARPENTRY:
□ Trim & molding installation
□ Custom shelving
□ Cabinet installation
□ Minor framing work

MAINTENANCE:
□ Gutter cleaning
□ Pressure washing
□ Weatherstripping
□ Caulking & sealing
□ Screen repair

HIGH-END/LUXURY SERVICES:
□ Smart home device installation
□ Custom woodwork
□ Fine art & chandelier installation
□ Home theater setup
□ Wine cellar maintenance
□ Pool furniture assembly

List EVERYTHING - even small jobs matter!"
                  />
                </div>

                <div>
                  <label htmlFor="handymanPricing" className="block text-sm font-medium text-zinc-300 mb-2">
                    Handyman pricing structure
                  </label>
                  <textarea
                    id="handymanPricing"
                    name="handymanPricing"
                    rows={4}
                    value={formData.handymanPricing}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Examples:
• Hourly rate: $65/hour (2 hour minimum)
• Trip charge: $50 service call
• Flat rate projects: Provide examples
  - TV mounting: $125
  - Drywall repair: $80-150
  - Door installation: $200-400

How do you charge? We need to display this clearly!"
                  />
                </div>
              </div>
            </div>

            {/* Target Market & Positioning */}
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <h2 className="text-3xl font-light font-serif text-white">Target Market & Positioning</h2>
                <p className="text-zinc-500 mt-2">Who we're marketing to</p>
              </div>

              <div>
                <label htmlFor="targetCustomerDetails" className="block text-sm font-medium text-zinc-300 mb-2">
                  Describe your IDEAL customer in detail *
                </label>
                <textarea
                  id="targetCustomerDetails"
                  name="targetCustomerDetails"

                  rows={4}
                  value={formData.targetCustomerDetails}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Homeowners age 35-65, household income $100K+, busy professionals, property managers with 5+ units, medical facility managers..."
                />
              </div>

              <div>
                <label htmlFor="servicesPrioritize" className="block text-sm font-medium text-zinc-300 mb-2">
                  Which services should we prioritize in marketing? *
                </label>
                <textarea
                  id="servicesPrioritize"
                  name="servicesPrioritize"

                  rows={3}
                  value={formData.servicesPrioritize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Focus on residential cleaning first, then pressure washing. Handyman is secondary..."
                />
              </div>

              <div>
                <label htmlFor="geographicExpansion" className="block text-sm font-medium text-zinc-300 mb-2">
                  Any plans to expand service area? *
                </label>
                <textarea
                  id="geographicExpansion"
                  name="geographicExpansion"

                  rows={2}
                  value={formData.geographicExpansion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Staying within 35 miles for now / Want to expand to Hilton Head / Planning to add another crew..."
                />
              </div>

              <div>
                <label htmlFor="pricingStrategy" className="block text-sm font-medium text-zinc-300 mb-2">
                  How should we present pricing on the website? *
                </label>
                <select
                  id="pricingStrategy"
                  name="pricingStrategy"

                  value={formData.pricingStrategy}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="transparent-pricing">Show transparent pricing for all services</option>
                  <option value="starting-prices">Show "starting at" prices</option>
                  <option value="quote-only">Quote only - no pricing displayed</option>
                  <option value="packages">Create service packages with set prices</option>
                  <option value="undecided">Not sure yet</option>
                </select>
              </div>
            </div>

            {/* Lead Generation & Sales */}
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <h2 className="text-3xl font-light font-serif text-white">Lead Generation & Sales</h2>
                <p className="text-zinc-500 mt-2">How you get and convert customers</p>
              </div>

              <div>
                <label htmlFor="leadSources" className="block text-sm font-medium text-zinc-300 mb-2">
                  Where do most of your current customers come from? *
                </label>
                <textarea
                  id="leadSources"
                  name="leadSources"

                  rows={3}
                  value={formData.leadSources}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Referrals 50%, Facebook ads 20%, Google 15%, word of mouth 10%, Nextdoor 5%..."
                />
              </div>

              <div>
                <label htmlFor="conversionChallenges" className="block text-sm font-medium text-zinc-300 mb-2">
                  What's your biggest challenge in converting leads to customers? *
                </label>
                <textarea
                  id="conversionChallenges"
                  name="conversionChallenges"

                  rows={3}
                  value={formData.conversionChallenges}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Responding quickly enough, pricing objections, building trust, following up consistently..."
                />
              </div>

              <div>
                <label htmlFor="followUpProcess" className="block text-sm font-medium text-zinc-300 mb-2">
                  Current lead follow-up process *
                </label>
                <textarea
                  id="followUpProcess"
                  name="followUpProcess"

                  rows={3}
                  value={formData.followUpProcess}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="I call them back within 24 hours / Email quote same day / Text follow-up after 3 days..."
                />
              </div>

              <div>
                <label htmlFor="crm" className="block text-sm font-medium text-zinc-300 mb-2">
                  Do you use any CRM or scheduling software? *
                </label>
                <input
                  type="text"
                  id="crm"
                  name="crm"

                  value={formData.crm}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Jobber, Housecall Pro, Google Calendar, Excel spreadsheet, nothing yet..."
                />
              </div>
            </div>

            {/* Growth Vision & Support Needs */}
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <h2 className="text-3xl font-light font-serif text-white">Growth Vision & Support Needs</h2>
                <p className="text-zinc-500 mt-2">Where you want to take Cleanerstein</p>
              </div>

              <div>
                <label htmlFor="shortTermGoals" className="block text-sm font-medium text-zinc-300 mb-2">
                  12-Month Goals *
                </label>
                <textarea
                  id="shortTermGoals"
                  name="shortTermGoals"

                  rows={3}
                  value={formData.shortTermGoals}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="From your intake: Increase profitability by 50%..."
                />
              </div>

              <div>
                <label htmlFor="longTermVision" className="block text-sm font-medium text-zinc-300 mb-2">
                  36-Month Vision *
                </label>
                <textarea
                  id="longTermVision"
                  name="longTermVision"

                  rows={4}
                  value={formData.longTermVision}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="From your intake: 3 crew teams, $22-28/hr wages, employee benefits, focus on cleaning/pressure washing/handyman..."
                />
              </div>

              <div>
                <label htmlFor="specificSupport" className="block text-sm font-medium text-zinc-300 mb-2">
                  What specific support do you need most? *
                </label>
                <textarea
                  id="specificSupport"
                  name="specificSupport"

                  rows={4}
                  value={formData.specificSupport}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="From your intake: Acquiring new business accounts, hiring reliable people, business plan for top-tier client expansion..."
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-6">
              <div>
                <label htmlFor="additionalNotes" className="block text-sm font-medium text-zinc-300 mb-2">
                  Any other thoughts, concerns, or ideas?
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  rows={4}
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Anything else you'd like us to know..."
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <Button
                type="submit"
                variant="accent"
                disabled={isSubmitting}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    Submit Questionnaire
                  </>
                )}
              </Button>

              <p className="text-sm text-zinc-500 text-center mt-4">
                This will help us create a customized marketing strategy for Cleanerstein's growth
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
