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
    <footer className="w-full bg-espresso text-ivory">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-border-dark">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex flex-col">
              <Link href="/" className="flex items-center group">
                <Image
                  src="/Svantaraa Logo Final.png"
                  alt="Svantaraa - Luxury Pet Retreat"
                  width={778}
                  height={104}
                  className="h-7 sm:h-8 md:h-9 lg:h-10 w-auto object-contain transition-opacity group-hover:opacity-90 brightness-0 invert"
                />
              </Link>
              <span className="text-[10px] tracking-[0.22em] text-champagne uppercase font-semibold mt-1">
                {brandTagline}
              </span>
            </div>
            <p className="text-sm text-mist max-w-md leading-relaxed">{brandBio}</p>
            <div className="flex flex-col gap-2 pt-2 text-sm text-mist">
              <div className="flex items-start gap-2.5">
                <IconMapPin className="size-4 text-champagne shrink-0 mt-0.5" aria-hidden />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <IconPhone className="size-4 text-champagne shrink-0" aria-hidden />
                <a href={phoneHref} className="hover:text-ivory transition-colors">
                  {phone}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.2em] text-ivory font-semibold">
              Operating Hours
            </span>
            <div className="flex flex-col gap-3 text-sm text-mist">
              <div className="bg-cocoa/60 p-3 rounded-2xl border border-border-dark">
                <span className="block text-xs font-semibold uppercase tracking-wider text-ivory">
                  Boarding Check-In & Pick-Up
                </span>
                <span className="block mt-1 whitespace-pre-line text-xs text-mist">
                  {hoursBoarding}
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-ivory">
                  Daycare Retreat
                </span>
                <span className="block text-xs text-mist mt-0.5">{hoursDaycare}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-ivory">
                  Dog Park Visits
                </span>
                <span className="block text-xs text-mist mt-0.5">{hoursDogPark}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.2em] text-ivory font-semibold">
              Explore
            </span>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact Us</Link>
            </nav>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-mist">
          <span className="text-center md:text-left">
            © 2026 Svantaraa Pet Retreat. All sanctuary rights reserved.
          </span>
          <div className="flex gap-4">
            
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
