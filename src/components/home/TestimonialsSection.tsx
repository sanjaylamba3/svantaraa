'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { IconStarFilled } from '@tabler/icons-react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

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
  photoUrl: string
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
    photoUrl:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-2',
    ownerName: 'Armaan Kapoor',
    petName: 'Parent of Leo • Adopted Indie Mix',
    initials: 'AK',
    rating: 5,
    quote:
      '“My rescue hound Leo has severe kennel trauma and fear aggression around typical boarding cages. Vaishali’s team treated him with gentleness and clinical ethology. He came home relaxed, shiny-coated, and happier than ever.”',
    photoUrl:
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-3',
    ownerName: 'Tanvi Mehta',
    petName: 'Parent of Bella • Beagle',
    initials: 'TM',
    rating: 5,
    quote:
      '“The agility park is completely pesticide-free, which was critical for my Beagle’s skin allergies. Clean herbal pest control, authentic organic food, and knowing our invoice helps street rescues makes this our permanent choice.”',
    photoUrl:
      'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-4',
    ownerName: 'Neha & Rohan Malhotra',
    petName: 'Parents of Coco • Labrador',
    initials: 'NM',
    rating: 5,
    quote:
      '“Coco boards with us whenever we fly. Her suite opens onto real grass, the meals match her vet plan, and the evening note from her caretaker is the only thing that lets us sleep in another city.”',
    photoUrl:
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-5',
    ownerName: 'Ishaan Verma',
    petName: 'Parent of Momo • Shih Tzu',
    initials: 'IV',
    rating: 5,
    quote:
      '“Momo is small, senior, and particular about noise. They kept her on a quiet courtyard, carried her to the herb garden, and sent a photo every time she settled on her own bed. She came home unhurried.”',
    photoUrl:
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-6',
    ownerName: 'Aisha Qureshi',
    petName: 'Parent of Simba • Siberian Husky',
    initials: 'AQ',
    rating: 5,
    quote:
      '“A husky in a Gurugram summer needs shade, water, and room to run. Simba spent his days on the meadow and his afternoons in the cooled suite. No crate, no barking ward, just a tired, happy dog at pickup.”',
    photoUrl:
      'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-7',
    ownerName: 'Kabir & Ananya Shah',
    petName: 'Parents of Zara • German Shepherd',
    initials: 'KS',
    rating: 5,
    quote:
      '“Zara guards the house and does not settle with strangers. The team introduced themselves on our first visit, then stayed with the same two caretakers for the whole week. She greeted us loose and bright, not shut down.”',
    photoUrl:
      'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-8',
    ownerName: 'Meher Khanna',
    petName: 'Parent of Biscuit • Corgi',
    initials: 'MK',
    rating: 5,
    quote:
      '“Daycare finally feels considered. Biscuit plays with dogs his size, naps when the meadow gets loud, and comes home with muddy paws instead of the frantic edge he used to carry out of other facilities.”',
    photoUrl:
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-9',
    ownerName: 'Devika Nair',
    petName: 'Parent of Pepper • Pug',
    initials: 'DN',
    rating: 5,
    quote:
      '“Pepper overheats easily and hates being left in a kennel run. They watched her breathing, kept the suite cool, and never pushed her into group play. I could see her asleep on the live feed and actually exhale.”',
    photoUrl:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 't-10',
    ownerName: 'Vikram & Sana Joshi',
    petName: 'Parents of Milo • 8-Month Puppy',
    initials: 'VJ',
    rating: 5,
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

function ownerInitials(item: TestimonialItem): string {
  if ('initials' in item && item.initials) return item.initials

  return item.ownerName
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function TestimonialCopy({
  item,
  avatarUrl,
  initials,
  quoteClassName,
}: {
  item: TestimonialItem
  avatarUrl: string
  initials: string
  quoteClassName?: string
}) {
  return (
    <>
      <div className="mb-4 flex items-center gap-1 text-champagne" aria-hidden>
        {Array.from({ length: item.rating || 5 }).map((_, index) => (
          <IconStarFilled key={index} className="size-4.5" />
        ))}
      </div>
      <p className={quoteClassName}>{item.quote}</p>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest/10 text-xs font-bold text-forest"
            aria-hidden
          >
            {initials}
          </div>
        )}
        <div className="flex min-w-0 flex-col text-left">
          <span className="text-sm font-semibold text-foreground">{item.ownerName}</span>
          <span className="text-xs text-muted-foreground">{item.petName}</span>
        </div>
      </div>
    </>
  )
}

export function TestimonialsSection({
  overline = 'Verified Stays',
  heading = 'Words from Discerning Parents',
  description = 'True peace of mind is non-negotiable when you leave the dog who holds your heart.',
  testimonials,
}: TestimonialsSectionProps) {
  const items: TestimonialItem[] =
    testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials
  const autoplay = useRef(
    Autoplay({
      delay: 4500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: false,
    }),
  )
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) return

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => {
      const plugin = api.plugins()?.autoplay
      if (!plugin) return
      if (media.matches) plugin.stop()
      else plugin.play()
    }

    syncMotion()
    media.addEventListener('change', syncMotion)

    return () => media.removeEventListener('change', syncMotion)
  }, [api])

  return (
    <section
      className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8"
      id="testimonials"
    >
      <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center">
        <span className="text-xs font-semibold tracking-[0.24em] text-forest uppercase">
          {overline}
        </span>
        <h2 className="mt-1 font-serif text-3xl text-foreground sm:text-4xl">{heading}</h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">{description}</p>
      </div>

      <Carousel
        setApi={setApi}
        plugins={[autoplay.current]}
        opts={{ align: 'start', loop: true }}
        aria-label="Parent testimonials"
        className="w-full"
      >
        <CarouselContent>
          {items.map((item) => {
            const photoUrl = petPhotoUrl(item)
            const avatarUrl = getMediaUrl('avatar' in item ? item.avatar : undefined)
            const initials = ownerInitials(item)
            const itemKey = String(item.id)

            return (
              <CarouselItem key={itemKey} className="basis-full md:basis-1/2 lg:basis-1/3">
                <Dialog
                  onOpenChange={(open) => {
                    const plugin = api?.plugins()?.autoplay
                    if (!plugin) return
                    if (open) {
                      plugin.stop()
                      return
                    }
                    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                      plugin.play()
                    }
                  }}
                >
                  <DialogTrigger
                    render={
                      <button
                        type="button"
                        className="flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card text-left text-card-foreground shadow-sm transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        aria-label={`Read testimonial from ${item.ownerName}`}
                      />
                    }
                  >
                    <span className="relative aspect-[4/3] w-full">
                      <Image
                        src={photoUrl}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </span>
                    <span className="flex flex-1 flex-col justify-between p-6">
                      <TestimonialCopy
                        item={item}
                        avatarUrl={avatarUrl}
                        initials={initials}
                        quoteClassName="line-clamp-4 text-sm leading-relaxed text-foreground/90 italic sm:text-base"
                      />
                    </span>
                  </DialogTrigger>
                  <DialogContent className="max-h-[calc(100%-2rem)] w-full max-w-lg gap-0 overflow-y-auto p-0 sm:max-w-lg [&_[data-slot=dialog-close]]:bg-card">
                    <DialogHeader className="sr-only">
                      <DialogTitle>{item.ownerName}</DialogTitle>
                      <DialogDescription>{item.petName}</DialogDescription>
                    </DialogHeader>
                    <Image
                      src={photoUrl}
                      alt={item.petName}
                      width={1200}
                      height={900}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="p-6">
                      <TestimonialCopy
                        item={item}
                        avatarUrl={avatarUrl}
                        initials={initials}
                        quoteClassName="text-base leading-relaxed text-foreground/90 italic"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        {/* <CarouselPrevious className="left-1 z-10 bg-card" />
        <CarouselNext className="right-1 z-10 bg-card" /> */}
      </Carousel>
    </section>
  )
}
