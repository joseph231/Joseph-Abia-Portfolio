import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Geist } from 'next/font/google'
 
const geist = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default:  "Joseph Abia — Network Architect & Engineer",
    template: "%s | Joseph Abia",
  },
  description:
    "Portfolio of Joseph Abia — Network Architect, Engineer, Full-Stack Web Developer and IBM Cybersecurity Analyst in training.",
  keywords: [
    "Network Architect", "Network Engineer", "Web Developer",
    "Cybersecurity", "IT Support", "Next.js", "Nigeria",
  ],
  icons: {
    icon: [
      { url: '/icon.svg' },
      { url: '/icon.svg', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png' },
  },
  authors: [{ name: "Joseph Abia" }],
  openGraph: {
    type:      "website",
    locale:    "en_US",
    siteName:  "Joseph Abia Portfolio",
    title:     "Joseph Abia — Network Architect & Engineer",
    description:
      "Network Architect, Web Developer, and Cybersecurity Analyst. Designing resilient infrastructure and building modern web applications.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}