import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'
import { getMediaAlt, getMediaUrl } from '@/lib/media'
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
  const imageAlt = getMediaAlt(image, headline)

  return (
    <section className="relative w-full -mt-20 overflow-hidden bg-espresso text-ivory min-h-[680px] flex items-end">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-65"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-24 md:pt-48 md:pb-32 flex flex-col justify-end">
        <div className="max-w-3xl flex flex-col gap-4">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-ivory">
            {headline}
          </h1>

          <p className="text-base sm:text-lg text-mist/90 max-w-2xl leading-relaxed font-light">
            {description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a href={primaryCtaLink}>
              <Button
                size="lg"
                className="rounded-full px-7 py-3 text-xs tracking-[0.14em] uppercase font-semibold shadow-md bg-ivory text-espresso hover:bg-ivory/90"
              >
                {primaryCtaText}
              </Button>
            </a>

            <a
              href={secondaryCtaLink}
              className="inline-flex items-center gap-1.5 text-ivory hover:text-champagne px-4 py-3 text-xs tracking-wider uppercase font-medium transition-colors group"
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
