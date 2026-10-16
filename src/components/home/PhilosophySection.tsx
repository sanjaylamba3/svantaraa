'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { IconHeartbeat, IconLeaf, IconVideo } from '@tabler/icons-react'
import { cn } from 'cn'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'

interface PillarItem {
  title: string
  description: string
  icon?: string | null
}

interface PhilosophySectionProps {
  overline?: string
  quote?: string
  description?: string
  pillars?: PillarItem[] | null
}

const defaultPillars: PillarItem[] = [
  {
    title: 'Chemical-Free',
    description: 'Herbal pest management',
    icon: 'leaf',
  },
  {
    title: 'Live Parent Feed',
    description: 'Encrypted 24/7 video',
    icon: 'video',
  },
  {
    title: 'Resident Vet',
    description: 'Round-the-clock emergency',
    icon: 'heartbeat',
  },
]

function slidesFor(pillars: PillarItem[]) {
  if (pillars.length > 3) return pillars
  const copies = Math.ceil(6 / pillars.length)
  return Array.from({ length: copies }, () => pillars).flat()
}

function renderIcon(icon?: string | null) {
  switch (icon) {
    case 'video':
      return <IconVideo className="size-6 shrink-0 text-forest" />
    case 'heartbeat':
      return <IconHeartbeat className="size-6 shrink-0 text-forest" />
    case 'leaf':
    default:
      return <IconLeaf className="size-6 shrink-0 text-forest" />
  }
}

export function PhilosophySection({
  overline = 'The Svantaraa Philosophy',
  quote = '“Here, we do not warehouse pets in cages. We honor them as soulful travelers deserving of fresh morning dew, acoustic calm, and undivided devotion.”',
  description = 'Every booking at Svantaraa directly sustains our in-house animal shelter, veterinary hospital, and nourishment programs for rescued street dogs across Delhi NCR.',
  pillars,
}: PhilosophySectionProps) {
  const activePillars = pillars && pillars.length > 0 ? pillars : defaultPillars
  const slides = useMemo(() => slidesFor(activePillars), [activePillars])
  const startIndex = slides.length > 1 ? 1 : 0
  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(startIndex)

  useEffect(() => {
    if (!api) return

    const syncSelected = () => setSelected(api.selectedScrollSnap())
    syncSelected()
    api.on('select', syncSelected)
    api.on('reInit', syncSelected)

    return () => {
      api.off('select', syncSelected)
      api.off('reInit', syncSelected)
    }
  }, [api])

  useEffect(() => {
    if (!api) return

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timeout = 0

    const schedule = () => {
      window.clearTimeout(timeout)
      if (media.matches) return
      // Embla duration 20 eases the slide in about 600ms, so the center item
      // rests for a full second before the next one moves into place.
      timeout = window.setTimeout(() => {
        api.scrollNext()
        schedule()
      }, 1600)
    }

    schedule()
    media.addEventListener('change', schedule)

    return () => {
      window.clearTimeout(timeout)
      media.removeEventListener('change', schedule)
    }
  }, [api])

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <div className="mb-4 h-1 w-12 rounded-full bg-forest/40" />

        <span className="text-xs font-semibold tracking-[0.24em] text-forest uppercase">
          {overline}
        </span>

        <blockquote className="mt-3 mb-5 font-serif text-2xl leading-snug text-foreground italic sm:text-3xl md:text-4xl">
          {quote}
        </blockquote>

        <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>

        <div className="relative mt-10 w-full">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'center',
              loop: true,
              duration: 20,
              startIndex,
            }}
            aria-label="Philosophy pillars"
            className="w-full"
          >
            <CarouselContent className="ml-0 py-2">
              {slides.map((pillar, index) => (
                <CarouselItem key={`${pillar.title}-${index}`} className="basis-1/3 pl-0">
                  <div
                    className={cn(
                      'scale-90 flex items-center justify-center gap-3 px-2 py-1 text-left transition-transform duration-500 ease-out motion-reduce:transition-none sm:px-4',
                      index === selected && 'scale-150',
                    )}
                  >
                    {renderIcon(pillar.icon)}
                    <div className="flex min-w-0 flex-col">
                      <span className="text-sm font-semibold text-foreground">{pillar.title}</span>
                      <span className="text-xs text-muted-foreground">{pillar.description}</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="pointer-events-none absolute top-1/2 left-1/3 h-10 w-px -translate-x-1/2 -translate-y-1/2 bg-border/60" />
          <div className="pointer-events-none absolute top-1/2 left-2/3 h-10 w-px -translate-x-1/2 -translate-y-1/2 bg-border/60" />
        </div>
      </div>
    </section>
  )
}
