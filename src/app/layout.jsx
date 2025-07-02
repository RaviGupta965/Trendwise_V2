
import AuthProvider from '@/app/components/AuthProvider';
import "./globals.css";
import Navbar from './components/Navbar';

export const metadata = {
  title: 'TrendWise Blog',
  description: 'AI-powered blog with trending articles',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
