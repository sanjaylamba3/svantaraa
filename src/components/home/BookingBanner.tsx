import React from 'react'
import { Button } from '@/components/ui/button'
import { IconCalendarPlus, IconCalendar } from '@tabler/icons-react'
import { DEFAULT_PHONE_HREF } from '@/lib/site'

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

export function BookingBanner({
  badge = 'Limited Daily Chalets',
  heading = 'Give Your Companion the Retreat They Deserve.',
  description = 'Due to our strict cage-free ratio and 1:3 dedicated staff care, chalets book quickly during weekends and holiday seasons. Schedule your introductory walk-through or reserve dates today.',
  primaryCtaText = 'Reserve Suite Online',
  primaryCtaLink = '#reserve-concierge',
  secondaryCtaText = 'Schedule Physical Walk-Through',
  secondaryCtaLink = DEFAULT_PHONE_HREF,
  conciergeContact = 'Concierge Line: +91 95999 08677 • Alahawas, Sector 59, Gurugram',
}: BookingBannerProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:pb-24">
      <div className="bg-espresso text-ivory rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden flex flex-col items-center text-center border border-border-dark shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--color-ivory)_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 max-w-2xl flex flex-col items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-forest flex items-center justify-center text-ivory shadow-md">
            <IconCalendarPlus className="size-5" aria-hidden />
          </div>

          <span className="text-xs uppercase tracking-[0.24em] text-champagne font-semibold">
            {badge}
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-ivory">
            {heading}
          </h2>

          <p className="text-base sm:text-lg text-mist max-w-xl font-light leading-relaxed">
            {description}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <a href={primaryCtaLink} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 py-3.5 text-xs uppercase tracking-[0.14em] font-semibold shadow-md bg-ivory text-espresso hover:bg-ivory/90"
              >
                {primaryCtaText}
              </Button>
            </a>

            <a
              href={secondaryCtaLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs uppercase tracking-[0.14em] font-semibold text-ivory border border-border-dark hover:bg-ivory/10 transition-colors"
            >
              <IconCalendar className="size-4" aria-hidden />
              <span>{secondaryCtaText}</span>
            </a>
          </div>

          <span className="text-mist text-xs mt-3 font-light">{conciergeContact}</span>
        </div>
      </div>
    </section>
  )
}
