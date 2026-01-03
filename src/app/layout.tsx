import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Basalt | The Generative OS",
  description: "An infinite canvas where apps generate on demand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans overflow-hidden`}
        style={{ backgroundColor: '#09090b' }}
      >
        {children}
      </body>
    </html>
  );
}
