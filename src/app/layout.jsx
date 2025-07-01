
import AuthProvider from '@/app/components/AuthProvider';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar';
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
      <body className='bg-[#0a192f]'>
        <AuthProvider>
          <Navbar/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
