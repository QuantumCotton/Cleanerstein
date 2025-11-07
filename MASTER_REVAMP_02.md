# MASTER REVAMP TASK LIST - CLEANERSTEIN (PART 2)

## PHASE 6: FINANCIAL & ANALYTICS UPDATES

### 6.1 Financial Dashboard (`src/pages/admin/FinancialDashboard.tsx`)
**Status:** ⏳ Pending

**Changes:**
- [ ] Remove contractor commission tracking
- [ ] Add client invoice tracking
- [ ] Revenue by service type (commercial vs residential vs pressure washing)
- [ ] Payment status tracking (pending, paid, overdue)
- [ ] Monthly recurring revenue (MRR) for repeat clients
- [ ] Average job value
- [ ] Charts: Revenue over time, Service type breakdown

### 6.2 Analytics Page (`src/pages/admin/AnalyticsPage.tsx`)
**Status:** ⏳ Pending

**Update Metrics:**
- [ ] Quote conversion rate (quotes sent → jobs booked)
- [ ] Client acquisition cost
- [ ] Average response time to inquiries
- [ ] Service type popularity
- [ ] Geographic distribution (Beaufort area map)
- [ ] Peak booking times/seasons
- [ ] Client retention rate

### 6.3 Remove Ad Spend Pages
**Status:** ⏳ Pending

**Action:**
- [ ] Delete or repurpose contractor-related marketing pages
- [ ] Keep basic marketing analytics if running ads for Cleanerstein

---

## PHASE 7: ASSETS & IMAGES

### 7.1 Logo & Branding Assets
**Status:** ⏳ Pending

**Create/Replace:**
- [ ] Design Cleanerstein logo
- [ ] Create favicon
- [ ] Update `public/images/logos/` directory
- [ ] Remove all ESH logos
- [ ] Create social media preview images

**Recommended Logo Style:**
- Clean, modern typography
- Incorporate cleaning/sparkle iconography
- Blue/green color scheme
- Professional yet friendly

### 7.2 Service Images
**Status:** ⏳ Pending

**Replace contractor images with cleaning images:**
- [ ] Commercial cleaning photos (offices, retail spaces)
- [ ] Residential cleaning photos (kitchens, bathrooms, living rooms)
- [ ] Pressure washing before/after photos
- [ ] Team photos (if applicable)
- [ ] Equipment/eco-friendly products

**Directories:**
- `public/images/` - Main image directory
- Remove contractor-related images
- Add hero background images for each service type

### 7.3 Update Image References
**Status:** ⏳ Pending

**Search all files for image imports and update:**
- [ ] Hero sections
- [ ] Service cards
- [ ] About page
- [ ] Testimonials (if applicable)

---

## PHASE 8: NAVIGATION & ROUTING

### 8.1 Update Main Navigation
**Status:** ✅ COMPLETE

**File:** `src/components/layout/Navigation.tsx`

**New Navigation Structure:**
```
- Home
- Services
  - Commercial Cleaning
  - Residential Cleaning
  - Pressure Washing
- About
- Contact
- Get a Quote (CTA button)
- Admin Login (hidden/footer link)
```

**Remove:**
- [x] "Become a Provider" link
- [x] "How It Works" (contractor-focused)
- [x] "Markets" page

### 8.2 Update Routing
**Status:** ✅ COMPLETE

**File:** `src/App.tsx`

**Routes to Update:**
- [x] Remove `/become-a-provider`
- [x] Remove `/how-it-works` (contractor version)
- [x] Remove `/forms` page
- [x] Remove `/markets` page
- [x] Add `/services` page (redirects to homepage for now)
- [ ] Add `/services/commercial` page
- [ ] Add `/services/residential` page
- [ ] Add `/services/pressure-washing` page
- [x] Add `/contact` page (redirects to homepage for now)
- [x] Keep admin routes (protected)

### 8.3 Admin Navigation
**Status:** ⏳ Pending

**File:** `src/components/admin/AdminLayout.tsx`

**New Admin Nav:**
```
- Dashboard
- Clients
- Quotes
- Schedule/Appointments
- Invoices
- Chat Conversations
- Settings
```

**Remove:**
- Contractor Accounts
- Contractor Performance
- Market Performance
- Work Orders (repurpose or remove)

---

## PHASE 9: FORMS & LEAD CAPTURE

### 9.1 Quote Request Form
**Status:** ⏳ Pending

**Create:** `src/components/forms/QuoteRequestForm.tsx`

**Fields:**
- Name (required)
- Email (required)
- Phone (required)
- Service Type (dropdown: Commercial, Residential, Pressure Washing)
- Property Type (conditional based on service)
- Square Footage / Property Size
- Frequency (One-time, Weekly, Bi-weekly, Monthly)
- Address
- City, State, Zip
- Special Requests (textarea)
- Preferred Contact Method
- Best Time to Call

**Submission:**
- Create entry in `clients` table
- Send notification email to Cleanerstein
- Show success message
- Optional: Auto-start chat conversation

### 9.2 Contact Form
**Status:** ⏳ Pending

**Create:** `src/components/forms/ContactForm.tsx`

**Simple contact form for general inquiries:**
- Name
- Email
- Phone
- Subject
- Message
- Submit → Email notification

### 9.3 Remove Contractor Forms
**Status:** ⏳ Pending

**Delete/Archive:**
- [ ] `public/contractor-application-form.html`
- [ ] `public/customer-acquisition-form.html`
- [ ] `src/components/ApplicationForm.tsx`
- [ ] Any contractor intake forms

---

## PHASE 10: EMAIL NOTIFICATIONS

### 10.1 Update Email Templates
**Status:** ⏳ Pending

**Create email templates for:**

**New Quote Request Email (to Cleanerstein):**
```
Subject: New Quote Request - [Service Type]

Client: [Name]
Contact: [Email], [Phone]
Service: [Service Type]
Property: [Property Type], [Square Footage]
Location: [Address], [City, SC]
Urgency: [When needed]

Special Requests:
[Special requests text]

View full details in admin dashboard.
```

**Quote Sent Email (to Client):**
```
Subject: Your Cleanerstein Quote is Ready

Hi [Name],

Thank you for requesting a quote from Cleanerstein! We've prepared a custom quote for your [service type] needs.

[Quote details/pricing]

To accept this quote and schedule service, please reply to this email or call us at [phone].

Questions? We're here to help!

Best,
Cleanerstein Team
```

**Appointment Confirmation Email:**
```
Subject: Your Cleaning Appointment - [Date]

Hi [Name],

Your appointment is confirmed!

Service: [Service Type]
Date: [Date]
Time: [Time Window]
Address: [Address]
Estimated Duration: [Duration]

Our team will arrive within the scheduled window. Please ensure access to the property.

Need to reschedule? Contact us at [phone] or [email].

See you soon!
Cleanerstein Team
```

### 10.2 Update Netlify Functions
**Status:** ⏳ Pending

**Files to Update:**
- [ ] `netlify/functions/send-atlas-lead.ts` → Rename/repurpose for client leads
- [ ] Update email recipients (remove chris@theeliteservicehub.com, add cleanerstein email)
- [ ] Update email templates in functions
- [ ] Test email delivery

---

## PHASE 11: STYLING & THEME

### 11.1 Update CSS Variables
**Status:** ✅ COMPLETE

**File:** `src/index.css`

**Replace ESH color scheme:**
```css
:root {
  /* Cleanerstein Brand Colors */
  --color-primary: #2563EB;        /* Professional Blue */
  --color-primary-dark: #1E40AF;
  --color-secondary: #10B981;      /* Fresh Green */
  --color-secondary-dark: #059669;
  --color-accent: #F59E0B;         /* Amber accent */
  --color-accent-dark: #D97706;
  
  /* Remove ESH gold */
  /* Old: --color-esh-gold: #D4AF37; */
  
  /* Neutrals */
  --color-dark: #1F2937;
  --color-light: #F9FAFB;
  --color-white: #FFFFFF;
}
```

**Update Tailwind config if using custom colors:**
- [x] `tailwind.config.js` - Update color palette

### 11.2 Component Styling Updates
**Status:** 🟡 PARTIAL (Legacy aliases in place)

**Global search and replace in all component files:**
- [x] `bg-esh-gold` → `bg-cleanerstein-blue` or `bg-primary` (via legacy aliases)
- [x] `text-esh-gold` → `text-primary` (via legacy aliases)
- [x] `border-esh-gold` → `border-primary` (via legacy aliases)
- [x] `hover:bg-esh-gold-dark` → `hover:bg-primary-dark` (via legacy aliases)

**Files to check:**
- All button components
- Navigation
- Footer
- Hero sections
- Cards
- Forms

### 11.3 Font & Typography
**Status:** ⏳ Pending

**Review and update if needed:**
- [ ] Font choices (current: serif for headings)
- [ ] Consider cleaner, more modern font for cleaning business
- [ ] Update font imports if changing

---

## PHASE 12: CONTENT WRITING

### 12.1 SEO & Meta Tags
**Status:** ⏳ Pending

**Update in all pages:**
- [ ] Title tags: "Cleanerstein - Professional Cleaning Services in Beaufort, SC"
- [ ] Meta descriptions for each page
- [ ] Keywords: cleaning services, pressure washing, commercial cleaning, residential cleaning, Beaufort SC
- [ ] Open Graph tags for social sharing
- [ ] Update favicon and app metadata

### 12.2 Homepage Copy
**Status:** ⏳ Pending

**Rewrite all text content:**

**Hero Headline Options:**
- "Beaufort's Premier Cleaning & Pressure Washing Service"
- "Sparkling Clean Spaces, Every Time"
- "Professional Cleaning You Can Trust"
- "Experience the Cleanerstein Difference"

**Subheadline:**
- "Serving Beaufort and the Lowcountry with exceptional commercial cleaning, residential cleaning, and pressure washing services."

**Value Props:**
- ✓ Licensed & Insured
- ✓ Eco-Friendly Products
- ✓ Satisfaction Guaranteed
- ✓ Same-Day Service Available
- ✓ Recurring Service Discounts

### 12.3 Service Descriptions
**Status:** ⏳ Pending

**Write detailed service descriptions:**

**Commercial Cleaning:**
- Office buildings
- Retail spaces
- Medical facilities
- Restaurants
- Flexible scheduling (after-hours available)
- Customized cleaning plans

**Residential Cleaning:**
- Regular maintenance cleaning
- Deep cleaning
- Move-in/move-out cleaning
- Post-construction cleaning
- Eco-friendly options
- One-time or recurring service

**Pressure Washing:**
- House washing & siding
- Driveways & sidewalks
- Decks & patios
- Fences
- Commercial building exteriors
- Soft wash & power wash options

### 12.4 About Page Copy
**Status:** ⏳ Pending

**Write company story:**
- Who is Cleanerstein
- Years in business (if applicable)
- Service area (Beaufort, SC & Lowcountry)
- Team introduction
- Certifications & training
- Eco-friendly commitment
- Community involvement

---

## PHASE 13: TESTIMONIALS & REVIEWS

### 13.1 Add Testimonials Section
**Status:** ⏳ Pending

**Create:** `src/components/Testimonials.tsx`

**Display client reviews:**
- Client name (first name + last initial)
- Service type
- Star rating
- Review text
- Date

**Integration options:**
- Manual entry (admin dashboard)
- Google Reviews API
- Yelp integration
- Simple JSON file

### 13.2 Add to Homepage
**Status:** ⏳ Pending

**Add testimonials section to:**
- [ ] Homepage
- [ ] Services page
- [ ] About page

---

## PHASE 14: MOBILE RESPONSIVENESS

### 14.1 Mobile Testing
**Status:** ⏳ Pending

**Test all pages on mobile:**
- [ ] Homepage
- [ ] Services pages
- [ ] About page
- [ ] Contact/Quote form
- [ ] Chat widget (mobile)
- [ ] Admin dashboard (tablet/mobile)

### 14.2 Mobile-Specific Adjustments
**Status:** ⏳ Pending

**Common issues to check:**
- [ ] Navigation menu (hamburger on mobile)
- [ ] Button sizing (touch-friendly)
- [ ] Form field sizing
- [ ] Image scaling
- [ ] Chat widget position
- [ ] Font sizes (readability)
