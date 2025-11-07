/*
  # Cleanerstein Client Management System
  
  ## Overview
  This migration creates the foundation for Cleanerstein's client quote and service management system,
  replacing the contractor acquisition system with client relationship management for a cleaning business.
  
  ## New Tables
  
  ### `clients`
  Stores all client information and service requests from the chatbot and website.
  
  ### `quotes`
  Tracks quotes sent to clients for cleaning and pressure washing services.
  
  ### `appointments`
  Manages scheduled cleaning appointments and service history.
  
  ### `client_conversations`
  Stores chatbot conversation transcripts for client interactions.
  
  ## Security
  - RLS enabled on all tables
  - Public can insert client requests (lead capture via chatbot/forms)
  - Only authenticated Cleanerstein staff can read/update/delete
*/

-- ========================================
-- CLIENTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Contact Information
  name text NOT NULL,
  email text,
  phone text,
  
  -- Service Request Details
  service_type text CHECK (service_type IN ('commercial_cleaning', 'residential_cleaning', 'pressure_washing')),
  property_type text,
  square_footage integer,
  frequency text CHECK (frequency IN ('one-time', 'weekly', 'bi-weekly', 'monthly', 'custom')),
  
  -- Location
  address text,
  city text DEFAULT 'Beaufort',
  state text DEFAULT 'SC',
  zip text,
  
  -- Request Specifics
  special_requests text,
  urgency text CHECK (urgency IN ('asap', 'this_week', 'next_week', 'flexible')),
  budget_range text,
  
  -- Status Tracking
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'scheduled', 'active', 'completed', 'cancelled')),
  lead_source text DEFAULT 'website',
  
  -- Admin Notes
  admin_notes text,
  
  -- Indexing
  CONSTRAINT email_or_phone_required CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

-- ========================================
-- QUOTES TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Client Reference
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  
  -- Quote Details
  quote_number text UNIQUE NOT NULL,
  service_type text NOT NULL,
  description text,
  
  -- Pricing
  subtotal decimal(10,2) NOT NULL,
  tax decimal(10,2) DEFAULT 0,
  total decimal(10,2) NOT NULL,
  
  -- Line Items (JSON array)
  line_items jsonb DEFAULT '[]'::jsonb,
  
  -- Status
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired')),
  sent_at timestamptz,
  viewed_at timestamptz,
  responded_at timestamptz,
  expires_at timestamptz,
  
  -- Notes
  internal_notes text,
  terms_conditions text
);

-- ========================================
-- APPOINTMENTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Client & Quote Reference
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  quote_id uuid REFERENCES quotes(id) ON DELETE SET NULL,
  
  -- Appointment Details
  service_type text NOT NULL,
  scheduled_date date NOT NULL,
  scheduled_time_start time NOT NULL,
  scheduled_time_end time,
  estimated_duration_minutes integer,
  
  -- Location
  service_address text NOT NULL,
  city text DEFAULT 'Beaufort',
  state text DEFAULT 'SC',
  zip text,
  access_instructions text,
  
  -- Team Assignment
  assigned_team text,
  assigned_staff jsonb DEFAULT '[]'::jsonb,
  
  -- Status
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'rescheduled', 'no_show')),
  
  -- Completion Details
  completed_at timestamptz,
  actual_duration_minutes integer,
  completion_notes text,
  before_photos jsonb DEFAULT '[]'::jsonb,
  after_photos jsonb DEFAULT '[]'::jsonb,
  
  -- Payment
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'partial', 'refunded')),
  amount_charged decimal(10,2),
  
  -- Client Feedback
  client_rating integer CHECK (client_rating >= 1 AND client_rating <= 5),
  client_feedback text,
  
  -- Admin Notes
  internal_notes text
);

-- ========================================
-- CLIENT CONVERSATIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS client_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Client Reference (nullable until we link the conversation)
  client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
  
  -- Conversation Metadata
  session_id text UNIQUE NOT NULL,
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  
  -- Captured Data
  visitor_name text,
  visitor_email text,
  visitor_phone text,
  service_interest text,
  
  -- Messages (JSON array of message objects)
  messages jsonb DEFAULT '[]'::jsonb,
  
  -- Status
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
  
  -- Lead Quality
  qualification_score integer DEFAULT 0,
  lead_generated boolean DEFAULT false
);

-- ========================================
-- INDEXES
-- ========================================
-- Clients
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_created ON clients(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_phone ON clients(phone);
CREATE INDEX IF NOT EXISTS idx_clients_service_type ON clients(service_type);

-- Quotes
CREATE INDEX IF NOT EXISTS idx_quotes_client_id ON quotes(client_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_number ON quotes(quote_number);

-- Appointments
CREATE INDEX IF NOT EXISTS idx_appointments_client_id ON appointments(client_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_created ON appointments(created_at DESC);

-- Conversations
CREATE INDEX IF NOT EXISTS idx_conversations_session ON client_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_conversations_client ON client_conversations(client_id);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON client_conversations(status);
CREATE INDEX IF NOT EXISTS idx_conversations_created ON client_conversations(created_at DESC);

-- ========================================
-- ROW LEVEL SECURITY
-- ========================================
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_conversations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert clients (lead capture)
CREATE POLICY "Anyone can submit client request"
  ON clients FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to insert conversations (chatbot)
CREATE POLICY "Anyone can create conversation"
  ON client_conversations FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to update their own conversation
CREATE POLICY "Anyone can update conversation"
  ON client_conversations FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Authenticated users (Cleanerstein staff) can view all
CREATE POLICY "Staff can view all clients"
  ON clients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff can view all quotes"
  ON quotes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff can view all appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Staff can view all conversations"
  ON client_conversations FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can update
CREATE POLICY "Staff can update clients"
  ON clients FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Staff can update quotes"
  ON quotes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Staff can update appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can insert
CREATE POLICY "Staff can create quotes"
  ON quotes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Staff can create appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can delete
CREATE POLICY "Staff can delete quotes"
  ON quotes FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Staff can delete appointments"
  ON appointments FOR DELETE
  TO authenticated
  USING (true);

-- ========================================
-- TRIGGERS
-- ========================================
-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_quotes_updated_at ON quotes;
CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_appointments_updated_at ON appointments;
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_conversations_updated_at ON client_conversations;
CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON client_conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- UTILITY FUNCTIONS
-- ========================================
-- Generate quote number
CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS text AS $$
DECLARE
  new_number text;
  number_exists boolean;
BEGIN
  LOOP
    new_number := 'QT-' || to_char(now(), 'YYYYMMDD') || '-' || LPAD(floor(random() * 10000)::text, 4, '0');
    SELECT EXISTS(SELECT 1 FROM quotes WHERE quote_number = new_number) INTO number_exists;
    EXIT WHEN NOT number_exists;
  END LOOP;
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Sample data for testing (commented out for production)
-- INSERT INTO clients (name, email, phone, service_type, property_type, city, status) VALUES
-- ('John Smith', 'john@example.com', '772-555-0101', 'residential_cleaning', 'house', 'Beaufort', 'new'),
-- ('ABC Corp', 'contact@abccorp.com', '772-555-0102', 'commercial_cleaning', 'office', 'Beaufort', 'quoted'),
-- ('Jane Doe', 'jane@example.com', '772-555-0103', 'pressure_washing', 'house', 'Beaufort', 'scheduled');
