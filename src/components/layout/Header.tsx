import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MobileNav } from './MobileNav'
import { DEFAULT_PHONE, primaryNavLinks } from '@/lib/site'

interface HeaderProps {
  phone?: string
}

export function Header({ phone = DEFAULT_PHONE }: HeaderProps) {
  const phoneHref = `tel:${phone.replace(/\s+/g, '')}`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/40 transition-all">
      <div className="h-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        <nav className="hidden md:flex items-center gap-8 flex-1" aria-label="Primary">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {/* <a
            href={phoneHref}
            className="text-xs tracking-[0.08em] font-medium text-foreground/70 hover:text-foreground transition-colors"
            aria-label={`Call us at ${phone}`}
          >
            {phone}
          </a> */}
        </nav>

        <div className="flex items-center justify-center select-none py-1">
          <Link href="/" className="flex items-center group" aria-current="page">
            <Image
              src="/Svantaraa Logo Final.png"
              alt="Svantaraa - Luxury Pet Retreat"
              width={778}
              height={104}
              priority
              className="w-60 h-auto transition-opacity group-hover:opacity-90 dark:brightness-0 dark:invert"
            />
          </Link>
        </div>

        <div className="flex items-center justify-end gap-3 flex-1">
          <a href="#reserve-concierge" className="hidden sm:inline-flex">
            <Button
              className="rounded-full px-6 py-2.5 text-xs tracking-[0.14em] uppercase font-semibold shadow-sm"
            >
              Book Now
            </Button>
          </a>

          <MobileNav phone={phone} />
        </div>
      </div>
    </header>
  )
}
