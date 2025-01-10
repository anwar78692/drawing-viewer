import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Toaster } from 'react-hot-toast';
import FileList from './FileList';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  uploading: boolean;
  file: File | null;
}

export default function Drawer({ open, onClose, handleFileChange, handleUpload, uploading, file }: DrawerProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              className={`pointer-events-auto relative w-screen max-w-md transform transition-transform duration-500 ease-in-out ${
                open ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <TransitionChild>
             
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <DialogTitle className="text-xl font-semibold text-gray-900">
                    Welcome to Drawer Application
                  </DialogTitle>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <Toaster position="top-center" reverseOrder={false} />

                  <div className="flex items-center gap-2 mb-4">
                    <label className="inline-flex items-center">
                      <span className=" text-black border border-gray-300 px-4 py-2 rounded cursor-pointer hover:bg-gray-50">
                        Choose File
                      </span>
                      <input 
                        type="file" 
                        onChange={handleFileChange}
                        accept=".pdf,.png,.jpeg,.jpg"
                        className="hidden"
                      />
                    </label>
                    <span className="text-gray-600">
                      {file ? file.name : 'No file selected'}
                    </span>
                  </div>

                  <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className={`w-full py-3 rounded-md text-white font-medium transition-colors duration-200 ${
                      !file || uploading
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>

                  {uploading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="w-16 h-16 border-t-transparent border-blue-500 border-solid border-t-[4px] border-[4px] rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </div>
            
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
