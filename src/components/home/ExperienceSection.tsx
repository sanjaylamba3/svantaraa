import React from 'react'
import { Button } from '@/components/ui/button'
import {
  IconArrowUpRight,
  IconDiscountCheck,
  IconCheck,
} from '@tabler/icons-react'
import { getMediaUrl } from '@/lib/media'
import type { Service } from '@/payload-types'

interface ExperienceSectionProps {
  overline?: string
  heading?: string
  description?: string
  compareText?: string
  compareLink?: string
  services?: Service[]
}

const defaultFallbackServices = [
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
    defaultImageUrl:
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
    features: [
      { text: '24/7 dedicated live stream link for parents' },
      { text: 'Gourmet organic meals cooked to dietary spec' },
      { text: 'Orthopedic medical-grade memory foam rest' },
    ],
    ctaText: 'Select Suite',
    ctaLink: '#reserve-concierge',
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
    defaultImageUrl:
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=80',
    features: [
      { text: 'Cognitive puzzle games & sensory scent trails' },
      { text: 'Calming frequency audio during 1:00 PM rest' },
      { text: 'Cooling splash pad activities in warm afternoons' },
    ],
    ctaText: 'Book Daycare',
    ctaLink: '#reserve-concierge',
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
    defaultImageUrl:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    features: [
      { text: 'Fully secured double-gated perimeter walls' },
      { text: '100% pesticide-free grass safe for snouts' },
      { text: 'Shaded lounge with cold-pressed beverages' },
    ],
    ctaText: 'Reserve Pass',
    ctaLink: '#reserve-concierge',
  },
]

export function ExperienceSection({
  overline = 'Bespoke Offerings',
  heading = 'Sanctuary Suites & Grounds',
  description = 'Handcrafted spaces designed around canine behavioral wellbeing, spatial generosity, and serene comfort.',
  compareText = 'Compare All Privileges',
  compareLink = '#reserve-concierge',
  services,
}: ExperienceSectionProps) {
  const items = services && services.length > 0 ? services : defaultFallbackServices

  return (
    <section className="w-full bg-muted/40 py-20 md:py-24" id="reserve-concierge">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-400 font-semibold">
              {overline}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground">
              {heading}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              {description}
            </p>
          </div>

          <a
            href={compareLink}
            className="inline-flex items-center gap-1.5 text-xs text-emerald-800 dark:text-emerald-400 hover:text-foreground transition-colors font-semibold uppercase tracking-wider group"
          >
            <span>{compareText}</span>
            <IconArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item: any) => {
            const imageUrl = getMediaUrl(item.image, item.defaultImageUrl)
            const formattedPrice = item.price ? `₹${item.price.toLocaleString('en-IN')}` : ''

            return (
              <div
                key={item.id || item.title}
                className="group bg-card text-card-foreground rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 flex flex-col"
              >
                {/* Photo with Overlay Badges */}
                <div className="relative h-64 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Top-left chip */}
                  {item.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-md text-[11px] text-emerald-800 dark:text-emerald-400 tracking-widest uppercase font-semibold shadow-xs">
                        {item.badge}
                      </span>
                    </div>
                  )}

                  {/* Bottom-right feature tag */}
                  {item.featureTag && (
                    <div className="absolute bottom-4 right-4 bg-neutral-900/85 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs">
                      <IconDiscountCheck className="size-4 text-amber-300 shrink-0" />
                      <span>{item.featureTag}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-serif text-2xl text-foreground group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>

                    {/* Features list */}
                    {item.features && item.features.length > 0 && (
                      <ul className="pt-2 flex flex-col gap-2 text-xs text-muted-foreground">
                        {item.features.map((f: any, fIdx: number) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <IconCheck className="size-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                            <span>{f.text || f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 border-t border-border/50 flex items-center justify-between">
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

                    <a href={item.ctaLink || '#reserve-concierge'}>
                      <Button
                        size="sm"
                        className="rounded-full px-5 py-2 text-xs tracking-wider uppercase font-semibold shadow-xs hover:scale-105 transition-transform"
                      >
                        {item.ctaText || 'Select Suite'}
                      </Button>
                    </a>
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
