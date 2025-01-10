import Script from 'next/script';
import { ReactNode } from 'react';
import './globals.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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

        <Script
          src="https://developer.api.autodesk.com/modelderivative/v2/viewers/viewer3D.min.js?v=v7.*"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
