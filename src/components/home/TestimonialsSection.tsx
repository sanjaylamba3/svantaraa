'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import type { Testimonial } from '@/payload-types'
import { getMediaUrl } from '@/lib/media'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'

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
  quote: string
  photoUrl: string
}

const defaultTestimonials: FallbackTestimonial[] = [
  {
    id: 't-1',
    ownerName: 'Radhika & Samir Singhania',
    petName: 'Parents of Bruno • 4-Year Golden Retriever',
    quote:
      '“We travelled to Europe for three weeks with immense separation anxiety. The daily video dispatches showing Bruno joyfully sprinting through the agility meadows turned our guilt into absolute comfort. Svantaraa is in a league of its own.”',
    photoUrl:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-2',
    ownerName: 'Armaan Kapoor',
    petName: 'Parent of Leo • Adopted Indie Mix',
    quote:
      '“My rescue hound Leo has severe kennel trauma and fear aggression around typical boarding cages. Vaishali’s team treated him with gentleness and clinical ethology. He came home relaxed, shiny-coated, and happier than ever.”',
    photoUrl:
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-3',
    ownerName: 'Tanvi Mehta',
    petName: 'Parent of Bella • Beagle',
    quote:
      '“The agility park is completely pesticide-free, which was critical for my Beagle’s skin allergies. Clean herbal pest control, authentic organic food, and knowing our invoice helps street rescues makes this our permanent choice.”',
    photoUrl:
      'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-4',
    ownerName: 'Neha & Rohan Malhotra',
    petName: 'Parents of Coco • Labrador',
    quote:
      '“Coco boards with us whenever we fly. Her suite opens onto real grass, the meals match her vet plan, and the evening note from her caretaker is the only thing that lets us sleep in another city.”',
    photoUrl:
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-5',
    ownerName: 'Ishaan Verma',
    petName: 'Parent of Momo • Shih Tzu',
    quote:
      '“Momo is small, senior, and particular about noise. They kept her on a quiet courtyard, carried her to the herb garden, and sent a photo every time she settled on her own bed. She came home unhurried.”',
    photoUrl:
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-6',
    ownerName: 'Aisha Qureshi',
    petName: 'Parent of Simba • Siberian Husky',
    quote:
      '“A husky in a Gurugram summer needs shade, water, and room to run. Simba spent his days on the meadow and his afternoons in the cooled suite. No crate, no barking ward, just a tired, happy dog at pickup.”',
    photoUrl:
      'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-7',
    ownerName: 'Kabir & Ananya Shah',
    petName: 'Parents of Zara • German Shepherd',
    quote:
      '“Zara guards the house and does not settle with strangers. The team introduced themselves on our first visit, then stayed with the same two caretakers for the whole week. She greeted us loose and bright, not shut down.”',
    photoUrl:
      'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-8',
    ownerName: 'Meher Khanna',
    petName: 'Parent of Biscuit • Corgi',
    quote:
      '“Daycare finally feels considered. Biscuit plays with dogs his size, naps when the meadow gets loud, and comes home with muddy paws instead of the frantic edge he used to carry out of other facilities.”',
    photoUrl:
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-9',
    ownerName: 'Devika Nair',
    petName: 'Parent of Pepper • Pug',
    quote:
      '“Pepper overheats easily and hates being left in a kennel run. They watched her breathing, kept the suite cool, and never pushed her into group play. I could see her asleep on the live feed and actually exhale.”',
    photoUrl:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-10',
    ownerName: 'Vikram & Sana Joshi',
    petName: 'Parents of Milo • 8-Month Puppy',
    quote:
      '“Milo’s first nights away from us were the test. Short daycare visits came first, then a weekend stay with the same person at the door each morning. He trotted back to the car filthy, fed, and pleased with himself.”',
    photoUrl:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80',
  },
]

type TestimonialItem = Testimonial | FallbackTestimonial

function petPhotoUrl(item: TestimonialItem): string {
  if ('photoUrl' in item && item.photoUrl) return item.photoUrl

  const uploaded = getMediaUrl('photo' in item ? item.photo : undefined)
  if (uploaded) return uploaded

  if ('defaultPhotoUrl' in item && item.defaultPhotoUrl) return item.defaultPhotoUrl

  return defaultTestimonials[0].photoUrl
}

function displayQuote(quote: string): string {
  return quote.replace(/^[“"']+\s*|\s*[”"']+$/g, '').trim()
}

function headingLines(heading: string): string[] {
  const parts = heading.split('=')
  if (parts.length < 2) return [heading]

  return [`${parts[0].trim()} =`, parts.slice(1).join('=').trim()]
}

function ScallopPhoto({ src, alt }: { src: string; alt: string }) {
  const clipId = useId().replace(/:/g, '')

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <svg className="absolute size-0" aria-hidden>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <circle cx="0.34" cy="0.2" r="0.2" />
            <circle cx="0.64" cy="0.18" r="0.2" />
            <circle cx="0.18" cy="0.46" r="0.22" />
            <circle cx="0.48" cy="0.46" r="0.28" />
            <circle cx="0.8" cy="0.48" r="0.2" />
            <circle cx="0.3" cy="0.76" r="0.24" />
            <circle cx="0.62" cy="0.78" r="0.24" />
          </clipPath>
        </defs>
      </svg>
      <div className="absolute inset-[6%] bg-forest" style={{ clipPath: `url(#${clipId})` }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 28rem, 80vw"
          className="object-cover"
        />
      </div>
    </div>
  )
}

export function TestimonialsSection({
  overline = 'Testimonials',
  heading = 'Words from Discerning Parents',
  description,
  testimonials,
}: TestimonialsSectionProps) {
  const items: TestimonialItem[] =
    testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials
  const autoplay = useRef(
    Autoplay({
      delay: 6000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
    }),
  )
  const [api, setApi] = useState<CarouselApi>()
  const lines = headingLines(heading)

  useEffect(() => {
    if (!api) return

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => {
      const plugin = api.plugins()?.autoplay
      if (!plugin) return
      // Autoplay skips its own setup when there is only one snap, so play()
      // would read a delay list that was never created.
      if (media.matches || api.scrollSnapList().length <= 1) {
        plugin.stop()
        return
      }
      plugin.play()
    }

    syncMotion()
    media.addEventListener('change', syncMotion)

    return () => media.removeEventListener('change', syncMotion)
  }, [api])

  return (
    <section
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
      id="testimonials"
    >
      <div className="rounded-[2rem] bg-sand px-4 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center sm:mb-12">
          <span className="text-xs font-semibold tracking-[0.24em] text-forest uppercase">
            {overline}
          </span>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-forest uppercase sm:text-4xl lg:text-5xl">
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          {description ? (
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">{description}</p>
          ) : null}
        </div>

        <Carousel
          setApi={setApi}
          plugins={[autoplay.current]}
          opts={{ align: 'start', loop: true }}
          aria-label="Parent testimonials"
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {items.map((item) => {
              const photoUrl = petPhotoUrl(item)

              return (
                <CarouselItem key={String(item.id)} className="basis-full pl-0">
                  <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
                    <div className="flex items-center">
                      <ScallopPhoto src={photoUrl} alt="" />
                    </div>
                    <div className="flex h-full min-h-80 flex-col items-center rounded-3xl bg-card px-6 pt-8 pb-20 text-center sm:px-10 sm:pt-10 lg:min-h-[28rem] lg:px-12">
                      <p className="mt-8 text-base leading-snug font-semibold tracking-wide text-forest uppercase sm:text-lg lg:mt-10 lg:text-xl">
                        {displayQuote(item.quote)}
                      </p>
                      <p className="mt-8 text-sm font-medium text-foreground">{item.ownerName}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{item.petName}</p>
                    </div>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
            <div className="grid lg:grid-cols-2 lg:gap-10">
              <div className="hidden lg:block" />
              <div className="pointer-events-auto flex justify-end gap-2 px-6 pb-8 sm:px-10 lg:px-12">
                <CarouselPrevious className="static border-border bg-card" />
                <CarouselNext className="static border-border bg-card" />
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  )
}
