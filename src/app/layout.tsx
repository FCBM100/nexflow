import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import LenisProvider from "@/lib/LenisProvider";
import AppShell from "@/components/ui/AppShell";
import "./globals.css";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-latin",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050B18",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nexflow.dev"),
  title: "NexFlow — Automate. Integrate. Elevate.",
  icons: {
    icon: [
      { url: "/brand/favicon.ico", sizes: "any" },
      { url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/brand/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/brand/site.webmanifest",
  description:
    "تفرّغ لتطوير مشروعك.. واترك إدارة بيجك وأعمالك للأنظمة الذكية! شريكك التقني لبناء المواقع والبوتات الذكية والأتمتة.",
  openGraph: {
    title: "NexFlow — Automate. Integrate. Elevate.",
    description:
      "تفرّغ لتطوير مشروعك.. واترك إدارة بيجك وأعمالك للأنظمة الذكية!",
    locale: "ar_AR",
    siteName: "NexFlow",
    images: [
      {
        url: "/brand/og-banner.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexFlow — Automate. Integrate. Elevate.",
    description:
      "تفرّغ لتطوير مشروعك.. واترك إدارة بيجك وأعمالك للأنظمة الذكية!",
    images: ["/brand/og-banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      dir="rtl"
      lang="ar"
      className={`${ibmPlexSansArabic.variable} ${inter.variable}`}
    >
      <body className="font-arabic antialiased">
        <LenisProvider>
          <AppShell>{children}</AppShell>
        </LenisProvider>
      </body>
    </html>
  );
}
