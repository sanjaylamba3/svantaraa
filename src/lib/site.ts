export const DEFAULT_PHONE = '+91 95999 08677'

export const DEFAULT_PHONE_HREF = `tel:${DEFAULT_PHONE.replace(/\s+/g, '')}`

export const primaryNavLinks = [
  { href: '#', label: 'About Us' },
  { href: '#', label: 'Contact Us' },
] as const

export function isExternalBookingUrl(url: string | null | undefined): boolean {
  if (!url) return false
  if (url.startsWith('#')) return false
  return true
}
