# Project Overview

## About the Project

Svantaraa is a marketing website for a cage-free luxury pet retreat in Gurugram. The retreat is a single location in Alahawas, Sector 59, and the public site is written for dog parents.

Parents can read the sanctuary story, compare services such as suite stays, daycare, and park access, and open a third-party booking link from a service card. The site does not take bookings, payments, or customer accounts. Booking is completed on the external service.

Staff edit page copy and images from a Payload CMS admin. That admin is the only internal application. It keeps the homepage, the founder story, contact details, services, testimonials, and FAQs up to date without a code change.

---

## The Problem It Solves

A retreat website that staff cannot edit goes stale, and a website that also tries to own inventory, payments, and reservations duplicates a booking system the business already uses.

Svantaraa keeps the public site and the booking service separate. Parents get a clear picture of the sanctuary and a direct path to book. Staff update words, photos, service cards, and booking links from one admin, and they read contact inquiries in the same place.

---

## Applications

```
Customer Website
→ Homepage
→ Founder story
→ Contact and inquiries
→ Service cards with third-party booking links

Content Admin
→ Homepage content and images
→ About page content and images
→ Contact page content
→ Services
→ Testimonials
→ FAQs
→ Inquiries
→ Media
→ Users
```

---

## Customer Pages

```
/          → Homepage
/about     → Founder story
/contact   → Address, phone, hours, and inquiry form
```

The homepage carries the sanctuary introduction, services, testimonials, and FAQs. The About page is a separate founder story. It does not repeat the homepage sections.

---

## Admin Areas

```
Homepage
About
Contact
Services
Testimonials
FAQs
Inquiries
Media
Users
```

---

## Navigation

### Customer Website

Top navigation with a clean and mobile-friendly layout.

Primary navigation:

```
Services
About Us
Contact
```

Services moves the visitor to the services section on the homepage. About Us and Contact open their own pages.

A Reserve action in the header also moves the visitor to the services section. Each service card opens its own third-party booking link.

### Content Admin

Sidebar navigation organized by page content, collections, and inquiries.

---

## Core User Flow

### Parent Journey

- Parent opens the homepage and reads the sanctuary introduction
- Compares services, prices, and what each offering includes
- Opens a service card’s booking link
- Completes the booking on the third-party service
- Can open the founder story or send an inquiry without creating an account

### Service Booking

- Parent reviews a service card on the homepage
- Selects the card’s booking action
- Leaves this site for the third-party booking service
- Completes dates, payment, and confirmation there
- This site does not create a reservation, hold inventory, or record the booking

### Founder Story

- Parent opens About from the navigation
- Reads the founder story, which is separate content from the homepage
- Returns to the homepage or contact page

### Contact Inquiry

- Parent opens the contact page
- Sees the address, phone, and hours
- Submits name, email, phone, and message
- The inquiry is saved for staff to read in the admin

### Content Workflow

- Staff edit homepage, about, and contact copy and images
- Staff update service details and each service’s booking link
- Staff publish testimonials and FAQs
- Staff read contact inquiries and respond outside the site

---

## Data Architecture

### Page Content

- Homepage copy and images
- About page founder story
- Contact details: address, phone, and hours

### Service Content

- Services
- Price and what is included
- External booking URL on each service

### Supporting Content

- Testimonials, written and published by staff
- FAQs
- Media

### Operational Data

- Contact inquiries
- Admin users

This site does not store guest profiles, bookings, payments, or availability.

---

## Features In Scope

### Customer Website

- Homepage with editable sanctuary content
- Service cards with price and a third-party booking link
- About page for the founder story
- Contact page with address, phone, and hours
- Inquiry form
- Staff-authored testimonials
- FAQs
- Mobile-friendly navigation

### Content Admin

- Edit homepage, about, and contact content and images
- Manage services and their booking links
- Manage testimonials and FAQs
- Read saved inquiries
- Manage media and admin users

---

## Features Out of Scope

- In-app booking or checkout
- Availability, reservation holds, or inventory
- Payments, deposits, or refunds
- Customer accounts or login
- Booking confirmation emails sent by this site
- Multiple properties or locations
- Native mobile applications
- Public review submission
- Multi-language support
- Multi-currency support

---

## Target Users

### Pet Parents

Dog parents who want to:

- Understand how the sanctuary cares for dogs
- Compare suite stays, daycare, and park access
- Book through the linked third-party service
- Read the founder story
- Ask a question from the contact page

### Staff

People responsible for the public site who:

- Update page copy and images
- Keep service cards and booking links current
- Publish testimonials and FAQs
- Read and follow up on inquiries

---

## Success Criteria

### Customer Experience

- Parents can understand the retreat and its services from the homepage.
- Every service card can open the correct third-party booking link.
- The founder story is available on its own page, separate from the homepage.
- Parents can send an inquiry without creating an account.

### Content Operations

- Staff can update the three public pages from the admin without a code change.
- A new or changed booking link appears on the matching service card.
- A contact submission is stored and visible to staff in the admin.
