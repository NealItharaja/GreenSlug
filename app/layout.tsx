import "./globals.css";

import { Auth0Provider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Auth0Provider>
        <body>
          {children} {/* Only pages render here */}
        </body>
      </Auth0Provider>
    </html>
  );
}
