import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/Footer";

import { Toaster } from "@/components/ui/toaster";
import UserProvider from "@/provider/user-provider";
import { ProfileProvider } from "@/context/profile-context";
// import Header from "@/components/header/page";
// import "./globals.css";
// import Footer from "@/components/footer/page";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <UserProvider>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
