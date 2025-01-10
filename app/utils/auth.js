import { supabase } from './supabaseClient';

// Sign up a user
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    console.error('Error signing up:', error.message);
    return { error };
  }
  console.log('User signed up:', data);
  return { data };
}

// Sign in a user
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error('Error signing in:', error.message);
    return { error };
  }
  console.log('User signed in:', data);
  return { data };
}

// Sign out a user
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
    return { error };
  }
  console.log('User signed out successfully');
}
