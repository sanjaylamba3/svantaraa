import React from 'react'
import Image from 'next/image'
import { IconArrowRight } from '@tabler/icons-react'
import { getMediaAlt, getMediaUrl } from '@/lib/media'
import type { Media } from '@/payload-types'

interface PurposeSectionProps {
  badge?: string
  heading?: string
  narrative?: string
  founderPhoto?: Media | string | number | null
  founderDefaultPhotoUrl?: string
  metricValue?: string
  metricDescription?: string
  ctaText?: string
  ctaLink?: string
}

const portraitPhoto = {
  src: '/boarding-with-purpose-1.avif',
  alt: 'A rescued dog resting on the sanctuary lawn',
}

function splitNarrative(narrative: string): { lead: string; rest: string } {
  const trimmed = narrative.trim()
  const breakAt = trimmed.search(/[.!?]\s+\S/)
  if (breakAt === -1) {
    return { lead: trimmed, rest: '' }
  }

  const end = breakAt + 1
  return {
    lead: trimmed.slice(0, end),
    rest: trimmed.slice(end).trim(),
  }
}

function renderHeading(heading: string): React.ReactNode {
  const match = heading.match(/purpose/i)
  if (!match || match.index === undefined) {
    return heading
  }

  const word = heading.slice(match.index, match.index + match[0].length)
  return (
    <>
      {heading.slice(0, match.index)}
      <span className="font-normal italic text-champagne">{word}</span>
      {heading.slice(match.index + word.length)}
    </>
  )
}

export function PurposeSection({
  badge = 'Mission & Ethos',
  heading = 'Boarding With Purpose: Every Night Shelters a Soul.',
  narrative = 'Svantaraa was founded on an unapologetic pledge: luxury pet parenting and compassion for forgotten street dogs must walk paw-in-paw. 100% of resort profits fuel emergency orthopedic surgeries, cancer rehabilitation, and peaceful lifelong shelter for over 150 community canines.',
  founderPhoto,
  founderDefaultPhotoUrl = '/founder.avif',
  metricValue = '100%',
  metricDescription = 'Transparent impact reporting with stay invoice.',
  ctaText = 'Read Rescue Journal',
  ctaLink = '#philosophy',
}: PurposeSectionProps) {
  const { lead, rest } = splitNarrative(narrative)
  const leadInitial = lead.charAt(0)
  const leadRemainder = lead.slice(1)
  const squarePhotoUrl = getMediaUrl(founderPhoto, founderDefaultPhotoUrl)
  const squareAlt = getMediaAlt(founderPhoto, 'Caregivers with rescued dogs at the sanctuary')

  return (
    <section
      id="social-impact"
      className="relative w-full overflow-hidden border-b border-foreground/10 bg-background py-20 md:py-24"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="flex flex-col gap-8 lg:col-span-6">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-forest" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-forest">
              {badge}
            </span>
          </div>

          <h2 className="font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {renderHeading(heading)}
          </h2>

          {lead ? (
            <p className="text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
              <span className="float-left mr-4 font-serif text-7xl leading-none font-normal text-foreground select-none">
                {leadInitial}
              </span>
              {leadRemainder}
            </p>
          ) : null}

          {rest ? <p className="text-base leading-relaxed text-foreground">{rest}</p> : null}

          <div className="pt-2">
            <a
              href={ctaLink}
              className="group inline-flex items-center gap-4 border-b border-foreground py-3 transition-colors duration-200 hover:border-champagne motion-reduce:transition-none"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors duration-200 group-hover:text-forest motion-reduce:transition-none">
                {ctaText}
              </span>
              <IconArrowRight
                className="size-4 text-champagne transition-transform duration-200 group-hover:translate-x-2 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                aria-hidden
              />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:col-span-6">
          <div className="group relative col-span-7 aspect-[4/5] overflow-hidden bg-secondary shadow-lg">
            <Image
              src={portraitPhoto.src}
              alt={portraitPhoto.alt}
              fill
              sizes="(max-width: 1024px) 60vw, 30vw"
              className="object-cover grayscale transition duration-200 ease-out group-hover:scale-105 group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>

          <div className="col-span-5 flex flex-col justify-end gap-6">
            <div className="group relative aspect-square overflow-hidden bg-secondary shadow-lg">
              <Image
                src={squarePhotoUrl}
                alt={squareAlt}
                fill
                sizes="(max-width: 1024px) 40vw, 20vw"
                className="object-cover grayscale transition duration-200 ease-out group-hover:scale-105 group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>
            <div className="border-l-2 border-champagne bg-secondary p-6">
              <span className="block font-serif text-3xl text-foreground">{metricValue}</span>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{metricDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
