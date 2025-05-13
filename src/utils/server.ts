import axios from 'axios';
// Supabase konfiguratsiyasi
export const SUPABASE_URL = 'https://gwvdyovzfeqiwxrfiici.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3dmR5b3Z6ZmVxaXd4cmZpaWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNzA1MDgsImV4cCI6MjA2MjY0NjUwOH0.ZsFQxcmtAGRQwy0SI1BaL2xrIJ1PMt_kQ5JKnyMdtlA';

export const supabaseAxios = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apiKey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
  },
});
