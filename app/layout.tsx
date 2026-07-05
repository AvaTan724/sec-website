// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for the giant wordmark and section mega-headers only.
// Condensed, heavy — the Senra-style poster weight Geist can't provide.
const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

// Editorial serif for the big statement lines ("A home for the people who build.")
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // TODO: replace with the real deployed domain before launch — required for
  // correct OG cards when the link is shared on WhatsApp/LinkedIn.
  metadataBase: new URL("https://sunwaysec.netlify.app"),
  title: "Sunway Entrepreneurs Club",
  description:
    "The entrepreneurs club at Sunway University. Reestablished 2026. Founder talks, corporate visits, SEC Reads, and the Sunway Nexus community.",
  openGraph: {
    title: "Sunway Entrepreneurs Club",
    description:
      "The entrepreneurs club at Sunway University. Reestablished 2026.",
    type: "website",
    // TODO: add an OG image at public/og.png (1200x630, black wordmark on white)
    // then uncomment:
    // images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}