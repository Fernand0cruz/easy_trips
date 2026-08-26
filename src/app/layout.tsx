import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "../components/ui/navbar";
import { ThemeProvider } from "@/providers/theme-providers";
import { AuthProvider } from "@/providers/auth-provider";
import Footer from "@/components/ui/footer";
import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "EASY TRIPS",
  description: "Planeje a viagem dos seus sonhos com a ajuda da Easy Trips. Explore destinos paradisíacos, culturas fascinantes e aventuras emocionantes. Encontre passagens aéreas baratas, acomodações confortáveis e roteiros personalizados. Sua jornada começa aqui!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable, playfair.variable, "font-sans overflow-x-hidden")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-1 px-5">
                {children}
              </div>
              <Toaster />
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
