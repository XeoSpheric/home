import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

const updatePassword = async (password: string) => {
  await supabase.auth.update({
    password: password
  });
};

const updateEmail = async (email: string) => {
  await supabase.auth.update({
    email: email
  });
};

const updateUserName = async (name: string) => {
  await supabase.auth.update({
    data: { full_name: name }
  });
};

export { supabase, updateUserName, updateEmail, updatePassword };
