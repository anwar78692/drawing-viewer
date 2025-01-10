import React from 'react';
import ForgeViewer from '../components/ForgeViewer';

function ViewerPage() {
  const urn = "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6ZmFpemFuL1N1c3BlbnNpb24uZHdn"; // Replace with your Base64-encoded URN

  return (
    <div>
      <h1>Autodesk Forge Viewer</h1>
      <ForgeViewer urn={urn} />
    </div>
  );
}

export default ViewerPage;
