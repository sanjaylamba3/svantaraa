import React from 'react'
import { Button } from '@/components/ui/button'
import { IconCalendarPlus, IconCalendar } from '@tabler/icons-react'

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
  secondaryCtaLink = 'tel:+919599908677',
  conciergeContact = 'Concierge Line: +91 95999 08677 • Alahawas, Sector 59, Gurugram',
}: BookingBannerProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:pb-24">
      <div className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden flex flex-col items-center text-center border border-neutral-800 shadow-2xl">
        {/* Subtle radial dot pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 max-w-2xl flex flex-col items-center gap-4">
          {/* Calendar Icon */}
          <div className="w-11 h-11 rounded-full bg-emerald-800 flex items-center justify-center text-white shadow-md">
            <IconCalendarPlus className="size-5" />
          </div>

          {/* Badge */}
          <span className="text-xs uppercase tracking-[0.24em] text-amber-300 font-semibold">
            {badge}
          </span>

          {/* Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-white">
            {heading}
          </h2>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-light leading-relaxed">
            {description}
          </p>

          {/* Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <a href={primaryCtaLink} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-neutral-950 hover:bg-neutral-200 rounded-full px-8 py-3.5 text-xs uppercase tracking-[0.14em] font-semibold transition-all shadow-md hover:scale-105"
              >
                {primaryCtaText}
              </Button>
            </a>

            <a href={secondaryCtaLink} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-neutral-700 hover:border-white text-white hover:bg-white/10 rounded-full px-7 py-3.5 text-xs uppercase tracking-[0.14em] font-semibold transition-colors flex items-center gap-2"
              >
                <IconCalendar className="size-4" />
                <span>{secondaryCtaText}</span>
              </Button>
            </a>
          </div>

          {/* Concierge Note */}
          <span className="text-neutral-400 text-xs mt-3 font-light">
            {conciergeContact}
          </span>
        </div>
      </div>
    </section>
  )
}
