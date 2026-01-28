import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google"; // <- valid Google fonts
import "./globals.css";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { AuthProvider } from "../context/AuthContext";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const firaMono = Fira_Code({
  variable: "--font-fira-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "News Shelter",
  description: "News Shelter is a modern, full-stack news and blogging platform designed to deliver a smooth, intuitive, and distraction-free reading experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${firaMono.variable} antialiased text-gray-800`}
      >
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
