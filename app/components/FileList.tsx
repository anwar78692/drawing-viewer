'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

// Update the FileItem interface to match Supabase's return type
interface FileItem {
  name: string;
  id: string;
  metadata: Record<string, any>;  // Changed to match Supabase's metadata type
  created_at: string;
  publicUrl?: string;  // Added optional publicUrl
  bucket_id?: string;
  owner?: string;
  updated_at?: string;
  last_accessed_at?: string;
}

export default function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    try {
      const { data: fileList } = await supabase
        .storage
        .from('drawings')
        .list('public');

      if (fileList) {
        const filesWithUrls = await Promise.all(
          fileList.map(async (file) => {
            const { data } = await supabase
              .storage
              .from('drawings')
              .createSignedUrl(`public/${file.name}`, 60 * 60);

            return {
              ...file,
              publicUrl: data?.signedUrl
            } as FileItem;  // Type assertion to FileItem
          })
        );
        
        setFiles(filesWithUrls);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {files.map((file) => (
        <div key={file.id} className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
          <div className="aspect-square mb-2">
            {file.metadata.mimetype?.startsWith('image/') ? (
              <img 
                src={file.publicUrl} 
                alt={file.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-white truncate" title={file.name}>
              {file.name}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(file.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
