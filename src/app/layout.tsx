import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://nexflow.dev"),
  title: "NexFlow — Automate. Integrate. Elevate.",
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
      <body className="font-arabic antialiased">{children}</body>
    </html>
  );
}
