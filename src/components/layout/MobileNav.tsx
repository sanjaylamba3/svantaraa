'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { IconMenu2, IconPhone } from '@tabler/icons-react'
import { DEFAULT_PHONE, primaryNavLinks } from '@/lib/site'
import { Link } from '@payloadcms/ui'
import Image from 'next/image'

interface MobileNavProps {
  phone?: string
}

export function MobileNav({ phone = DEFAULT_PHONE }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const phoneHref = `tel:${phone.replace(/\s+/g, '')}`

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
            <SheetHeader className="text-left border-b border-border/50 pl-0 mb-4">
              <SheetTitle className="font-serif text-2xl tracking-[0.14em] uppercase">
                <div className="flex items-start justify-start select-none py-1">
                  <Link href="/" className="flex items-center group" aria-current="page">
                    <Image
                      src="/Svantaraa Logo tm.png"
                      alt="Svantaraa - Luxury Pet Retreat"
                      width={778}
                      height={104}
                      priority
                      className="w-60 h-auto transition-opacity group-hover:opacity-90 dark:brightness-0 dark:invert"
                    />
                  </Link>
                </div>
              </SheetTitle>
              <span className="text-[10px] tracking-[0.2em] uppercase text-champagne font-medium">
              Sanctuary of Conscious Care
              </span>
            </SheetHeader>

            <nav
              className="flex flex-col gap-4 text-sm font-medium tracking-wider uppercase"
              aria-label="Primary"
            >
              {primaryNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="py-2 text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={phoneHref}
                onClick={handleLinkClick}
                className="py-2 flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors normal-case tracking-normal"
                aria-label={`Call us at ${phone}`}
              >
                <IconPhone className="size-4 shrink-0" aria-hidden />
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
              Reserve
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
