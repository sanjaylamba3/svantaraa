import type { GlobalConfig } from 'payload';

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin:{
    group:"Pages"
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroHeadline',
              type: 'text',
            },
            {
              name: 'heroDescription',
              type: 'textarea',
            },
            {
              name: 'heroPrimaryCtaText',
              type: 'text',
            },
            {
              name: 'heroPrimaryCtaLink',
              type: 'text',
            },
            {
              name: 'heroSecondaryCtaText',
              type: 'text',
            },
            {
              name: 'heroSecondaryCtaLink',
              type: 'text',
            },
            {
              name: 'heroVideo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Background video loop for the hero. Leave empty to use the built-in sanctuary clip.',
              },
              filterOptions: {
                mimeType: { contains: 'video' },
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Poster image shown while the hero video loads.',
              },
            },
            {
              name: 'heroDefaultImageUrl',
              type: 'text',
            },
          ],
        },
        {
          label: 'Philosophy',
          fields: [
            {
              name: 'philosophyOverline',
              type: 'text',
            },
            {
              name: 'philosophyQuote',
              type: 'textarea',
            },
            {
              name: 'philosophyDescription',
              type: 'textarea',
            },
            {
              name: 'philosophyPillars',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'select',
                  options: [
                    { label: 'Leaf (Chemical-Free)', value: 'leaf' },
                    { label: 'Video (Live Feed)', value: 'video' },
                    { label: 'Heartbeat (Resident Vet)', value: 'heartbeat' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Services Header',
          fields: [
            {
              name: 'servicesOverline',
              type: 'text',
            },
            {
              name: 'servicesHeading',
              type: 'text',
            },
            {
              name: 'servicesDescription',
              type: 'textarea',
            },
            {
              name: 'servicesCompareText',
              type: 'text',
            },
            {
              name: 'servicesCompareLink',
              type: 'text',
            },
          ],
        },
        {
          label: 'Daily Rhythm',
          fields: [
            {
              name: 'rhythmOverline',
              type: 'text',
            },
            {
              name: 'rhythmHeading',
              type: 'text',
            },
            {
              name: 'rhythmDescription',
              type: 'textarea',
            },
            {
              name: 'rhythmSchedule',
              type: 'array',
              fields: [
                { name: 'time', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
            {
              name: 'rhythmPhotos',
              type: 'array',
              maxRows: 6,
              labels: {
                singular: 'Photo',
                plural: 'Photos',
              },
              admin: {
                description:
                  'Up to six photos fill the grid beside the schedule. Empty slots keep the built-in sanctuary photos.',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Purpose (Social Impact)',
          fields: [
            {
              name: 'purposeBadge',
              type: 'text',
            },
            {
              name: 'purposeHeading',
              type: 'text',
            },
            {
              name: 'purposeNarrative',
              type: 'textarea',
            },
            {
              name: 'founderPhoto',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'founderDefaultPhotoUrl',
              type: 'text',
            },
            {
              name: 'purposeMetricValue',
              type: 'text',
            },
            {
              name: 'purposeMetricDescription',
              type: 'textarea',
            },
            {
              name: 'purposeCtaText',
              type: 'text',
            },
            {
              name: 'purposeCtaLink',
              type: 'text',
            },
          ],
        },
        {
          label: 'Instagram',
          fields: [
            {
              name: 'instagramOverline',
              type: 'text',
            },
            {
              name: 'instagramHeading',
              type: 'text',
            },
            {
              name: 'instagramCtaLabel',
              type: 'text',
            },
            {
              name: 'instagramUrl',
              type: 'text',
              admin: {
                description: 'Profile URL opened by the Instagram button. Leave empty to use the built-in link.',
              },
            },
            {
              name: 'instagramPhotos',
              type: 'array',
              labels: {
                singular: 'Photo',
                plural: 'Photos',
              },
              admin: {
                description:
                  'Photos slide in this order. Leave empty to use the built-in sanctuary photos. Card shapes stay in the design.',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  filterOptions: {
                    mimeType: { contains: 'image' },
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Booking Banner',
          fields: [
            {
              name: 'bookingBadge',
              type: 'text',
            },
            {
              name: 'bookingHeading',
              type: 'text',
            },
            {
              name: 'bookingDescription',
              type: 'textarea',
            },
            {
              name: 'bookingPrimaryCtaText',
              type: 'text',
            },
            {
              name: 'bookingPrimaryCtaLink',
              type: 'text',
            },
            {
              name: 'bookingSecondaryCtaText',
              type: 'text',
            },
            {
              name: 'bookingSecondaryCtaLink',
              type: 'text',
            },
            {
              name: 'conciergeContact',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
