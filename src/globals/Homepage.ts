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
              name: 'heroBadge',
              type: 'text',
            },
            {
              name: 'heroHeadline',
              type: 'text',
              required: true,
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              required: true,
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
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
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
              required: true,
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
              name: 'founderTitle',
              type: 'text',
            },
            {
              name: 'founderName',
              type: 'text',
            },
            {
              name: 'founderRole',
              type: 'text',
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
              name: 'purposeMetrics',
              type: 'array',
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text' },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
            {
              name: 'purposeCtaText',
              type: 'text',
            },
            {
              name: 'purposeCtaLink',
              type: 'text',
            },
            {
              name: 'purposeFootnote',
              type: 'text',
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
