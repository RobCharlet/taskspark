import { Geist, Geist_Mono } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";
import { StackProviders } from "@/components/providers/stack-provider";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taskspark",
  description: "Collaborative task manager powered by Neon Postgres and Stack Auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-dvh bg-background font-sans text-foreground antialiased",
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <StackProviders>{children}</StackProviders>
      </body>
    </html>
  );
}
