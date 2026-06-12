import { ThemeModeScript } from "flowbite-react";
import { ThemeInit } from "../.flowbite-react/init";
import Background from "@/components/Background";
import { Inter } from "next/font/google"
import { UserProvider } from "@/contexts/UserContext";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata:Metadata = {
  title:"Blog"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${inter.className} relative min-h-screen bg-gradient-to-r from-[#020024] via-[#090979] to-[#00d4ff]`}>
        <UserProvider>
          <ThemeInit />
          <Background />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
