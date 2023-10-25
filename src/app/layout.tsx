import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TanstackProvider from "@/Provider/TanstackProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/Provider/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coral Bikes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <TanstackProvider>
            <Navbar />
            {children}
            <Footer />
          </TanstackProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
