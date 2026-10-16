import React from 'react'
import Image from 'next/image'
import {
  IconArrowRight,
  IconPaw,
  IconBandage,
  IconHeartHandshake,
} from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { getMediaAlt, getMediaUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

interface MetricItem {
  value: string
  label?: string | null
  description: string
}

interface PurposeSectionProps {
  badge?: string
  heading?: string
  narrative?: string
  founderTitle?: string
  founderName?: string
  founderRole?: string
  founderPhoto?: Media | string | number | null
  founderDefaultPhotoUrl?: string
  metrics?: MetricItem[] | null
  ctaText?: string
  ctaLink?: string
  footnote?: string
}

const defaultMetrics: MetricItem[] = [
  {
    value: '150+',
    label: 'Permanent Sanctuary',
    description: 'Rescued dogs supported in permanent sanctuary',
  },
  {
    value: '2,400+',
    label: 'Street Treatments',
    description: 'Street treatments & vaccinations financed yearly',
  },
  {
    value: '100%',
    label: 'Transparent Impact',
    description: 'Transparent impact reporting with stay invoice',
  },
]

export function PurposeSection({
  badge = 'Social Enterprise',
  heading = 'Boarding With Purpose: Every Night Shelters a Soul.',
  narrative = 'Svantaraa was founded on an unapologetic pledge: luxury pet parenting and compassion for forgotten street dogs must walk paw-in-paw. 100% of resort profits fuel emergency orthopedic surgeries, cancer rehabilitation, and peaceful lifelong shelter for over 150 community canines.',
  founderTitle = 'Founding Visionary',
  founderName = 'Vaishali Sharma',
  founderRole = 'Canine Ethologist & Animal Rescue Advocate',
  founderPhoto,
  founderDefaultPhotoUrl = '/founder.avif',
  metrics,
  ctaText = 'Read Rescue Journal',
  ctaLink = '#philosophy',
  footnote = 'Visitor access to shelter sanctuary by prior request.',
}: PurposeSectionProps) {
  const activeMetrics = metrics && metrics.length > 0 ? metrics : defaultMetrics
  const founderImgUrl = getMediaUrl(founderPhoto, founderDefaultPhotoUrl)
  const founderAlt = getMediaAlt(founderPhoto, `${founderName} - ${founderRole}`)

  const getMetricIcon = (index: number) => {
    switch (index) {
      case 0:
        return <IconPaw className="size-7 text-champagne" aria-hidden />
      case 1:
        return <IconBandage className="size-7 text-champagne" aria-hidden />
      case 2:
      default:
        return <IconHeartHandshake className="size-7 text-champagne" aria-hidden />
    }
  }

  return (
    <section
      className="w-full bg-espresso text-ivory py-20 md:py-28 relative overflow-hidden"
      id="social-impact"
    >
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-forest/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-cocoa border border-border-dark">
              <Image
                src={founderImgUrl}
                alt={founderAlt}
                width={800}
                height={920}
                className="w-full h-[460px] object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] uppercase tracking-[0.2em] text-champagne font-semibold">
                  {founderTitle}
                </span>
                <h3 className="font-serif text-2xl text-ivory mt-0.5">{founderName}</h3>
                <p className="text-xs text-mist mt-0.5 font-light">{founderRole}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.2em] text-champagne font-semibold">
                {badge}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-ivory">
                {heading}
              </h2>
              <p className="text-base sm:text-lg text-mist leading-relaxed font-light mt-2">
                {narrative}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {activeMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-ivory/5 backdrop-blur-md border border-border-dark rounded-2xl p-5 flex flex-col justify-between"
                >
                  {getMetricIcon(idx)}
                  <div className="mt-4">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-ivory tracking-tight">
                      {m.value}
                    </span>
                    <span className="block text-xs text-mist mt-1 leading-relaxed">
                      {m.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <a href={ctaLink}>
                <Button
                  size="lg"
                  className="rounded-full px-6 py-3 text-xs uppercase tracking-wider font-semibold shadow-md flex items-center gap-2 bg-ivory text-espresso hover:bg-ivory/90"
                >
                  <span>{ctaText}</span>
                  <IconArrowRight className="size-4" />
                </Button>
              </a>
              <span className="text-xs text-mist">{footnote}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
