export const DEFAULT_PHONE = '+91 95999 08677'

/** Swap for the sanctuary profile once the handle is confirmed. */
export const INSTAGRAM_URL = 'https://www.instagram.com/'

export const DEFAULT_PHONE_HREF = `tel:${DEFAULT_PHONE.replace(/\s+/g, '')}`

export const primaryNavLinks = [
  { href: '#', label: 'About Us' },
  { href: '#', label: 'Services' },
  { href: '#', label: 'Contact Us' },
] as const

export function isExternalBookingUrl(url: string | null | undefined): boolean {
  if (!url) return false
  if (url.startsWith('#')) return false
  return true
}
