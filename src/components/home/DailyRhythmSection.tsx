import React from 'react'
import Image from 'next/image'
import {
  IconSun,
  IconBowl,
  IconMoon,
  IconBallTennis,
  IconSend,
  IconHeart,
} from '@tabler/icons-react'
import { getMediaAlt, getMediaUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

interface ScheduleItem {
  time: string
  title: string
  description: string
}

interface DailyRhythmSectionProps {
  overline?: string
  heading?: string
  description?: string
  schedule?: ScheduleItem[] | null
  photo1?: Media | string | number | null
  photo1DefaultUrl?: string
  photo2?: Media | string | number | null
  photo2DefaultUrl?: string
}

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
  photo1,
  photo1DefaultUrl = '/boarding-with-purpose-1.avif',
  photo2,
  photo2DefaultUrl = '/boarding-with-purpose-2.avif',
}: DailyRhythmSectionProps) {
  const activeSchedule = schedule && schedule.length > 0 ? schedule : defaultSchedule
  const img1Url = getMediaUrl(photo1, photo1DefaultUrl)
  const img2Url = getMediaUrl(photo2, photo2DefaultUrl)
  const img1Alt = getMediaAlt(photo1, heading)
  const img2Alt = getMediaAlt(photo2, heading)

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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
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

        <div className="lg:col-span-6 grid grid-cols-2 gap-4 lg:sticky lg:top-28">
          <div className="flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden shadow-sm h-72 bg-muted">
              <Image
                src={img1Url}
                alt={img1Alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm h-52 bg-muted p-5 flex flex-col justify-between border border-border">
              <IconHeart className="size-8 text-forest" aria-hidden />
              <div>
                <span className="font-serif text-xl font-medium text-foreground">1:3 Staff Ratio</span>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Unmatched attentiveness ensuring immediate reassurance whenever a guest feels
                  hesitation.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 -mt-4 sm:-mt-6">
            <div className="rounded-2xl overflow-hidden shadow-sm h-56 bg-espresso text-ivory p-5 flex flex-col justify-between border border-border-dark">
              <span className="text-xs uppercase tracking-widest text-champagne font-semibold">
                Live Streaming
              </span>
              <p className="text-sm text-mist leading-relaxed">
                Tap into your companion’s chalet anytime directly from your iOS or Android device.
              </p>
              <div className="flex items-center gap-2 text-xs text-ivory">
                <span className="w-2.5 h-2.5 rounded-full bg-brick animate-ping" aria-hidden />
                <span>Encrypted High Definition</span>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-sm h-80 bg-muted">
              <Image
                src={img2Url}
                alt={img2Alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
