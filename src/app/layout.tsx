import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "../providers/react_query";
import { Toaster } from "@/components/ui/sonner"
import { UserSessionContext } from "../providers/authContext";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { NavContextProvider } from "./(app)/_LayoutComponents/Headers/HeaderComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rank your fav",
  description: "Welcome to rank",
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
        <NuqsAdapter>
          <ReactQueryProvider>
            <UserSessionContext>
              <NavContextProvider>


                <Toaster />
                <div className="h-full ">

                  {children}
                </div>
              </NavContextProvider>
            </UserSessionContext>
          </ReactQueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
