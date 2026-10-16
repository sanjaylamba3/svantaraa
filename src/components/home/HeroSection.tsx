import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IconPlant, IconArrowRight } from '@tabler/icons-react'
import { getMediaUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

interface HeroSectionProps {
  badge?: string
  headline?: string
  description?: string
  primaryCtaText?: string
  primaryCtaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  image?: Media | string | number | null
  defaultImageUrl?: string
}

export function HeroSection({
  badge = 'Gurugram Sanctuary • 100% Cage-Free',
  headline = 'An Unhurried Sanctuary for Your Cherished Companion.',
  description = 'Private climate-conditioned chalets, an expansive chemical-free agility park, and genuine 24/7 hospitality guided by certified animal rescue specialists. Luxury rooted in conscious devotion.',
  primaryCtaText = 'Reserve Suite Stay',
  primaryCtaLink = '#reserve-concierge',
  secondaryCtaText = 'Explore Sanctuary Life',
  secondaryCtaLink = '#daily-rhythm',
  image,
  defaultImageUrl = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1920&q=80',
}: HeroSectionProps) {
  const imageUrl = getMediaUrl(image, defaultImageUrl)

  return (
    <section className="relative w-full -mt-20 overflow-hidden bg-neutral-950 text-white min-h-[680px] flex items-end">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-65 scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('${imageUrl}')` }}
        role="img"
        aria-label="Svantaraa luxury retreat sanctuary grounds"
      />

      {/* Dual Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-24 md:pt-48 md:pb-32 flex flex-col justify-end">
        <div className="max-w-3xl flex flex-col gap-4">
          {/* Badge Pill */}
          {/* <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300">
            <IconPlant className="size-4 shrink-0 text-amber-300" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-amber-200">
              {badge}
            </span>
          </div> */}

          {/* Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-white">
            {headline}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-neutral-300/90 max-w-2xl leading-relaxed font-light">
            {description}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a href={primaryCtaLink}>
              <Button
                size="lg"
                className="bg-white text-neutral-950 hover:bg-neutral-200 rounded-full px-7 py-3 text-xs tracking-[0.14em] uppercase font-semibold shadow-md hover:scale-[1.02] transition-all"
              >
                {primaryCtaText}
              </Button>
            </a>

            <a
              href={secondaryCtaLink}
              className="inline-flex items-center gap-1.5 text-white hover:text-amber-300 px-4 py-3 text-xs tracking-wider uppercase font-medium transition-colors group"
            >
              <span>{secondaryCtaText}</span>
              <IconArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
