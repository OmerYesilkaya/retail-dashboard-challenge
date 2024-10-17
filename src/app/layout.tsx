import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <main className="mx-auto flex min-h-screen max-w-[1480px] flex-col p-10">
          <Header />
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
