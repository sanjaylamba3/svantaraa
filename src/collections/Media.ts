// import { isAdminOrStaff } from '@/access/authenticatedOrAdmin'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media Asset',
    plural: 'Media Assets',
  },
  admin: {
    useAsTitle: 'alt',
    group: 'Website & Content',
    description:
      'Images and videos used across properties, experiences, and pages (including hero background clips).',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'updatedAt'],
  },
  access: {
    read: () => true,
    // create: isAdminOrStaff,
    // update: isAdminOrStaff,
    // delete: isAdminOrStaff,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: 'public/media',
    // adminThumbnail: 'thumbnail',
    adminThumbnail: ({ doc }) => (doc?.sizes as any)?.thumbnail?.url || (doc?.url as string) || null,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
  },
}
