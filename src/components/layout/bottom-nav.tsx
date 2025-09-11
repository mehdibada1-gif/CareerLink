"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Users, Award, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: Briefcase },
  { href: '/mentors', label: 'Mentors', icon: Users },
  { href: '/credentials', label: 'Certs', icon: Award },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-20 bg-card/80 border-t backdrop-blur-sm flex justify-around items-center">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href) && (item.href === '/' ? pathname === '/' : true);
        return (
          <Link href={item.href} key={item.href} className="flex flex-col items-center justify-center gap-1 text-muted-foreground w-1/5 h-full pt-2">
            <item.icon className={cn('h-6 w-6 transition-colors', isActive ? 'text-primary' : 'text-muted-foreground/80')} />
            <span className={cn('text-xs font-medium transition-colors', isActive ? 'text-primary' : 'text-muted-foreground/80')}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
