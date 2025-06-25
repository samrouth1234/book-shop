import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";

import ThemeProvider from "@/components/layout/dashboard/components/theme-toggle/theme-provider";
import Providers from "@/components/layout/dashboard/providers";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/providers/react-query";

import "../globals.css";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale: _locale } = await params;
  return {
    title: "Book Shop",
    description: "This website for read book online.",
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const { locale } = await params;

  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value;
  const isScaled = activeThemeValue?.endsWith("-scaled");

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          activeThemeValue ? `theme-${activeThemeValue}` : "",
          isScaled ? "theme-scaled" : "",
          geistSans,
          geistMono,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <Providers activeThemeValue={activeThemeValue as string}>
            <QueryProvider>{children}</QueryProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
