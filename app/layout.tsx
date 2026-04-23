import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pickledy App",
  description: "Pickledy App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="relative min-h-dvh mx-auto w-full overflow-x-hidden overflow-y-auto !bg-[var(--ds-color-bg)] shadow-[var(--ds-shadow-card)]">
        {children}
      </body>
    </html>
  );
}
