import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AuthProvider } from "../lib/auth";

export const metadata: Metadata = {
  title: "AgriResolve | Simple & Secure Farm Trade",
  description:
    "Fair trade, zero disputes. Secure your farm deals and resolve disagreements without the stress using proof-based holding.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col font-sans">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
