'use client';

import { useEffect, useRef } from 'react';

interface ForgeViewerProps {
  urn: string; 
}

export default function ForgeViewer({ urn }: ForgeViewerProps) {
  const viewerRef = useRef<any>(null);

  useEffect(() => {
   
    if (typeof window === 'undefined' || typeof Autodesk === 'undefined') {
      console.error('Autodesk Forge Viewer library not loaded.');
      return;
    }

    const options = {
      env: 'AutodeskProduction',
      accessToken: process.env.NEXT_PUBLIC_AUTODESK_ACCESS_TOKEN, 
    };

    Autodesk.Viewing.Initializer(options, () => {
      const viewerDiv = document.getElementById('forgeViewer');
      if (!viewerDiv) {
        console.error('Forge viewer container not found.');
        return;
      }


      const viewer = new Autodesk.Viewing.GuiViewer3D(viewerDiv);
      viewer.start();
      viewerRef.current = viewer;

      const documentId = `urn:${urn}`;
      Autodesk.Viewing.Document.load(
        documentId,
        (doc) => {
          const defaultModel = doc.getRoot().getDefaultGeometry();
          viewer.loadDocumentNode(doc, defaultModel);
        },
        (error) => console.error('Error loading document:', error)
      );
    });

    return () => {
      if (viewerRef.current) {
        viewerRef.current.finish();
        viewerRef.current = null;
      }
    };
  }, [urn]);

  return <div id="forgeViewer" style={{ width: '100%', height: '500px' }} />;
}
