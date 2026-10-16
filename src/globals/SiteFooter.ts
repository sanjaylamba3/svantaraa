import type { GlobalConfig } from 'payload'

export const SiteFooter: GlobalConfig = {
  slug: 'site-footer',
  label: 'Footer',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'brandTagline',
      type: 'text',
    },
    {
      name: 'brandBio',
      type: 'textarea',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'hoursBoarding',
      type: 'text',
    },
    {
      name: 'hoursDaycare',
      type: 'text',
    },
    {
      name: 'hoursDogPark',
      type: 'text',
    },
  ],
}
