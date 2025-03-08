
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ContextProvider from "../../context";
import { headers } from 'next/headers'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Telegram Mini App',
  description: 'A simple Telegram Mini App using Next.js 14'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj =  headers();
  const cookies = headersObj.get('cookie')
  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
     
      <body className={inter.className}>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  );
}
