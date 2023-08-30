import type { Metadata } from "next";
import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';
import { NextAuthProvider } from '@/components/utils/NextAuthSessionProvider';
import { ThemeProvider } from '@/components/utils/Themeprovider';
import { TrpcProvider } from '@/components/utils/TrpcProvider';

import './globals.css';
const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "ShopNest";
const APP_DEFAULT_TITLE = "ShopNest E-Commerce";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TrpcProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextAuthProvider>
              {children}
              <Toaster />
            </NextAuthProvider>
          </ThemeProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
