import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import JsonLd from "@/components/json-ld";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://www.presencelabs.in";
const SITE_NAME = "Sudo by Presence Labs";
const DESCRIPTION =
  "Sudo is a small, open-source desk creature you can talk to, personalize, and build on. It runs on your own AI — self-host or a free API — with no subscription.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sudo — an open-source desk creature you can talk to",
    template: "%s · Sudo by Presence Labs",
  },
  description: DESCRIPTION,
  applicationName: "Sudo",
  authors: [{ name: "Presence Labs", url: SITE_URL }],
  creator: "Presence Labs",
  publisher: "Presence Labs",
  category: "technology",
  keywords: [
    "Sudo",
    "Presence Labs",
    "desk creature",
    "AI desk companion",
    "open-source robot",
    "ESP32-S3",
    "self-hosted AI assistant",
    "desk pet",
    "expressive robot",
    "voice assistant SDK",
    "no subscription AI",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Sudo — an open-source desk creature you can talk to",
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/hero.png",
        width: 1612,
        height: 976,
        alt: "Sudo, an expressive desk creature by Presence Labs, sitting on a desk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudo — an open-source desk creature you can talk to",
    description: DESCRIPTION,
    images: ["/hero.png"],
    creator: "@presence_labs",
    site: "@presence_labs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0b",
  colorScheme: "dark",
};

const structuredData: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Presence Labs",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
      description:
        "Presence Labs builds Sudo, an open-source, expressive desk creature with a personality engine and a real SDK.",
      sameAs: [
        "https://x.com/presence_labs",
        "https://www.instagram.com/presencelabs.in",
        "https://www.youtube.com/@presencelabs",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "Product",
      "@id": `${SITE_URL}/#product`,
      name: "Sudo",
      url: SITE_URL,
      image: `${SITE_URL}/hero.png`,
      description:
        "An expressive, open-source desk creature you can talk to and personalize. It has a face and moods driven by an emotion engine, runs on the AI you choose (self-hosted or a free API), and ships with a real SDK — no forced subscription.",
      brand: { "@type": "Brand", name: "Presence Labs" },
      category: "AI desk companion",
      manufacturer: { "@id": `${SITE_URL}/#organization` },
      audience: {
        "@type": "Audience",
        audienceType: "developers, makers, desk-setup enthusiasts",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexMono.variable} ${spaceGrotesk.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-canvas text-on-primary">
        <JsonLd data={structuredData} />
        {children}
      </body>
    </html>
  );
}
