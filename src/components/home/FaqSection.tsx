'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { IconPlus } from '@tabler/icons-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from 'cn'
import type { Faq } from '@/payload-types'

interface FaqSectionProps {
  overline?: string
  heading?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  faqs?: Faq[]
}

type FallbackFaq = {
  id: string
  question: string
  answer: string
}

const defaultFaqs: FallbackFaq[] = [
  {
    id: 'faq-1',
    question: 'What vaccinations are strictly mandatory prior to check-in?',
    answer:
      'To ensure zero cross-infection in our open sanctuary, all canine guests must possess updated DHPPiL (7-in-1 / 9-in-1), Anti-Rabies, and Kennel Cough (Bordetella) immunizations administered at least 7 days before entry. Proof of spot-on tick and flea preventative within the last 3 weeks is verified during health intake.',
  },
  {
    id: 'faq-2',
    question: 'Is an initial temperament trial mandatory before a multi-day stay?',
    answer:
      'Yes. First-time guests undergo a complimentary 2-hour Day Assessment session. This allows our canine behaviorists to introduce your dog to the scent environment, handlers, and potential play buddies, ensuring they experience zero stress when staying overnight.',
  },
  {
    id: 'faq-3',
    question: 'How will I stay connected with my companion during their stay?',
    answer:
      'You receive a dedicated private WhatsApp concierge link providing morning and dusk video dispatches. Additionally, luxury chalet bookings include 24/7 continuous password-secured HD live camera streams so you can observe your pet relaxing on their terrace anytime in any timezone.',
  },
  {
    id: 'faq-4',
    question: 'Can Svantaraa handle dogs with special medical regimens or dietaries?',
    answer:
      'Absolutely. Our resident veterinary nurses manage strict medication administration protocols (oral, eye drops, subcutaneous). Our commercial-grade pet kitchen prepares veterinary-prescribed diets or custom home-cooked blends according to your detailed handwritten notes.',
  },
]

type FaqItem = Faq | FallbackFaq

export function FaqSection({
  heading = 'Got Questions?',
  description = 'Everything you need to know ahead of your visit.',
  ctaText = 'All FAQs',
  ctaLink = '#faq-section',
  faqs,
}: FaqSectionProps) {
  const items: FaqItem[] = faqs && faqs.length > 0 ? faqs : defaultFaqs
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8" id="faq-section">
      <div className="rounded-[2rem] bg-sand px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:pt-2">
            <h2 className="font-heading text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-forest sm:text-5xl">
              {heading}
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>
            <Link
              href={ctaLink}
              className={cn(
                buttonVariants({ variant: 'default', size: 'lg' }),
                'mt-2 rounded-full bg-forest px-6 text-sm font-semibold text-ivory hover:bg-forest/90',
              )}
            >
              {ctaText}
            </Link>
          </div>

          <div className="lg:col-span-8">
            <ul className="border-t border-border">
              {items.map((item, idx) => {
                const isOpen = openIndex === idx
                const panelId = `faq-panel-${item.id ?? idx}`
                const triggerId = `faq-trigger-${item.id ?? idx}`

                return (
                  <li key={item.id ?? idx} className="border-b border-border">
                    <button
                      type="button"
                      id={triggerId}
                      onClick={() => toggle(idx)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left font-sans text-sm font-medium text-forest transition-colors hover:text-forest/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-base"
                    >
                      <span className="leading-snug">{item.question}</span>
                      <IconPlus
                        className={`size-4 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      hidden={!isOpen}
                      className="max-w-2xl pb-5 text-sm leading-relaxed text-muted-foreground"
                    >
                      {item.answer}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
