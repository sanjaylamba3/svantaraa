import React from 'react'
import Image from 'next/image'
import { IconSun, IconBowl, IconMoon, IconBallTennis, IconSend } from '@tabler/icons-react'
import { getMediaAlt, getMediaUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

interface ScheduleItem {
  time: string
  title: string
  description: string
}

interface RhythmPhoto {
  image?: Media | string | number | null
  id?: string | null
}

interface DailyRhythmSectionProps {
  overline?: string
  heading?: string
  description?: string
  schedule?: ScheduleItem[] | null
  photos?: RhythmPhoto[] | null
}

const defaultPhotoUrls = [
  '/boarding-with-purpose-1.avif',
  '/daycare.avif',
  '/boarding-with-purpose-2.avif',
  '/dog-park.avif',
  '/boarding.avif',
  '/founder.avif',
]

const photoSpans = [
  'row-span-2',
  'row-span-1',
  'row-span-2',
  'row-span-1',
  'row-span-1',
  'row-span-1',
]

const defaultSchedule: ScheduleItem[] = [
  {
    time: '07:00 AM – 08:30 AM',
    title: 'Morning Scent Walk & Dew Romp',
    description:
      'Solitary or buddy walks along the herb gardens to stimulate canine scent receptors while morning temperatures are crisp.',
  },
  {
    time: '08:30 AM – 10:00 AM',
    title: 'Artisanal Wholesome Breakfast',
    description:
      'Individual dining in private suites: steamed organic pumpkin, free-range poultry, chia seed broth, or parent-provided custom dietaries.',
  },
  {
    time: '12:30 PM – 03:30 PM',
    title: 'Midday Acoustic Slumber',
    description:
      'Climate-controlled blackout rest chambers with diffuse lavender aromatherapy and psychoacoustic pet-relaxation scores.',
  },
  {
    time: '04:30 PM – 06:30 PM',
    title: 'Agility Games & Social Play',
    description:
      'Encounter sessions, gentle fetch across natural berms, and agility ramp exploration supervised by positive reinforcement handlers.',
  },
  {
    time: '07:30 PM – 09:00 PM',
    title: 'Evening Video Dispatch to Parents',
    description:
      'Parents receive curated high-definition video clips and a behavioral wellness summary detailing meal intake, play mood, and bowel health.',
  },
]

export function DailyRhythmSection({
  overline = 'Circadian Harmony',
  heading = 'Daily Rhythm at the Sanctuary',
  description = 'Dogs thrive on predictable, calm structure. Our daily cadence balances energizing outdoor exploration with restorative sensory quietude.',
  schedule,
  photos,
}: DailyRhythmSectionProps) {
  const activeSchedule = schedule && schedule.length > 0 ? schedule : defaultSchedule
  const gallery = defaultPhotoUrls.map((fallbackUrl, index) => {
    const photo = photos?.[index]
    return {
      url: getMediaUrl(photo?.image, fallbackUrl),
      alt: getMediaAlt(photo?.image, heading),
    }
  })

  const getTimelineIcon = (index: number) => {
    switch (index) {
      case 0:
        return <IconSun className="size-5 text-forest" />
      case 1:
        return <IconBowl className="size-5 text-forest" />
      case 2:
        return <IconMoon className="size-5 text-forest" />
      case 3:
        return <IconBallTennis className="size-5 text-forest" />
      case 4:
      default:
        return <IconSend className="size-5 text-champagne" />
    }
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24" id="daily-rhythm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-stretch items-start">
        <div className="lg:col-span-6 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-forest font-semibold">
              {overline}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground">{heading}</h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-1">{description}</p>
          </div>

          <div className="flex flex-col gap-4 relative">
            <div className="absolute left-4 top-4 bottom-4 w-px bg-border/70" />

            {activeSchedule.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 relative pl-10">
                <div
                  className={`absolute left-2.5 top-2 w-3 h-3 rounded-full ring-4 ring-background ${
                    idx === activeSchedule.length - 1 ? 'bg-champagne' : 'bg-forest'
                  }`}
                />

                <div className="bg-muted/50 p-5 rounded-2xl w-full border border-border hover:bg-muted/70 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs uppercase tracking-wider font-semibold text-forest">
                      {item.time}
                    </span>
                    {getTimelineIcon(idx)}
                  </div>
                  <h4 className="font-serif text-lg font-medium text-foreground">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-4 auto-rows-[11rem] lg:h-full lg:auto-rows-fr lg:grid-rows-4">
          {gallery.map((photo, index) => (
            <div
              key={`${photo.url}-${index}`}
              className={`relative overflow-hidden rounded-2xl bg-muted shadow-sm ${photoSpans[index]}`}
            >
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
