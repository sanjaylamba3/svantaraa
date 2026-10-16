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
              defaultValue: 'Gurugram Sanctuary • 100% Cage-Free',
            },
            {
              name: 'heroHeadline',
              type: 'text',
              defaultValue: 'An Unhurried Sanctuary for Your Cherished Companion.',
              required: true,
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              defaultValue:
                'Private climate-conditioned chalets, an expansive chemical-free agility park, and genuine 24/7 hospitality guided by certified animal rescue specialists. Luxury rooted in conscious devotion.',
              required: true,
            },
            {
              name: 'heroPrimaryCtaText',
              type: 'text',
              defaultValue: 'Reserve Suite Stay',
            },
            {
              name: 'heroPrimaryCtaLink',
              type: 'text',
              defaultValue: '#reserve-concierge',
            },
            {
              name: 'heroSecondaryCtaText',
              type: 'text',
              defaultValue: 'Explore Sanctuary Life',
            },
            {
              name: 'heroSecondaryCtaLink',
              type: 'text',
              defaultValue: '#daily-rhythm',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'heroDefaultImageUrl',
              type: 'text',
              defaultValue:
                'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1920&q=80',
            },
          ],
        },
        {
          label: 'Philosophy',
          fields: [
            {
              name: 'philosophyOverline',
              type: 'text',
              defaultValue: 'The Svantaraa Philosophy',
            },
            {
              name: 'philosophyQuote',
              type: 'textarea',
              defaultValue:
                '“Here, we do not warehouse pets in cages. We honor them as soulful travelers deserving of fresh morning dew, acoustic calm, and undivided devotion.”',
              required: true,
            },
            {
              name: 'philosophyDescription',
              type: 'textarea',
              defaultValue:
                'Every booking at Svantaraa directly sustains our in-house animal shelter, veterinary hospital, and nourishment programs for rescued street dogs across Delhi NCR.',
            },
            {
              name: 'philosophyPillars',
              type: 'array',
              defaultValue: [
                {
                  title: 'Chemical-Free',
                  description: 'Herbal pest management',
                  icon: 'leaf',
                },
                {
                  title: 'Live Parent Feed',
                  description: 'Encrypted 24/7 video',
                  icon: 'video',
                },
                {
                  title: 'Resident Vet',
                  description: 'Round-the-clock emergency',
                  icon: 'heartbeat',
                },
              ],
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
                  defaultValue: 'leaf',
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
              defaultValue: 'Bespoke Offerings',
            },
            {
              name: 'servicesHeading',
              type: 'text',
              defaultValue: 'Sanctuary Suites & Grounds',
            },
            {
              name: 'servicesDescription',
              type: 'textarea',
              defaultValue:
                'Handcrafted spaces designed around canine behavioral wellbeing, spatial generosity, and serene comfort.',
            },
            {
              name: 'servicesCompareText',
              type: 'text',
              defaultValue: 'Compare All Privileges',
            },
            {
              name: 'servicesCompareLink',
              type: 'text',
              defaultValue: '#reserve-concierge',
            },
          ],
        },
        {
          label: 'Daily Rhythm',
          fields: [
            {
              name: 'rhythmOverline',
              type: 'text',
              defaultValue: 'Circadian Harmony',
            },
            {
              name: 'rhythmHeading',
              type: 'text',
              defaultValue: 'Daily Rhythm at the Sanctuary',
            },
            {
              name: 'rhythmDescription',
              type: 'textarea',
              defaultValue:
                'Dogs thrive on predictable, calm structure. Our daily cadence balances energizing outdoor exploration with restorative sensory quietude.',
            },
            {
              name: 'rhythmSchedule',
              type: 'array',
              defaultValue: [
                {
                  time: '07:00 AM – 08:30 AM',
                  title: 'Morning Scent Walk & Dew Romp',
                  description:
                    'Solitary or buddy walks along the herb gardens to stimulate canine scent receptors while morning temperatures are crisp.',
                },
                {
                  time: '08:30 AM – 10:00 AM',
                  title: 'Artisanal Wholesome Breakfast',
                  description:
                    'Individual dining in private suites: steamed organic pumpkin, free-range poultry, chia seed broth, or parent-provided custom dietaries.',
                },
                {
                  time: '12:30 PM – 03:30 PM',
                  title: 'Midday Acoustic Slumber',
                  description:
                    'Climate-controlled blackout rest chambers with diffuse lavender aromatherapy and psychoacoustic pet-relaxation scores.',
                },
                {
                  time: '04:30 PM – 06:30 PM',
                  title: 'Agility Games & Social Play',
                  description:
                    'Encounter sessions, gentle fetch across natural berms, and agility ramp exploration supervised by positive reinforcement handlers.',
                },
                {
                  time: '07:30 PM – 09:00 PM',
                  title: 'Evening Video Dispatch to Parents',
                  description:
                    'Parents receive curated high-definition video clips and a behavioral wellness summary detailing meal intake, play mood, and bowel health.',
                },
              ],
              fields: [
                { name: 'time', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
            {
              name: 'rhythmPhoto1',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'rhythmPhoto1DefaultUrl',
              type: 'text',
              defaultValue:
                'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
            },
            {
              name: 'rhythmPhoto2',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'rhythmPhoto2DefaultUrl',
              type: 'text',
              defaultValue:
                'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
            },
          ],
        },
        {
          label: 'Purpose (Social Impact)',
          fields: [
            {
              name: 'purposeBadge',
              type: 'text',
              defaultValue: 'Social Enterprise',
            },
            {
              name: 'purposeHeading',
              type: 'text',
              defaultValue: 'Boarding With Purpose: Every Night Shelters a Soul.',
            },
            {
              name: 'purposeNarrative',
              type: 'textarea',
              defaultValue:
                'Svantaraa was founded on an unapologetic pledge: luxury pet parenting and compassion for forgotten street dogs must walk paw-in-paw. 100% of resort profits fuel emergency orthopedic surgeries, cancer rehabilitation, and peaceful lifelong shelter for over 150 community canines.',
            },
            {
              name: 'founderTitle',
              type: 'text',
              defaultValue: 'Founding Visionary',
            },
            {
              name: 'founderName',
              type: 'text',
              defaultValue: 'Vaishali Sharma',
            },
            {
              name: 'founderRole',
              type: 'text',
              defaultValue: 'Canine Ethologist & Animal Rescue Advocate',
            },
            {
              name: 'founderPhoto',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'founderDefaultPhotoUrl',
              type: 'text',
              defaultValue:
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
            },
            {
              name: 'purposeMetrics',
              type: 'array',
              defaultValue: [
                {
                  value: '150+',
                  label: 'Permanent Sanctuary',
                  description: 'Rescued dogs supported in permanent sanctuary',
                },
                {
                  value: '2,400+',
                  label: 'Street Treatments',
                  description: 'Street treatments & vaccinations financed yearly',
                },
                {
                  value: '100%',
                  label: 'Transparent Impact',
                  description: 'Transparent impact reporting with stay invoice',
                },
              ],
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text' },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
            {
              name: 'purposeCtaText',
              type: 'text',
              defaultValue: 'Read Rescue Journal',
            },
            {
              name: 'purposeCtaLink',
              type: 'text',
              defaultValue: '#philosophy',
            },
            {
              name: 'purposeFootnote',
              type: 'text',
              defaultValue: 'Visitor access to shelter sanctuary by prior request.',
            },
          ],
        },
        {
          label: 'Booking Banner',
          fields: [
            {
              name: 'bookingBadge',
              type: 'text',
              defaultValue: 'Limited Daily Chalets',
            },
            {
              name: 'bookingHeading',
              type: 'text',
              defaultValue: 'Give Your Companion the Retreat They Deserve.',
            },
            {
              name: 'bookingDescription',
              type: 'textarea',
              defaultValue:
                'Due to our strict cage-free ratio and 1:3 dedicated staff care, chalets book quickly during weekends and holiday seasons. Schedule your introductory walk-through or reserve dates today.',
            },
            {
              name: 'bookingPrimaryCtaText',
              type: 'text',
              defaultValue: 'Reserve Suite Online',
            },
            {
              name: 'bookingPrimaryCtaLink',
              type: 'text',
              defaultValue: '#reserve-concierge',
            },
            {
              name: 'bookingSecondaryCtaText',
              type: 'text',
              defaultValue: 'Schedule Physical Walk-Through',
            },
            {
              name: 'bookingSecondaryCtaLink',
              type: 'text',
              defaultValue: 'tel:+919599908677',
            },
            {
              name: 'conciergeContact',
              type: 'text',
              defaultValue: 'Concierge Line: +91 95999 08677 • Alahawas, Sector 59, Gurugram',
            },
          ],
        },
        {
          label: 'Footer & Contact',
          fields: [
            {
              name: 'brandTagline',
              type: 'text',
              defaultValue: 'Sanctuary of Conscious Care',
            },
            {
              name: 'brandBio',
              type: 'textarea',
              defaultValue:
                'Where luxury meets heartfelt rescue care. Thoughtfully designed stays and authentic hospitality for every furry family member.',
            },
            {
              name: 'address',
              type: 'text',
              defaultValue: 'Alahawas, Sector 59, Gurugram, Haryana 122005',
            },
            {
              name: 'phone',
              type: 'text',
              defaultValue: '+91 95999 08677',
            },
            {
              name: 'hoursBoarding',
              type: 'text',
              defaultValue: '08:00 AM – 11:00 AM\n04:00 PM – 07:00 PM',
            },
            {
              name: 'hoursDaycare',
              type: 'text',
              defaultValue: '08:00 AM – 08:00 PM (Daily)',
            },
            {
              name: 'hoursDogPark',
              type: 'text',
              defaultValue: 'Exclusive Access by Prior Appointment',
            },
          ],
        },
      ],
    },
  ],
}