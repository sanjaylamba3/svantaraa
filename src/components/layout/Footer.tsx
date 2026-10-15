import React from 'react'
import Link from 'next/link'
import { IconMapPin, IconPhone } from '@tabler/icons-react'

interface FooterProps {
  brandBio?: string
  address?: string
  phone?: string
  hoursBoarding?: string
  hoursDaycare?: string
  hoursDogPark?: string
}

export function Footer({
  brandBio = 'Where luxury meets heartfelt rescue care. Thoughtfully designed stays and authentic hospitality for every furry family member.',
  address = 'Alahawas, Sector 59, Gurugram, Haryana 122005',
  phone = '+91 95999 08677',
  hoursBoarding = '08:00 AM – 11:00 AM, 04:00 PM – 07:00 PM',
  hoursDaycare = '08:00 AM – 08:00 PM (Daily)',
  hoursDogPark = 'Exclusive Access by Prior Appointment',
}: FooterProps) {
  return (
    <footer className="w-full bg-neutral-900 text-neutral-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.14em] uppercase text-white font-medium">
                Svantaraa
              </span>
              <span className="text-[10px] tracking-[0.22em] text-amber-300 uppercase font-semibold mt-1">
                Sanctuary of Conscious Care
              </span>
            </div>
            <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
              {brandBio}
            </p>
            <div className="flex flex-col gap-2 pt-2 text-sm text-neutral-400">
              <div className="flex items-start gap-2.5">
                <IconMapPin className="size-4 text-amber-300 shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <IconPhone className="size-4 text-amber-300 shrink-0" />
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {phone}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Operating Hours */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.2em] text-white font-semibold">
              Operating Hours
            </span>
            <div className="flex flex-col gap-3 text-sm text-neutral-400">
              <div className="bg-neutral-800/60 p-3 rounded-lg border border-neutral-800">
                <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-200">
                  Boarding Check-In & Pick-Up
                </span>
                <span className="block mt-1 whitespace-pre-line text-xs text-neutral-300">
                  {hoursBoarding}
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-200">
                  Daycare Retreat
                </span>
                <span className="block text-xs text-neutral-300 mt-0.5">
                  {hoursDaycare}
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-200">
                  Dog Park Visits
                </span>
                <span className="block text-xs text-neutral-300 mt-0.5">
                  {hoursDogPark}
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Explore Navigation */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.2em] text-white font-semibold">
              Explore
            </span>
            <nav className="flex flex-col gap-2 text-sm">
              <a
                href="#reserve-concierge"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Luxury Chalets
              </a>
              <a
                href="#reserve-concierge"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Daycare Suites
              </a>
              <a
                href="#reserve-concierge"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Dog Park & Agility Grounds
              </a>
              <a
                href="#social-impact"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Rescue Mission
              </a>
              <a
                href="#daily-rhythm"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Circadian Rhythm
              </a>
              <a
                href="#testimonials"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Guest Reviews
              </a>
              <a
                href="#faq-section"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Resident FAQs
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <span className="text-center md:text-left">
            © 2026 Svantaraa Pet Retreat. All sanctuary rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Stay
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Canine Code of Conduct
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
