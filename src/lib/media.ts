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
