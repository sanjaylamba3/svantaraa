import React from 'react'
import {
  IconSun,
  IconBowl,
  IconMoon,
  IconBallTennis,
  IconSend,
  IconHeart,
} from '@tabler/icons-react'
import { getMediaUrl } from '@/lib/media'
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
  photo1DefaultUrl = 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
  photo2,
  photo2DefaultUrl = 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
}: DailyRhythmSectionProps) {
  const activeSchedule = schedule && schedule.length > 0 ? schedule : defaultSchedule
  const img1Url = getMediaUrl(photo1, photo1DefaultUrl)
  const img2Url = getMediaUrl(photo2, photo2DefaultUrl)

  const getTimelineIcon = (index: number) => {
    switch (index) {
      case 0:
        return <IconSun className="size-5 text-emerald-800 dark:text-emerald-400" />
      case 1:
        return <IconBowl className="size-5 text-emerald-800 dark:text-emerald-400" />
      case 2:
        return <IconMoon className="size-5 text-emerald-800 dark:text-emerald-400" />
      case 3:
        return <IconBallTennis className="size-5 text-emerald-800 dark:text-emerald-400" />
      case 4:
      default:
        return <IconSend className="size-5 text-amber-500" />
    }
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24" id="daily-rhythm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Schedule narrative and timeline */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-emerald-800 dark:text-emerald-400 font-semibold">
              {overline}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground">
              {heading}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mt-1">
              {description}
            </p>
          </div>

          {/* Timeline */}
          <div className="flex flex-col gap-4 relative">
            {/* Continuous Hairline Indicator */}
            <div className="absolute left-4 top-4 bottom-4 w-px bg-border/70" />

            {activeSchedule.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 relative pl-10">
                {/* Dot */}
                <div
                  className={`absolute left-2.5 top-2 w-3 h-3 rounded-full ring-4 ring-background ${
                    idx === activeSchedule.length - 1 ? 'bg-amber-400' : 'bg-emerald-700'
                  }`}
                />

                {/* Card */}
                <div className="bg-muted/50 p-5 rounded-2xl w-full border border-border/40 hover:bg-muted/70 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 dark:text-emerald-400">
                      {item.time}
                    </span>
                    {getTimelineIcon(idx)}
                  </div>
                  <h4 className="font-serif text-lg font-medium text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Asymmetric Mosaic */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 lg:sticky lg:top-28">
          {/* Col 1 */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden shadow-sm h-72 bg-neutral-200 dark:bg-neutral-800">
              <img
                src={img1Url}
                alt="Tranquil dog enjoying luxury suite comfort"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm h-52 bg-muted p-5 flex flex-col justify-between border border-border/50">
              <IconHeart className="size-8 text-emerald-700 dark:text-emerald-400" />
              <div>
                <span className="font-serif text-xl font-medium text-foreground">
                  1:3 Staff Ratio
                </span>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Unmatched attentiveness ensuring immediate reassurance whenever a guest feels hesitation.
                </p>
              </div>
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-4 -mt-4 sm:-mt-6">
            <div className="rounded-2xl overflow-hidden shadow-sm h-56 bg-neutral-900 text-white p-5 flex flex-col justify-between border border-neutral-800">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                Live Streaming
              </span>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Tap into your companion’s chalet anytime directly from your iOS or Android device.
              </p>
              <div className="flex items-center gap-2 text-xs text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span>Encrypted High Definition</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm h-80 bg-neutral-200 dark:bg-neutral-800">
              <img
                src={img2Url}
                alt="Certified handler grooming canine guest"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
