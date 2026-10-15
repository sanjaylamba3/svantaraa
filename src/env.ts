import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    PAYLOAD_SECRET: z.string().min(1, 'PAYLOAD_SECRET is required'),
    BLOB_READ_WRITE_TOKEN: z.string().optional(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z
      .url('NEXT_PUBLIC_SITE_URL must be a valid URL')
      .refine(
        (value) => process.env.NODE_ENV !== 'production' || new URL(value).protocol === 'https:',
        'NEXT_PUBLIC_SITE_URL must use HTTPS in production',
      ),
  },
  experimental__runtimeEnv: {
    // Only NEXT_PUBLIC_ variables need to be listed here for Next.js bundle optimization
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
