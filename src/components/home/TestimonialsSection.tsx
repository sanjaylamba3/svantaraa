import React from 'react'
import { IconStarFilled } from '@tabler/icons-react'
import type { Testimonial } from '@/payload-types'
import { getMediaUrl } from '@/lib/media'

interface TestimonialsSectionProps {
  overline?: string
  heading?: string
  description?: string
  testimonials?: Testimonial[]
}

const defaultTestimonials = [
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

export function TestimonialsSection({
  overline = 'Verified Stays',
  heading = 'Words from Discerning Parents',
  description = 'True peace of mind is non-negotiable when you leave the dog who holds your heart.',
  testimonials,
}: TestimonialsSectionProps) {
  const items =
    testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24" id="testimonials">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-[0.24em] text-emerald-800 dark:text-emerald-400 font-semibold">
          {overline}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground mt-1">
          {heading}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          {description}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item: any) => {
          const avatarUrl = getMediaUrl(item.avatar)
          const fallbackInitials =
            item.initials ||
            item.ownerName
              .split(' ')
              .map((w: string) => w[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()

          return (
            <div
              key={item.id || item.ownerName}
              className="bg-card text-card-foreground p-7 rounded-2xl shadow-sm border border-border/50 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <IconStarFilled key={i} className="size-4.5" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-foreground/90 italic leading-relaxed">
                  {item.quote}
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-5 flex items-center gap-3 border-t border-border/50 mt-6">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={item.ownerName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-800/10 dark:bg-emerald-400/20 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
                    {fallbackInitials}
                  </div>
                )}

                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    {item.ownerName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.petName}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
