'use client'
export default function GlobalError({ error }: { error: Error }) {
    return (
      <html>
        <body>
          <h1>Application Error</h1>
          <p>{error.message}</p>
        </body>
      </html>
    );
  }
  