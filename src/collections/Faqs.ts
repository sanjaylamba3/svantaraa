import type { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Boarding & Chalets', value: 'boarding' },
        { label: 'Health & Medical', value: 'health' },
        { label: 'Daycare & Park', value: 'daycare' },
      ],
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
