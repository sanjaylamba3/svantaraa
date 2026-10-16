'use client'

import React, { useState } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import type { Faq } from '@/payload-types'

interface FaqSectionProps {
  overline?: string
  heading?: string
  description?: string
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
  overline = 'Resident Protocol',
  heading = 'Frequently Addressed Inquiries',
  description = 'Every protocol is established to ensure maximum immunity, emotional safety, and harmony across the retreat.',
  faqs,
}: FaqSectionProps) {
  const items: FaqItem[] = faqs && faqs.length > 0 ? faqs : defaultFaqs
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full bg-muted/40 py-20 md:py-24" id="faq-section">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.24em] text-forest font-semibold">
            {overline}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground mt-1">{heading}</h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-3">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx
              const panelId = `faq-panel-${item.id ?? idx}`
              const triggerId = `faq-trigger-${item.id ?? idx}`

              return (
                <div
                  key={item.id ?? idx}
                  className="bg-card text-card-foreground rounded-2xl overflow-hidden shadow-xs border border-border transition-all"
                >
                  <button
                    type="button"
                    id={triggerId}
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-serif text-lg sm:text-xl text-foreground hover:text-forest transition-colors cursor-pointer"
                  >
                    <span className="font-medium leading-snug">{item.question}</span>
                    <IconChevronDown
                      className={`size-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden
                    />
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    hidden={!isOpen}
                    className="px-6 pb-5 pt-0 text-sm text-muted-foreground leading-relaxed"
                  >
                    {item.answer}
                  </div>
                </div>
              )
            })}
          </div>
      </div>
    </section>
  )
}
