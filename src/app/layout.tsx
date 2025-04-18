import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ClickSpark from "@/components/ui/ClickSpark";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bharadwaj Reddy | Portfolio",
  description: "Innovative Software Developer & AI Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <ClickSpark
            // sparkColor="rgba(149, 99, 255, 0.7)"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
            extraScale={1.0}
          >
            {children}
          </ClickSpark>
          <Toaster 
            position="top-right" 
            toastOptions={{
              style: {
                background: 'var(--background)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              },
              duration: 3000
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
