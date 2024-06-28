import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/ui/navbar";
import { ThemeProvider } from "@/providers/theme-providers";
import { AuthProvider } from "@/providers/auth-provider";
import Footer from "@/components/ui/footer";

import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "::: EASY TRIPS :::",
  description: "Planeje a viagem dos seus sonhos com a ajuda da Easy Trips. Explore destinos paradisíacos, culturas fascinantes e aventuras emocionantes. Encontre passagens aéreas baratas, acomodações confortáveis e roteiros personalizados. Sua jornada começa aqui!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="flex flex-col h-screen">
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
