import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Homepage, Service, Testimonial, Faq } from '@/payload-types'

import { HeroSection } from '@/components/home/HeroSection'
import { PhilosophySection } from '@/components/home/PhilosophySection'
import { ExperienceSection } from '@/components/home/ExperienceSection'
import { DailyRhythmSection } from '@/components/home/DailyRhythmSection'
import { PurposeSection } from '@/components/home/PurposeSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { FaqSection } from '@/components/home/FaqSection'
import { BookingBanner } from '@/components/home/BookingBanner'

export const revalidate = 60

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let homepageData: Homepage | null = null
  let services: Service[] | undefined
  let testimonials: Testimonial[] | undefined
  let faqs: Faq[] | undefined

  try {
    homepageData = await payload.findGlobal({
      slug: 'homepage',
      depth: 1,
    })
  } catch (error) {
    console.warn('Could not fetch homepage global data, using defaults:', error)
  }

  try {
    const servicesRes = await payload.find({
      collection: 'services',
      sort: 'order',
      depth: 1,
    })
    services = servicesRes.docs
  } catch (error) {
    console.warn('Could not fetch services, using defaults:', error)
  }

  try {
    const testimonialsRes = await payload.find({
      collection: 'testimonials',
      sort: 'order',
      depth: 1,
    })
    testimonials = testimonialsRes.docs
  } catch (error) {
    console.warn('Could not fetch testimonials, using defaults:', error)
  }

  try {
    const faqsRes = await payload.find({
      collection: 'faqs',
      sort: 'order',
      depth: 1,
    })
    faqs = faqsRes.docs
  } catch (error) {
    console.warn('Could not fetch faqs, using defaults:', error)
  }

  return (
    <div className="flex flex-col w-full">
      <HeroSection
        badge={homepageData?.heroBadge || undefined}
        headline={homepageData?.heroHeadline || undefined}
        description={homepageData?.heroDescription || undefined}
        primaryCtaText={homepageData?.heroPrimaryCtaText || undefined}
        primaryCtaLink={homepageData?.heroPrimaryCtaLink || undefined}
        secondaryCtaText={homepageData?.heroSecondaryCtaText || undefined}
        secondaryCtaLink={homepageData?.heroSecondaryCtaLink || undefined}
        image={homepageData?.heroImage || null}
        defaultImageUrl={homepageData?.heroDefaultImageUrl || undefined}
      />

      <PhilosophySection
        overline={homepageData?.philosophyOverline || undefined}
        quote={homepageData?.philosophyQuote || undefined}
        description={homepageData?.philosophyDescription || undefined}
        pillars={homepageData?.philosophyPillars || null}
      />

      <ExperienceSection
        overline={homepageData?.servicesOverline || undefined}
        heading={homepageData?.servicesHeading || undefined}
        description={homepageData?.servicesDescription || undefined}
        compareText={homepageData?.servicesCompareText || undefined}
        compareLink={homepageData?.servicesCompareLink || undefined}
        services={services}
      />

      <DailyRhythmSection
        overline={homepageData?.rhythmOverline || undefined}
        heading={homepageData?.rhythmHeading || undefined}
        description={homepageData?.rhythmDescription || undefined}
        schedule={homepageData?.rhythmSchedule || null}
        photos={homepageData?.rhythmPhotos || null}
      />

      <PurposeSection
        badge={homepageData?.purposeBadge || undefined}
        heading={homepageData?.purposeHeading || undefined}
        narrative={homepageData?.purposeNarrative || undefined}
        founderTitle={homepageData?.founderTitle || undefined}
        founderName={homepageData?.founderName || undefined}
        founderRole={homepageData?.founderRole || undefined}
        founderPhoto={homepageData?.founderPhoto || null}
        founderDefaultPhotoUrl={homepageData?.founderDefaultPhotoUrl || undefined}
        metrics={homepageData?.purposeMetrics || null}
        ctaText={homepageData?.purposeCtaText || undefined}
        ctaLink={homepageData?.purposeCtaLink || undefined}
        footnote={homepageData?.purposeFootnote || undefined}
      />
     

      <TestimonialsSection testimonials={testimonials} />

      <FaqSection faqs={faqs} />

      <BookingBanner
        badge={homepageData?.bookingBadge || undefined}
        heading={homepageData?.bookingHeading || undefined}
        description={homepageData?.bookingDescription || undefined}
        primaryCtaText={homepageData?.bookingPrimaryCtaText || undefined}
        primaryCtaLink={homepageData?.bookingPrimaryCtaLink || undefined}
        secondaryCtaText={homepageData?.bookingSecondaryCtaText || undefined}
        secondaryCtaLink={homepageData?.bookingSecondaryCtaLink || undefined}
        conciergeContact={homepageData?.conciergeContact || undefined}
      />
    </div>
  )
}
