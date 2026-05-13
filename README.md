# MiniMart - Dynamic Next.js E-commerce Website

A small, professional, beginner-friendly e-commerce project built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **MongoDB**, and **Mongoose**. It includes a complete admin panel where site content can be controlled from MongoDB.

## Features

- Home, shop, product details, cart, checkout, login/register, and contact pages
- Sticky header, hero banner, featured products, categories, promotional section, and footer
- Admin dashboard with analytics cards
- Add, edit, and delete products
- Add, edit, and delete categories
- Dynamic site settings:
  - Logo URL and website name
  - Primary and secondary colors
  - Hero title, hero text, and hero image
  - Promotional content
  - Footer text
  - Contact email, phone, and address
  - Basic SEO title and description
- Simple JWT admin authentication with an HTTP-only cookie
- Single-project structure that deploys cleanly to Vercel

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Next.js API Routes / Route Handlers
- MongoDB + Mongoose
- JWT + bcryptjs

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Admin Login

1. Add these variables to `.env.local`:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-this-password
JWT_SECRET=replace-with-a-long-random-secret
MONGODB_URI=your-mongodb-uri
```

2. Visit `http://localhost:3000/admin/login`.
3. Log in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
4. The first successful login automatically creates the admin user in MongoDB.

## Deployment on Vercel

1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Add environment variables from `.env.example` in Vercel Project Settings.
4. Deploy with the default settings:
   - Build command: `npm run build`
   - Install command: `npm install`
   - Output: Next.js default

## Notes for Practice

- Product images and logos are URL-based to avoid storage complexity.
- Demo fallback data appears if MongoDB is not configured, so the public site is easy to preview.
- Admin create/update/delete operations require MongoDB.
