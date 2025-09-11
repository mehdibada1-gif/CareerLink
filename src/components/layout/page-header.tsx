"use client";

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

type PageHeaderProps = {
  title?: string;
  showBackButton?: boolean;
  children?: React.ReactNode;
};

export function PageHeader({ title, showBackButton = false, children }: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 flex items-center h-14 px-4 bg-card/80 backdrop-blur-sm border-b">
      {showBackButton && (
        <Button variant="ghost" size="icon" className="-ml-2 mr-2" onClick={() => router.back()}>
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
      )}
      {title ? (
         <h1 className="text-lg font-semibold text-foreground truncate">{title}</h1>
      ) : (
        children
      )}
    </header>
  );
}
