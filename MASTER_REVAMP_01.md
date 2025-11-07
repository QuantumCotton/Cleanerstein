# MASTER REVAMP TASK LIST - CLEANERSTEIN
**Project:** Transform Elite Service Hub → Cleanerstein Cleaning & Pressure Washing
**Location:** Beaufort, South Carolina
**Purpose:** Commercial/Residential Cleaning + Pressure Washing Service Website

---

## PHASE 1: BRAND & CONTACT INFORMATION

### 1.1 Global Brand Constants
**Status:** ✅ COMPLETE

**Files to Update:**
- [x] Create `src/constants/brand.ts` with:
  ```typescript
  export const BRAND = {
    name: 'Cleanerstein',
    tagline: 'Professional Cleaning & Pressure Washing',
    location: {
      city: 'Beaufort',
      state: 'South Carolina',
      stateAbbr: 'SC',
      serviceArea: 'Beaufort and surrounding Lowcountry'
    },
    contact: {
      phone: '(843) XXX-XXXX',  // Need real number
      email: 'info@cleanerstein.com',
      businessName: 'Cleanerstein LLC'
    },
    services: {
      primary: ['Commercial Cleaning', 'Residential Cleaning', 'Pressure Washing'],
      commercial: ['Office Buildings', 'Retail Spaces', 'Medical Facilities', 'Restaurants'],
      residential: ['Deep Cleaning', 'Regular Maintenance', 'Move In/Out', 'Post-Construction'],
      pressureWashing: ['House Washing', 'Driveway & Sidewalk', 'Deck & Patio', 'Commercial Building Exterior']
    },
    colors: {
      primary: '#2563EB',      // Blue (professional/clean)
      secondary: '#10B981',    // Green (fresh/eco-friendly)
      accent: '#F59E0B',       // Amber (energy/attention)
      dark: '#1F2937',
      light: '#F9FAFB'
    }
  };
  ```

### 1.2 Component Branding Updates
**Status:** ✅ COMPLETE

**Files to Update:**
- [x] `src/components/layout/Footer.tsx` - Replace ESH branding, contact info
- [x] `src/components/layout/Navigation.tsx` - Update logo, company name, nav items
- [x] `src/components/atlas/ChatWidget.tsx` - Change "Atlas AI" → "Cleanerstein Assistant"
- [x] `src/components/Hero.tsx` - Complete rebrand (integrated in HomePage)
- [ ] `src/components/ValueProposition.tsx` - Rewrite for cleaning services

**Search & Replace Needed:**
- [x] "Elite Service Hub" → "Cleanerstein"
- [x] "ESH" → "Cleanerstein"
- [x] "contractor" → "client" (where appropriate)
- [x] "esh-gold" → "cleanerstein-blue" (CSS variable)

---

## PHASE 2: HOME PAGE & PUBLIC PAGES

### 2.1 Home Page (`src/pages/HomePage.tsx`)
**Status:** ✅ COMPLETE

**Changes Needed:**
- [x] Hero section: New headline "Sparkling Clean Spaces, Every Time"
- [x] Update trust stats to client-focused metrics:
  - "500+ Happy Clients"
  - "10,000+ Cleanings Completed"
  - "4.9★ Average Rating"
  - "Same-Day Service Available"
- [x] Rewrite value propositions:
  - Professional Cleaning Services
  - Pressure Washing Experts
  - Eco-Friendly Products
  - Satisfaction Guaranteed
- [x] Update CTA buttons: "Get a Free Quote" instead of "Join as Contractor"
- [x] Add service showcase section with images

### 2.2 Services Page (New)
**Status:** ⏳ Pending

**Create:** `src/pages/ServicesPage.tsx`
- [ ] Commercial Cleaning section with details
- [ ] Residential Cleaning section with details
- [ ] Pressure Washing section with details
- [ ] Pricing tiers or "Request Quote" CTA
- [ ] Before/After photo gallery
- [ ] Service area map

### 2.3 About Page (`src/pages/AboutPage.tsx`)
**Status:** ✅ COMPLETE

**Rewrite for:**
- [x] Cleanerstein company story
- [x] Team introduction (if applicable)
- [x] Why choose Cleanerstein
- [x] Service area: Beaufort, SC and Lowcountry
- [x] Certifications, insurance, eco-friendly commitment

### 2.4 Remove/Repurpose Forms Page
**Status:** ⏳ Pending

**Action:** Remove or convert `src/pages/FormsPage.tsx` to "Careers Page" (if hiring cleaners)
- [ ] Delete `src/pages/FormsPage.tsx` OR
- [ ] Convert to careers/employment application page
- [ ] Remove route from `src/App.tsx`
- [ ] Update navigation links

### 2.5 How It Works Page (`src/pages/HowItWorksPage.tsx`)
**Status:** ⏳ Pending

**Rewrite for Client Journey:**
- [ ] Step 1: Request a Quote (via chat or form)
- [ ] Step 2: Get Custom Pricing
- [ ] Step 3: Schedule Service
- [ ] Step 4: Enjoy Your Clean Space
- [ ] Add FAQ section

---

## PHASE 3: CHATBOT TRANSFORMATION

### 3.1 Atlas Service Logic (`src/services/atlasService.ts`)
**Status:** 🟡 PARTIAL

**Major Changes:**
- [ ] **Change ServiceVertical types:**
  - Remove contractor-focused types
  - Add: 'commercial_cleaning', 'residential_cleaning', 'pressure_washing'
  
- [ ] **Update LeadData interface:**
  ```typescript
  interface ClientData {
    name?: string;
    email?: string;
    phone?: string;
    serviceType?: 'commercial_cleaning' | 'residential_cleaning' | 'pressure_washing';
    propertyType?: 'office' | 'retail' | 'medical' | 'restaurant' | 'house' | 'apartment' | 'condo';
    squareFootage?: string;
    frequency?: 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';
    urgency?: 'asap' | 'this_week' | 'flexible';
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    specialRequests?: string;
    budget?: string;
  }
  ```

- [x] **Update conversation greeting:**
  - Change from contractor acquisition to service quote request
  - "Hi! I'm your Cleanerstein assistant. Looking for cleaning or pressure washing services today?"

- [ ] **Rewrite intake questions:**
  - What type of service? (Commercial cleaning, Residential cleaning, Pressure washing)
  - Property type and size?
  - How often do you need service?
  - When do you need us?
  - Special requests or areas of concern?

- [ ] **Remove contractor-specific fields:**
  - yearsinBusiness, teamSize, revenueGoal, etc.
  - Keep: name, contact, address, service needs

### 3.2 Atlas OpenAI Function (`netlify/functions/atlas-openai.js`)
**Status:** ✅ COMPLETE (via geminiService.ts)

**Changes:**
- [x] Update system prompt for client intake (not contractor acquisition)
- [x] Focus on gathering quote requirements, not business growth
- [x] Maintain friendly, helpful tone for residential clients

### 3.3 Chat Widget (`src/components/atlas/ChatWidget.tsx`)
**Status:** ✅ COMPLETE

**Updates:**
- [x] Change header: "Cleanerstein Assistant" instead of "Atlas AI"
- [x] Update subtitle: "Get a Free Quote" instead of "Elite Service Hub Assistant"
- [x] Change color scheme to Cleanerstein brand colors
- [x] Update "Powered by" footer

---

## PHASE 4: DATABASE SCHEMA

### 4.1 Create Client Schema
**Status:** ✅ CREATED (Not deployed yet)

**Create:** `supabase/migrations/20251106000001_create_cleanerstein_clients.sql`

```sql
-- Clients table (replaces contractor_applications)
CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Contact Info
  name text NOT NULL,
  email text,
  phone text,
  
  -- Service Request
  service_type text CHECK (service_type IN ('commercial_cleaning', 'residential_cleaning', 'pressure_washing')),
  property_type text,
  square_footage integer,
  frequency text CHECK (frequency IN ('one-time', 'weekly', 'bi-weekly', 'monthly')),
  
  -- Location
  address text,
  city text,
  state text DEFAULT 'SC',
  zip text,
  
  -- Request Details
  special_requests text,
  urgency text,
  budget_range text,
  
  -- Status
  status text DEFAULT 'new' CHECK (status IN ('new', 'quoted', 'scheduled', 'completed', 'cancelled')),
  
  -- Admin Notes
  admin_notes text
);
```

**Additional Tables:**
- [x] `quotes` - Store quote details for clients
- [x] `appointments` - Schedule cleaning appointments
- [ ] `invoices` - Track billing
- [x] `client_conversations` - Store chat transcripts

### 4.2 Remove Contractor Tables
**Status:** ⏳ Pending

**Action:** Archive or drop contractor-related tables
- [ ] Review `contractor_applications` table usage
- [ ] Backup data if needed
- [ ] Drop or rename tables

---

## PHASE 5: ADMIN DASHBOARD TRANSFORMATION

### 5.1 Dashboard Overview (`src/pages/admin/AdminDashboard.tsx`)
**Status:** ✅ COMPLETE

**Changes:**
- [x] Stats cards: "Active Clients", "Pending Quotes", "This Week's Appointments", "Monthly Revenue"
- [x] Recent leads → Recent quote requests
- [x] Remove contractor-specific sections
- [x] Add: Upcoming appointments widget
- [x] Add: Quote approval queue

### 5.2 Clients Page (Replaces LeadsPage)
**Status:** ⏳ Pending

**Rename/Rewrite:** `src/pages/admin/LeadsPage.tsx` → `src/pages/admin/ClientsPage.tsx`

**Features:**
- [ ] Client list with filters (status, service type, date)
- [ ] Client detail view
- [ ] Contact information
- [ ] Service history
- [ ] Create quote button
- [ ] Schedule appointment button
- [ ] Chat transcript viewer

**Columns:**
- Name, Contact, Service Type, Property Type, Status, Created Date, Actions

### 5.3 Quotes Page (New)
**Status:** ⏳ Pending

**Create:** `src/pages/admin/QuotesPage.tsx`

**Features:**
- [ ] Quote builder/editor
- [ ] Service line items with pricing
- [ ] Send quote to client (email)
- [ ] Quote status tracking (sent, viewed, accepted, rejected)
- [ ] Convert quote to appointment

### 5.4 Appointments/Schedule Page (New)
**Status:** ⏳ Pending

**Create:** `src/pages/admin/SchedulePage.tsx`

**Features:**
- [ ] Calendar view of scheduled cleanings
- [ ] Day/Week/Month views
- [ ] Assign cleaning crew/staff
- [ ] Service details and client notes
- [ ] Mark as completed
- [ ] Reschedule functionality

### 5.5 Remove Contractor Pages
**Status:** ✅ COMPLETE

**Delete or Archive:**
- [x] `src/pages/admin/ContractorAccountsPage.tsx` - Removed from routes
- [x] `src/pages/admin/ContractorPerformance.tsx` - Removed from routes
- [x] Remove routes from `src/App.tsx`
- [ ] Update navigation in `src/components/admin/AdminLayout.tsx`
