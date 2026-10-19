import Link from 'next/link'
import { IconMapPin, IconPhone } from '@tabler/icons-react'
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

const columnTitle =
  'text-xs font-semibold uppercase tracking-[0.2em] text-champagne'

const linkFocus =
  'rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-forest'

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
    <footer className="w-full overflow-x-hidden bg-forest text-ivory">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:divide-x lg:divide-ivory/10"
        >
          <div className="flex flex-col gap-4 lg:pr-8">
            <span className={columnTitle}>Sanctuary</span>
            <p className="text-[10px] tracking-[0.22em] text-champagne uppercase font-semibold">
              {brandTagline}
            </p>
            <p className="text-sm leading-relaxed text-ivory/80">{brandBio}</p>
          </div>

          <div className="flex flex-col gap-4 lg:px-8">
            <span className={columnTitle}>Visit</span>
            <div className="flex flex-col gap-3 text-sm text-ivory/80">
              <div className="flex items-start gap-2.5">
                <IconMapPin className="size-4 shrink-0 text-champagne mt-0.5" aria-hidden />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <IconPhone className="size-4 shrink-0 text-champagne" aria-hidden />
                <a
                  href={phoneHref}
                  className={`hover:text-ivory ${linkFocus}`}
                >
                  {phone}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:px-8">
            <span className={columnTitle}>Operating Hours</span>
            <div className="flex flex-col gap-4 text-sm">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-ivory">
                  Boarding Check-In & Pick-Up
                </span>
                <span className="mt-1 block whitespace-pre-line text-xs text-ivory/70">
                  {hoursBoarding}
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-ivory">
                  Daycare Retreat
                </span>
                <span className="mt-1 block text-xs text-ivory/70">{hoursDaycare}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-ivory">
                  Dog Park Visits
                </span>
                <span className="mt-1 block text-xs text-ivory/70">{hoursDogPark}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:pl-8">
            <span className={columnTitle}>Explore</span>
            <nav className="flex flex-col gap-2 text-sm text-ivory/80" aria-label="Footer">
              <Link href="/about" className={`hover:text-ivory ${linkFocus}`}>
                About Us
              </Link>
              <Link href="/contact" className={`hover:text-ivory ${linkFocus}`}>
                Contact Us
              </Link>
            </nav>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/70 md:flex-row md:items-center md:justify-between"
        >
          <span className="text-center md:text-left">
            © 2026 Svantaraa Pet Retreat. All sanctuary rights reserved.
          </span>
          <div className="flex justify-center gap-4 md:justify-end md:gap-6">
            <Link href="/privacy" className={`hover:text-ivory ${linkFocus}`}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={`hover:text-ivory ${linkFocus}`}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden border-t border-champagne/15 bg-espresso">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="block py-6 leading-none transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-espresso sm:py-8 md:py-10"
            aria-label="Svantaraa home"
          >
            <Image
              src="/Svantaraa Logo Final.png"
              alt=""
              width={778}
              height={104}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="mx-auto h-auto w-full max-w-full object-contain object-center brightness-0 invert opacity-90 transition-opacity motion-reduce:transition-none"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}
