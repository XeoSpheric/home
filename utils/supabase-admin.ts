import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdmin = createClient(supabaseUrl || '', supabaseServiceKey || '');

const getUser = async (token: string) => {
  const { data, error } = await supabaseAdmin.auth.api.getUser(token);

  if (error) {
    throw error;
  }

  return data;
};

const resetPass = async (email: string) => {
  await supabaseAdmin.auth.api.resetPasswordForEmail(email);
};

const magicLinkLogin = async (email: string) => {
  await supabaseAdmin.auth.api.generateLink('magiclink', email);
};

export { supabaseAdmin, getUser, resetPass, magicLinkLogin };
