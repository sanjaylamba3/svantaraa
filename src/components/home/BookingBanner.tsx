import React from 'react'
import { IconBrandWhatsapp, IconPhone } from '@tabler/icons-react'
import { DEFAULT_PHONE, DEFAULT_PHONE_HREF } from '@/lib/site'

interface BookingBannerProps {
  badge?: string
  heading?: string
  description?: string
  primaryCtaText?: string
  primaryCtaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  conciergeContact?: string
}

const WHATSAPP_HREF = `https://wa.me/${DEFAULT_PHONE.replace(/\D/g, '')}`

function isHttpUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://')
}

export function BookingBanner({
  badge = "Plan Your Pet's Getaway",
  heading = 'Give Your Pet the Vacation They Truly Deserve.',
  description = 'Suites fill rapidly over weekends and holiday seasons. Connect directly with our on-site sanctuary concierge to book or tailor custom stays.',
  primaryCtaText = 'WhatsApp Inquiry',
  primaryCtaLink = WHATSAPP_HREF,
  secondaryCtaText = DEFAULT_PHONE,
  secondaryCtaLink = DEFAULT_PHONE_HREF,
}: BookingBannerProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:pb-24 lg:px-8">
      <div className="relative flex flex-col items-stretch justify-between gap-8 overflow-hidden rounded-3xl bg-forest p-8 text-ivory shadow-xl sm:p-10 lg:flex-row lg:items-center lg:p-16">
        <div className="relative z-10 flex min-w-0 max-w-xl flex-1 flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
            {badge}
          </span>

          <h2 className="font-serif text-3xl font-medium leading-tight text-ivory sm:text-4xl lg:text-5xl">
            {heading}
          </h2>

          <p className="max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg">{description}</p>
        </div>

        <div className="relative z-10 flex w-fit shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={primaryCtaLink}
            {...(isHttpUrl(primaryCtaLink)
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className="inline-flex w-fit items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-champagne-soft px-6 py-3.5 text-sm font-semibold text-espresso shadow-md transition-colors hover:bg-champagne focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
          >
            <IconBrandWhatsapp className="size-5" aria-hidden />
            <span>{primaryCtaText}</span>
          </a>

          <a
            href={secondaryCtaLink}
            {...(isHttpUrl(secondaryCtaLink)
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className="inline-flex w-fit items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-ivory/15 px-6 py-3.5 text-sm font-semibold text-ivory backdrop-blur-md transition-colors hover:bg-ivory/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-forest"
          >
            <IconPhone className="size-5" aria-hidden />
            <span>{secondaryCtaText}</span>
          </a>
        </div>

        <div
          className="pointer-events-none absolute -right-20 -bottom-20 size-96 rounded-full bg-espresso/40 blur-3xl"
          aria-hidden
        />
      </div>
    </section>
  )
}
