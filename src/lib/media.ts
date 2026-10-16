import type { Media } from '@/payload-types'

/**
 * Returns the URL for a Payload Media object or fallback URL string.
 */
export function getMediaUrl(
  media: string | number | Media | null | undefined,
  fallbackUrl: string = '',
): string {
  if (!media) return fallbackUrl
  if (typeof media === 'object' && media !== null && 'url' in media && media.url) {
    return media.url
  }
  return fallbackUrl
}

export function getMediaAlt(
  media: string | number | Media | null | undefined,
  fallback: string,
): string {
  if (typeof media === 'object' && media !== null && media.alt) {
    return media.alt
  }
  return fallback
}
