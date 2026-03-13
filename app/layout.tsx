import type { Metadata } from "next";
import type { RootLayoutProps } from "@/app/types/index";
import "./globals.css";
import "./slash.css";
import "./slash-intl.css";
import "./animations.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  title: "Slash Sports & Entertainment",
  description: "Slash Sports & Entertainment official website",
  icons: {
    icon: "/images/s-logo-black.png",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    title: "Slash Sports & Entertainment",
    description: "Slash Sports & Entertainment official website",
    url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
    siteName: "Slash Sports & Entertainment",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Slash Sports & Entertainment Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
