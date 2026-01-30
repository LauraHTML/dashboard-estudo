import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jkquwfhsajmxldybcxwi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprcXV3ZmhzYWpteGxkeWJjeHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2MzI1NDUsImV4cCI6MjA4NTIwODU0NX0.jA_BrpPTG3U2F7zHdOaQoGm5qhdK6z2-CmoayD36OrU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)