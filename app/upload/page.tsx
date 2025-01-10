'use client'
import { useEffect, useState } from 'react';
import { uploadFile } from '../utils/supabaseClient';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/navigation';
import Drawer from '../components/Drawer';
import toast from 'react-hot-toast';
import FileList from '../components/FileList';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      // Reset the input value to clear the file name display
      e.target.value = '';
    }
  };

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/');
      } else {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  const handleUpload = async () => {
    if (!file) return toast.error('Please select a file');
    if (!['application/pdf', 'image/png', 'image/jpeg'].includes(file.type)) {
      toast.error('Invalid file format. Only PDF or images are allowed.');
      return;
    }

    setUploading(true);

    try {
      const path = await uploadFile(file);
      if (path) {
        toast.success('File uploaded successfully!');
        // Clear the file state after successful upload
        setFile(null);
      } else {
        toast.error('File upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6 shadow-md rounded mt-10">
      <button
        onClick={() => setDrawerOpen(true)} 
        className="bg-blue-500 text-white px-4 py-2 rounded mt-6"
      >
        Open Drawer
      </button>
      <FileList/>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
        uploading={uploading}
        file={file}
      />
    </div>
  );
}
