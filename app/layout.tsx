import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import FloatingCallButton from "@/components/ui/FloatingCallButton";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Signature Cars | Where Quality Meets Luxury",
  description: "Browse 1000+ verified premium cars at unbeatable prices. Trusted by 10,000+ satisfied customers across India. 200+ point inspection, 7-day money back guarantee.",
  keywords: "premium cars, luxury cars, car dealership, used cars, new cars, India, Mercedes, BMW, Audi, car financing, car insurance",
  authors: [{ name: "The Signature Cars" }],
  openGraph: {
    title: "The Signature Cars | Where Quality Meets Luxury",
    description: "Browse 1000+ verified premium cars at unbeatable prices. Trusted by 10,000+ satisfied customers across India.",
    type: "website",
    locale: "en_IN",
    siteName: "The Signature Cars",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Signature Cars | Where Quality Meets Luxury",
    description: "Browse 1000+ verified premium cars at unbeatable prices.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2569970580031764');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2569970580031764&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
        {children}
        <FloatingCallButton />
      </body>
    </html>
  );
}

