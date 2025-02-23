'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ContentPromoProps {
  title: string;
  description: string;
  link: string;
}

export default function ContentPromo({ title, description, link }: ContentPromoProps) {
  return (
    <div className="relative w-full bg-black/90 border border-cyan-500/20 rounded-lg p-6 my-8">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent" />
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4">
        {/* Text content */}
        <div className="space-y-2">
          <h3 className="text-xl text-cyan-400 font-bold">{title}</h3>
          <p className="text-gray-400 max-w-xl">{description}</p>
        </div>
        
        {/* CTA Button */}
        <Link 
          href={link}
          className="group relative bg-black/60 border border-cyan-500/40 text-cyan-400 px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:border-cyan-400 flex items-center gap-2 w-full md:w-auto justify-center md:justify-start"
        >
          <span className="relative z-10 font-mono tracking-wider text-sm">READ MORE</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        </Link>
      </div>
      
      {/* Corner accents */}
      <div className="absolute -top-px -left-px w-4 h-4 border-t border-l border-cyan-500/40" />
      <div className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-cyan-500/40" />
    </div>
  );
}
