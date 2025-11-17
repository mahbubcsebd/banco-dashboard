import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Dashboard | Finxact',
  description: 'Manage your accounts and transactions',
};

export default function MainRootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <>{children}</>
      </body>
    </html>
  );
}
