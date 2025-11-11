/**
 * Affluent Areas around Beaufort, SC
 * Target locations for specialized landing pages
 */

export interface AffluentArea {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  demographics: {
    medianHomeValue: string;
    population: string;
    knownFor: string[];
  };
  reviews: Array<{
    name: string;
    rating: number;
    comment: string;
    service: string;
  }>;
}

export const AFFLUENT_AREAS: Record<string, AffluentArea> = {
  datawIsland: {
    id: 'datawIsland',
    name: "Dataw Island",
    description: "Exclusive private residential community featuring golf, tennis, deep-water marina, and gracious waterfront homes",
    characteristics: [
      "Private gated community",
      "Golf course views",
      "Deep-water marina access",
      "Waterfront and marsh front properties",
      "Historic ruins and nature trails"
    ],
    demographics: {
      medianHomeValue: "$800K - $2M+",
      population: "500+ residents",
      knownFor: ["Golf community", "Boating access", "Luxury amenities", "Privacy and security"]
    },
    reviews: [
      {
        name: "J & D Reinberg",
        rating: 5,
        comment: "Cleanerstein transformed our Dataw Island home! Their attention to detail with our golf course view windows and marina-side deck was incredible. Professional, reliable, and they understand the unique needs of waterfront properties.",
        service: "pressure washing"
      },
      {
        name: "Michael & Sarah Thompson",
        rating: 5,
        comment: "As Dataw Island residents for 10 years, we've tried many services. Cleanerstein's epoxy garage floor installation exceeded our expectations. Perfect finish that handles our golf cart traffic and coastal humidity.",
        service: "epoxy services"
      }
    ]
  },

  callawassieIsland: {
    id: 'callawassieIsland',
    name: "Callawassie Island",
    description: "Premier private island community known for 'calm waters' and exclusive Lowcountry living",
    characteristics: [
      "Private island access",
      "Direct Colleton River access",
      "Tidal docks and boating",
      "4,000 years of history",
      "Coastal Lowcountry beauty"
    ],
    demographics: {
      medianHomeValue: "$700K - $1.5M+",
      population: "400+ residents",
      knownFor: ["Private island living", "Deep-water access", "Historical significance", "Marine lifestyle"]
    },
    reviews: [
      {
        name: "Robert & Patricia Chen",
        rating: 5,
        comment: "Cleanerstein's soft wash technique perfectly cleaned our Callawassie Island home without damaging the delicate marsh-side vegetation. Their team understands coastal property care like no other service in the area.",
        service: "pressure washing"
      },
      {
        name: "William Henderson",
        rating: 5,
        comment: "The mobile detailing service saved me time on Callawassie Island. They came right to our home and detailed our luxury vehicles while handling the salt air exposure perfectly. Outstanding convenience!",
        service: "mobile detailing"
      }
    ]
  },

  braysIsland: {
    id: 'braysIsland',
    name: "Brays Island",
    description: "5,500-acre private community featuring golf, equestrian facilities, and pristine Lowcountry landscape",
    characteristics: [
      "5,500-acre private community",
      "Golf and equestrian facilities",
      "Sporting club amenities",
      "Coastal Lowcountry backdrop",
      "Exclusive privacy"
    ],
    demographics: {
      medianHomeValue: "$600K - $1.2M+",
      population: "300+ residents",
      knownFor: ["Equestrian community", "Golf courses", "Sporting traditions", "Expansive private property"]
    },
    reviews: [
      {
        name: "James & Elizabeth Morgan",
        rating: 5,
        comment: "Cleanerstein handles our Brays Island estate with exceptional care. From the main house to the equestrian facilities, their commercial cleaning expertise shows. They even accommodate our unique sporting equipment needs.",
        service: "commercial cleaning"
      },
      {
        name: "David Richardson",
        rating: 5,
        comment: "The epoxy countertop installation in our Brays Island kitchen is flawless. Cleanerstein matched our existing backsplash perfectly and the finish withstands our active lifestyle. Highly recommend!",
        service: "epoxy services"
      }
    ]
  }
};

export type AffluentAreaId = keyof typeof AFFLUENT_AREAS;
