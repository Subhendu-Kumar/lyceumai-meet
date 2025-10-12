import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@/providers/auth.provider";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import StreamProvider from "@/providers/stream.provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LyceumAI Meet",
  description: "video conferencing solution for lyceumai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#161925] text-white`}
      >
        <AuthProvider>
          <StreamProvider>{children}</StreamProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
