import React from 'react'
import Image from 'next/image'
import { IconHeartHandshake } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { getMediaAlt, getMediaUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

interface MetricItem {
  value: string
  label?: string | null
  description: string
  id?: string | null
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

const portraitPhoto = {
  src: '/boarding-with-purpose-1.avif',
  alt: 'A rescued dog resting on the sanctuary lawn',
}

const restingPhoto = {
  src: '/boarding-with-purpose-2.avif',
  alt: 'Two rescued dogs resting together in the sanctuary garden',
}

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
  const caregiverPhotoUrl = getMediaUrl(founderPhoto, founderDefaultPhotoUrl)
  const caregiverAlt = getMediaAlt(founderPhoto, `${founderName}, ${founderRole}`)

  return (
    <section
      id="social-impact"
      className="relative w-full overflow-hidden bg-forest py-20 text-ivory md:py-24"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-champagne" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
              {badge}
            </span>
          </div>

          <h2 className="font-serif text-3xl font-semibold leading-tight text-ivory sm:text-4xl lg:text-5xl">
            {heading}
          </h2>

          <p className="text-base leading-relaxed text-sand/90 sm:text-lg">{narrative}</p>

          <div className="grid grid-cols-3 gap-3 pt-2 sm:gap-4">
            {activeMetrics.map((metric) => (
              <div
                key={metric.id ?? `${metric.value}-${metric.label ?? metric.description}`}
                className="flex flex-col rounded-2xl bg-espresso/40 p-3 backdrop-blur-sm sm:p-4"
              >
                <span className="font-serif text-2xl font-semibold tracking-tight text-champagne sm:text-3xl">
                  {metric.value}
                </span>
                <span className="mt-1 text-xs leading-snug text-sand sm:text-sm">
                  {metric.label || metric.description}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <a href={ctaLink}>
              <Button
                size="lg"
                className="h-auto rounded-full bg-champagne-soft px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-espresso shadow-md hover:bg-sand"
              >
                {ctaText}
              </Button>
            </a>
            <p className="inline-flex items-center gap-2 text-sm text-sand">
              <IconHeartHandshake className="size-5 text-champagne" aria-hidden />
              <span>{footnote}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-6">
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={portraitPhoto.src}
                alt={portraitPhoto.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="rounded-2xl bg-espresso/55 p-5 backdrop-blur-md">
              <p className="font-serif text-lg font-semibold text-champagne">{founderTitle}</p>
              <p className="mt-1 text-sm leading-relaxed text-sand/90">
                {founderName}. {founderRole}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={caregiverPhotoUrl}
                alt={caregiverAlt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={restingPhoto.src}
                alt={restingPhoto.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
