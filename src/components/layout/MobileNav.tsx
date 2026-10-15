'use client'

import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { IconMenu2, IconPhone } from '@tabler/icons-react'

interface MobileNavProps {
  phone?: string
}

export function MobileNav({ phone = '+91 95999 08677' }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open navigation menu"
              className="text-foreground hover:bg-muted"
            />
          }
        >
          <IconMenu2 className="size-6" />
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] p-6 flex flex-col justify-between">
          <div>
            <SheetHeader className="text-left border-b border-border/50 pb-4 mb-6">
              <SheetTitle className="font-serif text-2xl tracking-[0.14em] uppercase">
                Svantaraa
              </SheetTitle>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">
                Luxury Pet Retreat
              </span>
            </SheetHeader>

            <nav className="flex flex-col gap-4 text-sm font-medium tracking-wider uppercase">
              <a
                href="#reserve-concierge"
                onClick={handleLinkClick}
                className="py-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                Services & Chalets
              </a>
              <a
                href="#daily-rhythm"
                onClick={handleLinkClick}
                className="py-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                Daily Rhythm
              </a>
              <a
                href="#social-impact"
                onClick={handleLinkClick}
                className="py-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                Rescue Mission
              </a>
              <a
                href="#faq-section"
                onClick={handleLinkClick}
                className="py-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                Resident FAQs
              </a>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                onClick={handleLinkClick}
                className="py-2 flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
              >
                <IconPhone className="size-4" />
                <span>{phone}</span>
              </a>
            </nav>
          </div>

          <div className="pt-6 border-t border-border/50 flex flex-col gap-3">
            <Button
              className="w-full rounded-full uppercase tracking-wider text-xs font-semibold"
              onClick={() => {
                handleLinkClick()
                const el = document.getElementById('reserve-concierge')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Reserve Stay
            </Button>
            <p className="text-[11px] text-center text-muted-foreground">
              Gurugram Sanctuary • 100% Cage-Free
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
