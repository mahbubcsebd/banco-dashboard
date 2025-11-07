import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Dashboard | Banco di Caribe',
  description: 'Manage your accounts and transactions',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={`${inter.className} antialiased`}>
        <>{children}</>
        <ToastContainer />
      </body>
    </html>
  );
}
