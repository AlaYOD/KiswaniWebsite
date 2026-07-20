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
  title: {
    default: "Kiswani Lights",
    template: "%s | Kiswani Lights",
  },
  description: "Kiswani Lights - lighting is the soul of the space. Decorative and technical lighting for distinctive interiors.",
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
