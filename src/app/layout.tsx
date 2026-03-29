import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "mettā muse | Discover Unique Artisan Products",
  description:
    "Shop handcrafted and artisan products from around the world at mettā muse. Unique jewellery, clothing and more — curated for conscious consumers.",
  keywords: "artisan products, handcrafted jewellery, unique clothing, ethical shopping, metta muse",
  openGraph: {
    title: "mettā muse | Discover Unique Artisan Products",
    description:
      "Shop handcrafted and artisan products from around the world at mettā muse.",
    type: "website",
    locale: "en_US",
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
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
