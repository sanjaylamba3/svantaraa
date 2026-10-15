import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'badge', 'price', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'badge',
      type: 'text',
      admin: {
        description: 'e.g. Signature Chalet, Social & Sensory, Private Access',
      },
    },
    {
      name: 'featureTag',
      type: 'text',
      admin: {
        description: 'Bottom-right photo badge, e.g. 100% Private Patio, Matched Temperaments',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'priceUnit',
      type: 'text',
      defaultValue: '/ night',
      admin: {
        description: 'e.g. / night, / 5 hrs, / 2 hrs',
      },
    },
    {
      name: 'priceLabel',
      type: 'text',
      defaultValue: 'Per Night Stay',
      admin: {
        description: 'Overline above price, e.g. Per Night Stay, Daycare Session, Park Pass',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'defaultImageUrl',
      type: 'text',
      admin: {
        description: 'Fallback image URL if no media uploaded',
      },
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      defaultValue: 'Select Suite',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: '#reserve-concierge',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Order of display on homepage',
      },
    },
  ],
}
