import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'ownerName',
    defaultColumns: ['ownerName', 'petName', 'rating', 'order'],
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
      name: 'initials',
      type: 'text',
      admin: {
        description: 'Avatar initials (e.g. RS, AK, TM). If blank, generated from owner name.',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
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
