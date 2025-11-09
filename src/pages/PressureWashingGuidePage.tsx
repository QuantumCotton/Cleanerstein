import { useState, useMemo } from 'react';
import { ChevronRight, Search, AlertTriangle, Home, Building, TreePine, Car, Wrench, Shield, BookOpen } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  keywords: string[];
  icon: React.ElementType;
  content: string;
  subsections?: Subsection[];
}

interface Subsection {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

const sections: Section[] = [
  {
    id: 'quick-start',
    title: 'Quick Start Guide',
    keywords: ['start', 'beginner', 'new', 'how to', 'basics'],
    icon: BookOpen,
    content: 'Start here if you\'re new to pressure washing in Beaufort, SC. This guide covers everything from legal requirements to chemical selection.',
    subsections: [
      {
        id: 'legal-first',
        title: 'Legal Requirements First',
        keywords: ['law', 'legal', 'compliance', 'regulations', 'permits'],
        content: '**CRITICAL**: Before starting any job, understand that discharging ANYTHING into storm drains is illegal. You must contain, collect, and properly dispose of all wastewater. Fines range from $1,000-$25,000 per day.'
      }
    ]
  },
  {
    id: 'driveway-concrete',
    title: 'Driveway & Concrete Cleaning',
    keywords: ['driveway', 'concrete', 'patio', 'sidewalk', 'flatwork'],
    icon: Car,
    content: 'Complete guide for cleaning concrete surfaces including driveways, patios, and sidewalks.',
    subsections: [
      {
        id: 'driveway-organic',
        title: 'Green/Black Mold & Algae',
        keywords: ['mold', 'algae', 'green', 'black', 'organic', 'mildew'],
        content: '**Problem**: Green/black staining from organic growth.\n**Chemical**: 2-4% Sodium Hypochlorite (SH) solution\n**Process**: Pre-treat with SH, let dwell 10-15 minutes, then pressure wash with surface cleaner.\n**Key**: Always contain runoff - use berms and pump to sanitary sewer.'
      },
      {
        id: 'driveway-oil',
        title: 'Oil & Grease Stains',
        keywords: ['oil', 'grease', 'petroleum', 'motor oil', 'stains'],
        content: '**Problem**: Dark oil stains from vehicles\n**Chemical**: Sodium Hydroxide (NaOH) or Potassium Hydroxide (KOH) degreaser\n**Process**: Apply degreaser, let dwell 15-30 minutes, agitate with brush, then hot water pressure wash\n**Pro Tip**: Use cat litter to absorb excess oil before treatment'
      },
      {
        id: 'driveway-rust',
        title: 'Rust Stains',
        keywords: ['rust', 'orange', 'fertilizer', 'battery acid', 'metal stains'],
        content: '**Problem**: Orange/brown rust stains\n**Chemical**: Oxalic Acid or F9 BARC (buffered acid)\n**Process**: Apply acid solution, dwell 5-10 minutes, agitate, rinse thoroughly\n**Warning**: Will leave bright white spots - treat entire concrete section for even appearance'
      }
    ]
  },
  {
    id: 'house-washing',
    title: 'House Washing (Soft Wash)',
    keywords: ['house', 'siding', 'vinyl', 'soft wash', 'exterior'],
    icon: Home,
    content: 'Safe, effective house washing using soft wash techniques to avoid damage.',
    subsections: [
      {
        id: 'house-mold',
        title: 'Mold & Mildew on Siding',
        keywords: ['mold', 'mildew', 'green siding', 'dirty house', 'algae'],
        content: '**Problem**: Green/black organic growth on siding\n**Chemical**: 0.5-2% Sodium Hypochlorite + surfactant\n**Mix**: 2 gallons 12.5% SH + 2 gallons water + 5oz surfactant in 5-gal bucket\n**Method**: Downstream injection (10:1 ratio) = 0.625% final strength\n**Safety**: Cover plants, rinse thoroughly, work from bottom up'
      },
      {
        id: 'house-cobwebs',
        title: 'Cobwebs & General Dirt',
        keywords: ['cobwebs', 'dirt', 'dust', 'spider webs', 'clean'],
        content: '**Problem**: General dirt and cobwebs\n**Chemical**: Same house wash mix (0.5-2% SH)\n**Process**: The SH will break down cobwebs and organic matter\n**Tip**: Start from bottom and work up to prevent streaking'
      }
    ]
  },
  {
    id: 'roof-cleaning',
    title: 'Roof Cleaning',
    keywords: ['roof', 'shingles', 'black streaks', 'gloeocapsa', 'moss'],
    icon: Home,
    content: 'Professional roof cleaning to remove black streaks and organic growth.',
    subsections: [
      {
        id: 'roof-black-streaks',
        title: 'Black Streaks (Gloeocapsa Magma)',
        keywords: ['black streaks', 'roof algae', 'gloeocapsa', 'roof stains'],
        content: '**Problem**: Black streaks caused by bacteria Gloeocapsa magma\n**Chemical**: 4-6% Sodium Hypochlorite + chlorine-stable surfactant\n**Equipment**: 12-volt diaphragm pump system (not downstream injector)\n**Mix**: 35 gallons 12.5% SH + 65 gallons water in 100-gal tank\n**Critical**: Never use pressure - soft wash only to avoid shingle damage'
      },
      {
        id: 'roof-moss',
        title: 'Moss & Lichen',
        keywords: ['moss', 'lichen', 'green roof', 'plants', 'growth'],
        content: '**Problem**: Thick moss or lichen growth\n**Chemical**: 4-6% SH mix (same as black streaks)\n**Process**: May require multiple applications and gentle brushing\n**Timeline**: Moss may take 2-4 weeks to completely die and release'
      }
    ]
  },
  {
    id: 'deck-wood',
    title: 'Deck & Wood Restoration',
    keywords: ['deck', 'fence', 'wood', 'restoration', 'stain', 'strip'],
    icon: TreePine,
    content: 'Complete wood restoration including cleaning, brightening, and stain removal.',
    subsections: [
      {
        id: 'wood-grey-weathered',
        title: 'Grey Weathered Wood',
        keywords: ['grey wood', 'weathered', 'old deck', 'sun damage', 'restore'],
        content: '**Problem**: Grey, sun-damaged wood fibers\n**Eco-Friendly Option**: Sodium Percarbonate (oxygen bleach)\n**Mix**: 6-8 oz powder per gallon hot water\n**Process**: Apply, dwell 15-20 minutes, scrub, rinse\n**Step 2**: Always follow with Oxalic Acid brightener (4-8 oz/gallon)'
      },
      {
        id: 'wood-stain-removal',
        title: 'Removing Old Stain',
        keywords: ['stain removal', 'old stain', 'strip', 'refinish', 'restore'],
        content: '**Problem**: Failing, peeling stain\n**Chemical**: Sodium Hydroxide (NaOH) stripper\n**Process**: Apply stripper, dwell 15-45 minutes, pressure wash to remove\n**Critical Step**: Neutralize with Oxalic Acid before re-staining\n**Warning**: NaOH is extremely caustic - full PPE required'
      }
    ]
  },
  {
    id: 'commercial',
    title: 'Commercial & Industrial',
    keywords: ['commercial', 'restaurant', 'dumpster', 'grease', 'industrial'],
    icon: Building,
    content: 'Heavy-duty commercial cleaning including grease and industrial applications.',
    subsections: [
      {
        id: 'restaurant-grease',
        title: 'Restaurant Grease & Dumpster Pads',
        keywords: ['restaurant', 'grease', 'dumpster', 'food grease', 'commercial'],
        content: '**Problem**: Heavy food-based grease buildup\n**Chemical**: Potassium Hydroxide (KOH) - better for food grease\n**Equipment**: Hot water pressure washer (essential)\n**Process**: Apply KOH degreaser, dwell 15-30 minutes, hot water wash\n**Compliance**: Must contain and collect all grease-laden water'
      },
      {
        id: 'heavy-equipment',
        title: 'Heavy Equipment & Petroleum',
        keywords: ['heavy equipment', 'motor oil', 'hydraulic', 'petroleum', 'degrease'],
        content: '**Problem**: Petroleum-based grease and oil\n**Chemical**: Sodium Hydroxide (NaOH) - better for petroleum\n**Process**: Mix NaOH from bulk (50lb bags), apply, dwell, hot water wash\n**Cost**: 90% savings vs retail degreasers\n**Safety**: Full PPE required - NaOH causes severe burns'
      }
    ]
  },
  {
    id: 'specialized-stains',
    title: 'Specialized Stain Removal',
    keywords: ['specialized', 'red clay', 'efflorescence', 'graffiti', 'mortar'],
    icon: Wrench,
    content: 'Advanced stain removal techniques for specific problems.',
    subsections: [
      {
        id: 'red-clay',
        title: 'Red Clay Stains',
        keywords: ['red clay', 'construction', 'iron oxide', 'orange stains', 'clay'],
        content: '**Problem**: Red/orange iron oxide stains from SC clay\n**Chemical**: Mud May Day, F9 BARC, or Aluminum Brightener\n**Process**: Apply acidic cleaner, dwell 5-10 minutes, medium pressure rinse\n**Market**: High-demand service for new construction cleanup'
      },
      {
        id: 'efflorescence',
        title: 'Efflorescence & Mortar',
        keywords: ['efflorescence', 'mortar', 'white stains', 'salt', 'construction'],
        content: '**Problem**: White salt deposits or mortar smears\n**Chemical**: NMD80, F9 Efflo, or ShoreBest 2377 (buffered acids)\n**Process**: Apply with pump sprayer, dwell per manufacturer, rinse\n**Warning**: Never use muriatic acid - damages brick and mortar'
      },
      {
        id: 'graffiti',
        title: 'Graffiti Removal',
        keywords: ['graffiti', 'spray paint', 'tag', 'paint removal'],
        content: '**Problem**: Spray paint graffiti\n**Chemical**: Taginator, Elephant Snot, or Tagaway\n**Process**: Depends on surface - gels for porous, solvents for smooth\n**Cost**: $65/gallon chemicals, $500+ service charge\n**Equipment**: Dedicated sprayers - solvents destroy standard pumps'
      }
    ]
  },
  {
    id: 'legal-compliance',
    title: 'Legal Compliance & Safety',
    keywords: ['legal', 'compliance', 'law', 'safety', 'regulations', 'environment'],
    icon: Shield,
    content: 'Critical legal requirements and safety protocols for Beaufort, SC operations.',
    subsections: [
      {
        id: 'clean-water-act',
        title: 'Clean Water Act Compliance',
        keywords: ['clean water act', 'cwa', 'storm drain', 'discharge'],
        content: '**Federal Law**: Clean Water Act prohibits ANY discharge to storm drains\n**State**: SC DHEC enforces regulations\n**Penalty**: $1,000-$25,000 per day per violation\n**Key**: Storm drains flow directly to waterways - no treatment'
      },
      {
        id: 'wastewater-management',
        title: 'Wastewater Management',
        keywords: ['wastewater', 'containment', 'collection', 'disposal'],
        content: '**Step 1**: Contain with berms around storm drains\n**Step 2**: Collect with sump pump or vacuum recovery\n**Step 3**: Dispose legally - sanitary sewer (with permission) or haul away\n**Never**: Discharge to landscape or storm drains'
      },
      {
        id: 'safety-ppe',
        title: 'Safety & PPE Requirements',
        keywords: ['safety', 'ppe', 'protection', 'equipment', 'hazmat'],
        content: '**Tier 1** (Percarbonate): Gloves, safety glasses\n**Tier 2** (SH): Chemical-resistant gloves, goggles, boots, respirator for strong mixes\n**Tier 3** (NaOH/Acids): Full PPE - rubber gloves, NIOSH respirator, full protection\n**Critical**: NaOH causes severe burns, acid fumes damage lungs'
      }
    ]
  }
];

export default function PressureWashingGuidePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('quick-start');

  const filteredSections = useMemo(() => {
    if (!searchTerm) return sections;
    
    const searchLower = searchTerm.toLowerCase();
    return sections.filter(section => 
      section.title.toLowerCase().includes(searchLower) ||
      section.keywords.some(keyword => keyword.toLowerCase().includes(searchLower)) ||
      section.subsections?.some(sub => 
        sub.title.toLowerCase().includes(searchLower) ||
        sub.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
      )
    );
  }, [searchTerm]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-80 bg-zinc-900/50 border-r border-zinc-800 h-screen sticky top-0 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-light text-white mb-6 font-serif">Pressure Washing Guide</h2>
            
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {filteredSections.map((section) => {
                const Icon = section.icon;
                return (
                  <div key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                        activeSection === section.id
                          ? 'bg-blue-600 text-white'
                          : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{section.title}</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </button>
                    
                    {section.subsections && (
                      <div className="ml-8 mt-1 space-y-1">
                        {section.subsections.map((subsection) => (
                          <button
                            key={subsection.id}
                            onClick={() => scrollToSection(subsection.id)}
                            className="w-full text-left px-3 py-2 text-xs text-zinc-400 hover:text-blue-400 hover:bg-zinc-800 rounded transition-colors"
                          >
                            {subsection.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Keywords */}
            <div className="mt-8 p-4 bg-zinc-800/50 rounded-lg">
              <h3 className="text-sm font-medium text-zinc-300 mb-2">Quick Keywords</h3>
              <div className="flex flex-wrap gap-1">
                {['mold', 'oil', 'rust', 'deck', 'roof', 'legal', 'grease', 'clay'].map(keyword => (
                  <button
                    key={keyword}
                    onClick={() => setSearchTerm(keyword)}
                    className="px-2 py-1 text-xs bg-zinc-700 hover:bg-blue-600 text-zinc-300 hover:text-white rounded transition-colors"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto px-8 py-12">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-light mb-6 text-white font-serif">
              Pressure Washing Guide
            </h1>
            <p className="text-xl text-zinc-300 mb-8">
              Complete Beaufort, SC pressure washing operations manual - from chemicals to compliance
            </p>
            
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-red-300 mb-2">LEGAL WARNING</h3>
                  <p className="text-red-200">
                    Discharging ANYTHING into storm drains is illegal under the Clean Water Act. 
                    Penalties: $1,000-$25,000 per day. Always contain, collect, and properly dispose of wastewater.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.id} id={section.id} className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-light text-white font-serif">{section.title}</h2>
                    <p className="text-zinc-400 mt-1">{section.content}</p>
                  </div>
                </div>

                {section.subsections?.map((subsection) => (
                  <div key={subsection.id} id={subsection.id} className="ml-12 mb-8">
                    <div className="border-l-2 border-zinc-700 pl-6">
                      <h3 className="text-xl font-medium text-blue-300 mb-3">{subsection.title}</h3>
                      <div className="prose prose-invert max-w-none">
                        <div className="whitespace-pre-line text-zinc-300 leading-relaxed">
                          {subsection.content}
                        </div>
                      </div>
                      
                      {/* Keywords */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {subsection.keywords.map(keyword => (
                          <span key={keyword} className="px-2 py-1 text-xs bg-zinc-800 text-zinc-400 rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          {/* Quick Reference Card */}
          <div className="mt-16 p-8 bg-zinc-900/50 border border-zinc-700 rounded-lg">
            <h3 className="text-2xl font-light text-white mb-6 font-serif">Emergency Quick Reference</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="text-blue-400 font-semibold mb-2">Chemical Hotline</h4>
                <p className="text-zinc-300">12.5% SH: Primary biocide for organic growth</p>
                <p className="text-zinc-300">NaOH: Heavy degreaser (petroleum)</p>
                <p className="text-zinc-300">KOH: Food grease specialist</p>
                <p className="text-zinc-300">Oxalic Acid: Rust removal & wood brightener</p>
              </div>
              <div>
                <h4 className="text-red-400 font-semibold mb-2">Legal Actions</h4>
                <p className="text-zinc-300">1. Block storm drains with berms</p>
                <p className="text-zinc-300">2. Collect wastewater with pump</p>
                <p className="text-zinc-300">3. Dispose to sanitary sewer (permission)</p>
                <p className="text-zinc-300">4. Document disposal method</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
