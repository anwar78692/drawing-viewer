import Script from 'next/script';
import './globals.css';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://developer.api.autodesk.com/modelderivative/v2/viewers/style.min.css?v=v7.*"
          type="text/css"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-xl">Drawing Viewer</h1>
        </header>
        <main className="flex-grow p-4">{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          © 2025 Drawing Viewer
        </footer>

        {/* Add the Forge Viewer script */}
        <Script
          src="https://developer.api.autodesk.com/modelderivative/v2/viewers/viewer3D.min.js?v=v7.*"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
