import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  IconArrowUpRight,
  IconDiscountCheck,
  IconCheck,
} from '@tabler/icons-react'
import { getMediaAlt, getMediaUrl } from '@/lib/media'
import { isExternalBookingUrl } from '@/lib/site'
import type { Service } from '@/payload-types'

interface ExperienceSectionProps {
  overline?: string
  heading?: string
  description?: string
  compareText?: string
  compareLink?: string
  services?: Service[]
}

type FallbackService = {
  id: string
  title: string
  badge: string
  featureTag: string
  description: string
  price: number
  priceUnit: string
  priceLabel: string
  defaultImageUrl: string
  features: { text: string }[]
  ctaText?: string
  ctaLink?: string | null
  image?: Service['image']
}

const defaultFallbackServices: FallbackService[] = [
  {
    id: 'default-1',
    title: 'Luxury Boarding Chalets',
    badge: 'Signature Chalet',
    featureTag: '100% Private Patio',
    description:
      'Private temperature-managed suites featuring individual grass courtyards, anti-skid slate floors, and orthopedic natural foam beds.',
    price: 2250,
    priceUnit: '/ night',
    priceLabel: 'Per Night Stay',
    defaultImageUrl: '/boarding.avif',
    features: [
      { text: '24/7 dedicated live stream link for parents' },
      { text: 'Gourmet organic meals cooked to dietary spec' },
      { text: 'Orthopedic medical-grade memory foam rest' },
    ],
    ctaText: 'Book Now',
  },
  {
    id: 'default-2',
    title: 'Enrichment Daycare',
    badge: 'Social & Sensory',
    featureTag: 'Matched Temperaments',
    description:
      'Curated daytime play pods calibrated by energy levels and personality, interspersed with relaxing acoustic nap sessions.',
    price: 1000,
    priceUnit: '/ 5 hrs',
    priceLabel: 'Daycare Session',
    defaultImageUrl: '/daycare.avif',
    features: [
      { text: 'Cognitive puzzle games & sensory scent trails' },
      { text: 'Calming frequency audio during 1:00 PM rest' },
      { text: 'Cooling splash pad activities in warm afternoons' },
    ],
    ctaText: 'Book Now',
  },
  {
    id: 'default-3',
    title: 'Natural Agility Meadow',
    badge: 'Private Access',
    featureTag: '1.5 Acre Park',
    description:
      'One-and-a-half acres of chemical-free natural sod, earthen agility hills, hurdle runs, and private gazebos with artisanal teas for parents.',
    price: 1000,
    priceUnit: '/ 2 hrs',
    priceLabel: 'Park Pass',
    defaultImageUrl: '/dog-park.avif',
    features: [
      { text: 'Fully secured double-gated perimeter walls' },
      { text: '100% pesticide-free grass safe for snouts' },
      { text: 'Shaded lounge with cold-pressed beverages' },
    ],
    ctaText: 'Book Now',
  },
]

type ExperienceItem = Service | FallbackService

export function ExperienceSection({
  overline = 'Bespoke Offerings',
  heading = 'Sanctuary Suites & Grounds',
  description = 'Handcrafted spaces designed around canine behavioral wellbeing, spatial generosity, and serene comfort.',
  compareText = 'Compare All Privileges',
  compareLink = '#reserve-concierge',
  services,
}: ExperienceSectionProps) {
  const items: ExperienceItem[] =
    services && services.length > 0 ? services : defaultFallbackServices

  return (
    <section className="w-full bg-muted/40 py-20 md:py-24" id="reserve-concierge">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] text-forest font-semibold">
              {overline}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground">{heading}</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">{description}</p>
          </div>

          <a
            href={compareLink}
            className="inline-flex items-center gap-1.5 text-xs text-forest hover:text-foreground transition-colors font-semibold uppercase tracking-wider group"
          >
            <span>{compareText}</span>
            <IconArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => {
              const imageUrl = getMediaUrl(item.image, item.defaultImageUrl ?? '')
              const imageAlt = getMediaAlt(item.image, item.title)
              const formattedPrice = item.price ? `₹${item.price.toLocaleString('en-IN')}` : ''
              const bookingUrl = item.ctaLink
              const showBooking = isExternalBookingUrl(bookingUrl)
              const itemKey = typeof item.id === 'number' ? item.id : item.id

              return (
                <div
                  key={itemKey}
                  className="group bg-card text-card-foreground rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-border flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      width={640}
                      height={256}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {item.badge && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-md text-[11px] text-forest tracking-widest uppercase font-semibold shadow-xs">
                          {item.badge}
                        </span>
                      </div>
                    )}

                    {item.featureTag && (
                      <div className="absolute bottom-4 right-4 bg-espresso/85 backdrop-blur-sm text-ivory px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs">
                        <IconDiscountCheck className="size-4 text-champagne shrink-0" aria-hidden />
                        <span>{item.featureTag}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-3">
                      <h3 className="font-serif text-2xl text-foreground group-hover:text-forest transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>

                      {item.features && item.features.length > 0 && (
                        <ul className="pt-2 flex flex-col gap-2 text-xs text-muted-foreground">
                          {item.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2">
                              <IconCheck className="size-4 text-forest shrink-0" aria-hidden />
                              <span>{feature.text}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-muted-foreground tracking-wider font-medium">
                          {item.priceLabel || 'Per Night Stay'}
                        </span>
                        <span className="text-xl font-bold tracking-tight text-foreground">
                          {formattedPrice}{' '}
                          <span className="text-xs text-muted-foreground font-normal">
                            {item.priceUnit}
                          </span>
                        </span>
                      </div>

                      {showBooking && bookingUrl ? (
                        <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                          <Button
                            size="sm"
                            className="rounded-full px-5 py-2 text-xs tracking-wider uppercase font-semibold shadow-xs"
                          >
                            {item.ctaText || 'Select Suite'}
                          </Button>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
      </div>
    </section>
  )
}
