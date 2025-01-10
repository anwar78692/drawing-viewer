import { createClient } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadFile(file) {
    const { data, error } = await supabase.storage.from('drawings').upload(`public/${file.name}`, file);
    if (error) {
      toast.error(error.message)
      console.error('Error uploading file:', error.message);
      return null;
    }
    return data.path; // This is the file path you can store in your database
  }
  