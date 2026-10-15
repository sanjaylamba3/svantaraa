import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MobileNav } from './MobileNav'

interface HeaderProps {
  phone?: string
}

export function Header({ phone = '+91 95999 08677' }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/40 transition-all">
      <div className="h-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Left: Navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 flex-1">
          <Link
            href="#reserve-concierge"
            className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            Services
          </Link>
          <Link
            href="#daily-rhythm"
            className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            About Us
          </Link>
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Center: Brand wordmark */}
        <div className="flex flex-col items-center justify-center text-center select-none py-1">
          <Link href="/" className="flex flex-col items-center group">
            <span className="font-serif text-2xl tracking-[0.16em] uppercase leading-tight font-medium text-foreground group-hover:opacity-90 transition-opacity">
              Svantaraa
            </span>
            <span className="text-[10px] tracking-[0.24em] uppercase text-emerald-800 dark:text-emerald-400 font-semibold mt-0.5">
              Luxury Pet Retreat
            </span>
          </Link>
        </div>

        {/* Right: Reserve CTA & Mobile Sheet */}
        <div className="flex items-center justify-end gap-3 flex-1">
          <a
            href="#reserve-concierge"
            className="hidden sm:inline-flex"
          >
            <Button
              className="rounded-full px-6 py-2.5 text-xs tracking-[0.14em] uppercase font-semibold shadow-sm hover:scale-[1.02] transition-transform"
            >
              Reserve
            </Button>
          </a>

          <MobileNav phone={phone} />
        </div>
      </div>
    </header>
  )
}
