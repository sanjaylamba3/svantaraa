import React from 'react'
import './styles.css'
import { Playfair_Display, Outfit } from 'next/font/google'
import { cn } from 'cn'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { SiteFooter as SiteFooterGlobal } from '@/payload-types'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata = {
  title: 'Svantaraa | Luxury Pet Retreat & Conscious Sanctuary (Gurugram)',
  description:
    'Private climate-conditioned chalets, chemical-free agility park, and 24/7 cage-free luxury pet care in Gurugram. Every stay supports rescued street dogs.',
}

const fontDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})
const fontBody = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  let footerData: SiteFooterGlobal | null = null

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    footerData = await payload.findGlobal({
      slug: 'site-footer',
      depth: 0,
    })
  } catch (error) {
    console.warn('Could not fetch site footer global, using defaults:', error)
  }

  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background text-foreground font-sans antialiased flex flex-col',
          fontDisplay.variable,
          fontBody.variable,
        )}
      >
        <Header />
        <main className="flex-1 w-full pt-20">{children}</main>
        <Footer
          brandTagline={footerData?.brandTagline || undefined}
          brandBio={footerData?.brandBio || undefined}
          address={footerData?.address || undefined}
          phone={footerData?.phone || undefined}
          hoursBoarding={footerData?.hoursBoarding || undefined}
          hoursDaycare={footerData?.hoursDaycare || undefined}
          hoursDogPark={footerData?.hoursDogPark || undefined}
        />
      </body>
    </html>
  )
}
