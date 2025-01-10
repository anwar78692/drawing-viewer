import { supabase } from './supabaseClient';

// Upload a file to the "drawings" bucket
export async function uploadFile(file) {
  const { data, error } = await supabase.storage.from('drawings').upload(
    `public/${file.name}`, // Path inside the bucket
    file // File object from input element
  );

  if (error) {
    console.error('Error uploading file:', error.message);
    return null;
  }
  return data.path; // Return the uploaded file path
}
