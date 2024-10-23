import "./globals.css";
import { ReactNode } from "react";
import Script from "next/script";
import Analytics from "../components/Analytics";
import { Suspense } from "react";

export const metadata = {
  title: "Simplr Events - Coldplay",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID}')
          `}
        </Script>
      </head>
      <Suspense>
        <Analytics />
      </Suspense>
      {children}``
    </html>
  );
}
// TODO: Make sure PWA service worker is compatible with Google Analytics
