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
        <link href="https://api.fontshare.com/v2/css?f[]=gambarino@400&f[]=switzer@100,101,200,201,300,301,400,401,500,501,600,601,700,701,800,801,900,901&display=swap" rel="stylesheet"></link>
      </head>
      <Suspense>
        <Analytics />
      </Suspense>
      {children}
    </html>
  );
}
// TODO: Make sure PWA service worker is compatible with Google Analytics
