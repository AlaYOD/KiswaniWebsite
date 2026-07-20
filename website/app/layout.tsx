import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../components/CartSystem";
import { LightBeamCursor, PageMotionFrame, ScrollLightProgress } from "../components/LuxuryEnhancements";

const kiswaniSans = IBM_Plex_Sans_Arabic({
  variable: "--font-kiswani-sans",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kiswani-website-82jb.vercel.app"),
  title: {
    default: "Kiswani Lights",
    template: "%s | Kiswani Lights",
  },
  description: "Kiswani Lights - lighting is the soul of the space. Decorative and technical lighting for distinctive interiors.",
  applicationName: "Kiswani Lights",
  keywords: ["Kiswani Lights", "architectural lighting", "decorative lighting", "technical lighting", "Ramallah"],
  openGraph: {
    type: "website",
    siteName: "Kiswani Lights",
    title: "Kiswani Lights | Architectural lighting for memorable spaces",
    description: "Decorative and technical lighting shaped for distinctive interiors and architectural projects.",
    locale: "en_US",
    alternateLocale: ["ar_PS", "he_IL"],
    images: [{ url: "/og.png", alt: "Warm architectural lighting by Kiswani Lights" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiswani Lights | Architectural lighting for memorable spaces",
    description: "Decorative and technical lighting shaped for distinctive interiors and architectural projects.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/images/kiswani-logo.png",
    shortcut: "/images/kiswani-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={kiswaniSans.variable}>
      <body className="antialiased"><CartProvider><PageMotionFrame>{children}</PageMotionFrame><ScrollLightProgress /><LightBeamCursor /></CartProvider></body>
    </html>
  );
}
