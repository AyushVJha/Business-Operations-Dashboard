import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Business Operations Dashboard",
  description: "Real-time business operations dashboard with sales, inventory, and customer analytics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-900 text-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <Link href="/" className="text-xl font-bold hover:text-gray-300 transition-colors">
                  Business Dashboard
                </Link>
                <Link href="/dashboard" className="hover:text-gray-300 transition-colors">
                  Dashboard
                </Link>
              </div>
              <div className="text-sm text-gray-300">
                Real-time Analytics
              </div>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
