import Link from 'next/link'
import { IconArrowRight, IconMapPin, IconPhone } from '@tabler/icons-react'
import Image from 'next/image'
import { DEFAULT_PHONE } from '@/lib/site'

interface FooterProps {
  brandTagline?: string
  brandBio?: string
  address?: string
  phone?: string
  hoursBoarding?: string
  hoursDaycare?: string
  hoursDogPark?: string
}

const columnLabel =
  'text-[10px] font-semibold uppercase tracking-[0.28em] text-champagne'

const footerLink =
  'group inline-flex items-center gap-3 border-b border-transparent py-1 text-sm text-mist transition-colors duration-200 hover:border-champagne/60 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-espresso motion-reduce:transition-none'

export function Footer({
  brandTagline = 'Sanctuary of Conscious Care',
  brandBio = 'Where luxury meets heartfelt rescue care. Thoughtfully designed stays and authentic hospitality for every furry family member.',
  address = 'Alahawas, Sector 59, Gurugram, Haryana 122005',
  phone = DEFAULT_PHONE,
  hoursBoarding = '08:00 AM – 11:00 AM, 04:00 PM – 07:00 PM',
  hoursDaycare = '08:00 AM – 08:00 PM (Daily)',
  hoursDogPark = 'Exclusive Access by Prior Appointment',
}: FooterProps) {
  const phoneHref = `tel:${phone.replace(/\s+/g, '')}`

  return (
    <footer className="w-full overflow-x-hidden bg-espresso text-ivory">
      <div className="border-t border-champagne/25">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 pt-16 md:pb-10 md:pt-20 lg:pt-24">
          <div className="flex flex-col items-center text-center">
            <Link
              href="/"
              className="inline-flex transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
            >
              <Image
                src="/Svantaraa Logo tm.png"
                alt="Svantaraa - Luxury Pet Retreat"
                width={778}
                height={104}
                className="h-8 w-auto object-contain brightness-0 invert sm:h-9"
              />
            </Link>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-champagne">
              {brandTagline}
            </p>
            <div className="mt-8 flex w-full max-w-xs items-center gap-4 sm:max-w-sm" aria-hidden>
              <span className="h-px flex-1 bg-border-dark" />
              <span className="size-1 rotate-45 bg-champagne/80" />
              <span className="h-px flex-1 bg-border-dark" />
            </div>
            <p className="mt-8 max-w-lg text-sm font-light leading-relaxed text-mist">{brandBio}</p>
          </div>

          <div
            className="mt-14 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border-dark"
          >
            <div className="flex flex-col items-center text-center md:px-8 lg:px-10">
              <span className={columnLabel}>Operating Hours</span>
              <dl className="mt-6 w-full max-w-xs space-y-5 text-sm">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-ivory">
                    Boarding Check-In & Pick-Up
                  </dt>
                  <dd className="mt-1.5 whitespace-pre-line text-xs font-light leading-relaxed text-mist">
                    {hoursBoarding}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-ivory">
                    Daycare Retreat
                  </dt>
                  <dd className="mt-1.5 text-xs font-light text-mist">{hoursDaycare}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wider text-ivory">
                    Dog Park Visits
                  </dt>
                  <dd className="mt-1.5 text-xs font-light text-mist">{hoursDogPark}</dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col items-center text-center md:px-8 lg:px-10">
              <span className={columnLabel}>Explore</span>
              <nav className="mt-6 flex flex-col items-center gap-4" aria-label="Footer">
                <Link href="/about" className={footerLink}>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">About Us</span>
                  <IconArrowRight
                    className="size-3.5 text-champagne opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    aria-hidden
                  />
                </Link>
                <Link href="/contact" className={footerLink}>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">Contact Us</span>
                  <IconArrowRight
                    className="size-3.5 text-champagne opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    aria-hidden
                  />
                </Link>
              </nav>
            </div>

            <div className="flex flex-col items-center text-center md:px-8 lg:px-10">
              <span className={columnLabel}>Visit</span>
              <div className="mt-6 flex max-w-xs flex-col gap-5 text-sm font-light text-mist">
                <div className="flex flex-col items-center gap-2">
                  <IconMapPin className="size-4 text-champagne" aria-hidden />
                  <span className="leading-relaxed">{address}</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <IconPhone className="size-4 text-champagne" aria-hidden />
                  <a
                    href={phoneHref}
                    className="border-b border-transparent tracking-wide transition-colors duration-200 hover:border-champagne/60 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-espresso motion-reduce:transition-none"
                  >
                    {phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border-dark px-4 py-10 sm:px-6 md:py-12 lg:px-8">
          <Link
            href="/"
            className="mx-auto block w-full max-w-xl transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-espresso sm:max-w-2xl md:max-w-3xl"
            aria-label="Svantaraa home"
          >
            <Image
              src="/Svantaraa Logo tm.png"
              alt=""
              width={778}
              height={104}
              sizes="(max-width: 768px) 85vw, 768px"
              className="mx-auto h-auto w-full object-contain brightness-0 invert opacity-[0.35] transition-opacity duration-200 motion-reduce:transition-none"
            />
          </Link>
        </div>

        <div className="border-t border-border-dark/80 px-4 pb-10 pt-8 sm:px-6 lg:px-8">
          <div
            className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 text-center text-[11px] uppercase tracking-[0.12em] text-mist sm:flex-row sm:justify-between sm:text-left"
          >
            <span className="font-light normal-case tracking-normal">
              © 2026 Svantaraa Pet Retreat. All sanctuary rights reserved.
            </span>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="transition-colors hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
              >
                Privacy Policy
              </Link>
              <span className="text-border-dark" aria-hidden>·</span>
              <Link
                href="/terms"
                className="transition-colors hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
