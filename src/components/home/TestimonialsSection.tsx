import React from 'react'
import Image from 'next/image'
import { IconStarFilled } from '@tabler/icons-react'
import type { Testimonial } from '@/payload-types'
import { getMediaUrl } from '@/lib/media'

interface TestimonialsSectionProps {
  overline?: string
  heading?: string
  description?: string
  testimonials?: Testimonial[]
}

type FallbackTestimonial = {
  id: string
  ownerName: string
  petName: string
  initials: string
  rating: number
  quote: string
}

const defaultTestimonials: FallbackTestimonial[] = [
  {
    id: 't-1',
    ownerName: 'Radhika & Samir Singhania',
    petName: 'Parents of Bruno • 4-Year Golden Retriever',
    initials: 'RS',
    rating: 5,
    quote:
      '“We travelled to Europe for three weeks with immense separation anxiety. The daily video dispatches showing Bruno joyfully sprinting through the agility meadows turned our guilt into absolute comfort. Svantaraa is in a league of its own.”',
  },
  {
    id: 't-2',
    ownerName: 'Armaan Kapoor',
    petName: 'Parent of Leo • Adopted Indie Mix',
    initials: 'AK',
    rating: 5,
    quote:
      '“My rescue hound Leo has severe kennel trauma and fear aggression around typical boarding cages. Vaishali’s team treated him with gentleness and clinical ethology. He came home relaxed, shiny-coated, and happier than ever.”',
  },
  {
    id: 't-3',
    ownerName: 'Tanvi Mehta',
    petName: 'Parent of Bella • Beagle',
    initials: 'TM',
    rating: 5,
    quote:
      '“The agility park is completely pesticide-free, which was critical for my Beagle’s skin allergies. Clean herbal pest control, authentic organic food, and knowing our invoice helps street rescues makes this our permanent choice.”',
  },
]

type TestimonialItem = Testimonial | FallbackTestimonial

export function TestimonialsSection({
  overline = 'Verified Stays',
  heading = 'Words from Discerning Parents',
  description = 'True peace of mind is non-negotiable when you leave the dog who holds your heart.',
  testimonials,
}: TestimonialsSectionProps) {
  const items: TestimonialItem[] =
    testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24"
      id="testimonials"
    >
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-[0.24em] text-forest font-semibold">
          {overline}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground mt-1">{heading}</h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => {
            const avatarUrl = getMediaUrl(
              'avatar' in item ? item.avatar : undefined,
            )
            const fallbackInitials =
              ('initials' in item && item.initials) ||
              item.ownerName
                .split(' ')
                .map((w) => w[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()
            const itemKey = typeof item.id === 'number' ? item.id : item.id

            return (
              <div
                key={itemKey}
                className="bg-card text-card-foreground p-7 rounded-2xl shadow-sm border border-border flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center gap-1 text-champagne mb-4" aria-hidden>
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <IconStarFilled key={i} className="size-4.5" />
                    ))}
                  </div>

                  <p className="text-sm sm:text-base text-foreground/90 italic leading-relaxed">
                    {item.quote}
                  </p>
                </div>

                <div className="pt-5 flex items-center gap-3 border-t border-border mt-6">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={item.ownerName}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full bg-forest/10 text-forest flex items-center justify-center text-xs font-bold shrink-0"
                      aria-hidden
                    >
                      {fallbackInitials}
                    </div>
                  )}

                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{item.ownerName}</span>
                    <span className="text-xs text-muted-foreground">{item.petName}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
    </section>
  )
}
