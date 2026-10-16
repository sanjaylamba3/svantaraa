import React from 'react'
import { IconLeaf, IconVideo, IconHeartbeat } from '@tabler/icons-react'

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

export function PhilosophySection({
  overline = 'The Svantaraa Philosophy',
  quote = '“Here, we do not warehouse pets in cages. We honor them as soulful travelers deserving of fresh morning dew, acoustic calm, and undivided devotion.”',
  description = 'Every booking at Svantaraa directly sustains our in-house animal shelter, veterinary hospital, and nourishment programs for rescued street dogs across Delhi NCR.',
  pillars,
}: PhilosophySectionProps) {
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

  const activePillars = pillars && pillars.length > 0 ? pillars : defaultPillars

  const renderIcon = (icon?: string | null) => {
    switch (icon) {
      case 'video':
        return <IconVideo className="size-6 text-forest shrink-0" />
      case 'heartbeat':
        return <IconHeartbeat className="size-6 text-forest shrink-0" />
      case 'leaf':
      default:
        return <IconLeaf className="size-6 text-forest shrink-0" />
    }
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <div className="w-12 h-1 bg-forest/40 rounded-full mb-4" />

        <span className="text-xs uppercase tracking-[0.24em] text-forest font-semibold">
          {overline}
        </span>

        <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl italic text-foreground mt-3 mb-5 leading-snug">
          {quote}
        </blockquote>

        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-left w-full">
          {activePillars.map((pillar, idx) => (
            <React.Fragment key={pillar.title || idx}>
              {idx > 0 && <div className="hidden sm:block w-px h-10 bg-border/60" />}
              <div className="flex items-center gap-3">
                {renderIcon(pillar.icon)}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">{pillar.title}</span>
                  <span className="text-xs text-muted-foreground">{pillar.description}</span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
