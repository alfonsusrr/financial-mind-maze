"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();
  
  const links = [
    { href: '/', label: 'Game' },
    { href: '/story', label: 'Story Flowcharts' },
  ];
  
  return (
    <nav className="bg-white shadow-sm py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="font-bold text-blue-600">Financial Mind Maze</div>
        
        <ul className="flex space-x-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={`py-2 px-1 border-b-2 ${
                    isActive 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
} 