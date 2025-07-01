
import AuthProvider from '@/app/components/AuthProvider';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import AuthButton from './components/Login';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: 'TrendWise Blog',
  description: 'AI-powered blog with trending articles',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <nav className="p-4 flex justify-between items-center bg-black text-white">
            <h1 className="text-2xl font-bold">🔥 TrendWise</h1>
            <AuthButton />
          </nav>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
