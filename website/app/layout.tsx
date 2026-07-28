import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import { CartProvider } from "../components/CartSystem";
import { LightBeamCursor, PageMotionFrame, ScrollLightProgress } from "../components/LuxuryEnhancements";

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
    images: [{ url: "/og-v2.jpg", width: 1200, height: 630, alt: "Kiswani Lights architectural lighting" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiswani Lights | Architectural lighting for memorable spaces",
    description: "Decorative and technical lighting shaped for distinctive interiors and architectural projects.",
    images: ["/og-v2.jpg"],
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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased"><CartProvider><PageMotionFrame>{children}</PageMotionFrame><ScrollLightProgress /><LightBeamCursor /></CartProvider></body>
    </html>
  );
}
