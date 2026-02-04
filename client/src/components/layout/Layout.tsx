import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export default function Layout({ children, className, title }: LayoutProps) {
  if (title) {
    document.title = `${title} | Likun Shredder Blades`;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={cn('flex-1', className)}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
