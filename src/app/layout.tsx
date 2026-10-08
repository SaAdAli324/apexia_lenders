import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Apexia Lending | Expert Home Loan in Australia",
  description:
    "Compare 50+ Australian lenders and find the right home loan for you. Free mortgage brokerage service — home loan, refinancing, investment loan & more.",
  keywords: [
    "mortgage broker",
    "home loan",
    "Australia",
    "refinancing",
    "first home buyer",
    "investment loan",
    "Apexia Lending",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
