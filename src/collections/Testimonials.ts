import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'ownerName',
    defaultColumns: ['ownerName', 'petName', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'ownerName',
      type: 'text',
      required: true,
    },
    {
      name: 'petName',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. Parents of Bruno • 4-Year Golden Retriever',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Photo of the pet, shown on the testimonial card.',
      },
    },
    {
      name: 'defaultPhotoUrl',
      type: 'text',
      admin: {
        description: 'Pet photo URL used when no photo is uploaded.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order on homepage',
      },
    },
  ],
}
