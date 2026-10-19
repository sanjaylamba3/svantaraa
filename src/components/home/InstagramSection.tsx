'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { IconBrandInstagram } from '@tabler/icons-react'
import { cn } from 'cn'
import { INSTAGRAM_URL } from '@/lib/site'

interface InstagramSectionProps {
  overline?: string
  heading?: string
  ctaLabel?: string
  href?: string
  photos?: SnapshotPhoto[] | null
}

type SnapshotPhoto = {
  src: string
  alt: string
}

type SnapshotFrame = {
  frameClass: string
  radiusClass: string
  sizeClass: string
  placeClass: string
}

const defaultPhotos: SnapshotPhoto[] = [
  { src: '/dog-park.avif', alt: 'Dogs in the sanctuary park' },
  { src: '/boarding.avif', alt: 'A guest dog settled in a boarding suite' },
  { src: '/daycare.avif', alt: 'Dogs together during daycare' },
  { src: '/boarding-with-purpose-1.avif', alt: 'A rescued dog resting on the sanctuary lawn' },
  { src: '/founder.avif', alt: 'Caregivers with rescued dogs at the sanctuary' },
  { src: '/boarding-with-purpose-2.avif', alt: 'Sanctuary dogs outdoors with their caregivers' },
]

const frames: SnapshotFrame[] = [
  {
    frameClass: 'bg-forest',
    radiusClass: 'rounded-[48%_52%_42%_58%/58%_40%_60%_42%]',
    sizeClass: 'h-[clamp(16rem,48vh,30rem)] w-[clamp(13rem,24vw,22rem)]',
    placeClass: 'translate-y-6 -rotate-6',
  },
  {
    frameClass: 'bg-champagne',
    radiusClass: 'rounded-[46%_46%_16%_16%/34%_34%_12%_12%]',
    sizeClass: 'h-[clamp(18rem,52vh,32rem)] w-[clamp(14rem,26vw,24rem)]',
    placeClass: 'translate-y-1 rotate-2',
  },
  {
    frameClass: 'bg-forest',
    radiusClass: 'rounded-[22%]',
    sizeClass: 'h-[clamp(16rem,46vh,28rem)] w-[clamp(14rem,24vw,22rem)]',
    placeClass: 'translate-y-8 -rotate-2',
  },
  {
    frameClass: 'bg-espresso',
    radiusClass: 'rounded-[58%_42%_48%_52%/46%_62%_38%_54%]',
    sizeClass: 'h-[clamp(18rem,52vh,32rem)] w-[clamp(13rem,22vw,20rem)]',
    placeClass: 'translate-y-2 rotate-3',
  },
  {
    frameClass: 'bg-champagne-soft',
    radiusClass: 'rounded-[40%_60%_50%_50%/55%_45%_55%_45%]',
    sizeClass: 'h-[clamp(16rem,46vh,28rem)] w-[clamp(12.5rem,22vw,20rem)]',
    placeClass: 'translate-y-8 -rotate-3',
  },
  {
    frameClass: 'bg-forest',
    radiusClass: 'rounded-[18%_42%_18%_42%/28%_18%_32%_20%]',
    sizeClass: 'h-[clamp(18rem,52vh,32rem)] w-[clamp(14rem,26vw,24rem)]',
    placeClass: 'translate-y-0 rotate-2',
  },
]

export function InstagramSection({
  overline = 'Sanctuary snapshots',
  heading = 'Follow us on Instagram',
  ctaLabel = 'Instagram',
  href = INSTAGRAM_URL,
  photos,
}: InstagramSectionProps) {
  const snapshots = photos && photos.length > 0 ? photos : defaultPhotos
  const stageRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const headingId = 'instagram-heading'

  useEffect(() => {
    const stage = stageRef.current
    const sticky = stickyRef.current
    const track = trackRef.current
    if (!stage || !sticky || !track) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      if (motion.matches) return

      const stickyTop = Number.parseFloat(window.getComputedStyle(sticky).top) || 0
      const pinDistance = stage.offsetHeight - sticky.offsetHeight
      if (pinDistance <= 0) return

      const scrolled = stickyTop - stage.getBoundingClientRect().top
      const progress = Math.min(1, Math.max(0, scrolled / pinDistance))
      const travel = progress < 0.08 ? 0 : (progress - 0.08) / 0.92
      const view = sticky.clientWidth
      const start = view * 0.82
      const last = track.lastElementChild
      if (!(last instanceof HTMLElement)) return
      const trackRect = track.getBoundingClientRect()
      const lastRect = last.getBoundingClientRect()
      const lastCenter = lastRect.left + lastRect.width / 2 - trackRect.left
      const end = view / 2 - lastCenter
      const shift = start + (end - start) * travel
      track.style.setProperty('--instagram-shift', `${shift}px`)
    }

    const requestUpdate = () => {
      if (frame !== 0) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    motion.addEventListener('change', requestUpdate)

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      motion.removeEventListener('change', requestUpdate)
    }
  }, [snapshots.length])

  const [firstLine, secondLine] = splitHeading(heading)

  return (
    <section
      ref={stageRef}
      id="instagram"
      aria-labelledby={headingId}
      className="instagram-stage relative h-[calc(200dvh-5rem)] bg-secondary"
    >
      <div
        ref={stickyRef}
        className="instagram-sticky sticky top-20 flex h-[calc(100dvh-5rem)] flex-col overflow-hidden bg-secondary"
      >
        <div className="instagram-edge pointer-events-none absolute inset-y-0 left-0 z-20 w-[9vw] min-w-8 bg-forest [clip-path:polygon(0_0,100%_0,62%_100%,0_100%)]" />
        <div className="instagram-edge pointer-events-none absolute inset-y-0 right-0 z-20 w-[9vw] min-w-8 bg-forest [clip-path:polygon(38%_0,100%_0,100%_100%,0_100%)]" />

        <div className="relative z-30 flex shrink-0 flex-col items-center px-6 pt-[clamp(1.25rem,3vh,3rem)] text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">{overline}</p>
          <h2
            id={headingId}
            className="mt-3 max-w-3xl font-serif text-[clamp(2.25rem,5.2vh,3.75rem)] leading-[0.95] font-medium tracking-tight text-forest uppercase"
          >
            {firstLine}
            {secondLine ? (
              <>
                <br />
                {secondLine}
              </>
            ) : null}
          </h2>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-forest px-5 text-sm font-semibold text-ivory transition-colors duration-200 hover:bg-espresso focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-secondary motion-reduce:transition-none"
          >
            <IconBrandInstagram className="size-4" aria-hidden />
            {ctaLabel}
          </a>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <ul ref={trackRef} className="instagram-track flex h-full w-max flex-nowrap items-start pt-8">
            {snapshots.map((photo, index) => {
              const frame = frames[index % frames.length]
              if (!frame) return null
              return (
                <li
                  key={`${photo.src}-${index}`}
                  className={cn('shrink-0', index > 0 && '-ml-8', frame.placeClass)}
                >
                  <div className={cn('p-3 shadow-md', frame.frameClass, frame.radiusClass, frame.sizeClass)}>
                    <div className={cn('relative h-full w-full overflow-hidden', frame.radiusClass)}>
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 80vw, 400px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

function splitHeading(heading: string): [string, string] {
  const words = heading.trim().split(/\s+/)
  if (words.length < 2) return [heading.trim(), '']
  const midpoint = Math.ceil(words.length / 2)
  return [words.slice(0, midpoint).join(' '), words.slice(midpoint).join(' ')]
}
