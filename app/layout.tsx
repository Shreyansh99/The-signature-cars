import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

