# Jobify

A website which built by Nextjs, to help people and also improve my full stack skills.

## Technical details

- **Generation**: Next.js and App Router
- **Style**: Tailwind CSS and ShadcnUI
- **Chart**: Rechart
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authorization**: Clerk

## What is this?

Jobify simplifies your job search by helping you manage and track your application progress. With features to organize your applications and provide detailed status analytics, Jobify ensures you stay on top of your job hunt. Sign up today and streamline your path to the perfect job with Jobify!

You can try this website on this [Vercel Site](https://jobify-nine-tau.vercel.app/)

## Setup

### 1. Installation

```bash
npm install
```

### 2. Set up Environment Variables

You need to create a `.env.local` file in the root directory, and then create your own environment variables below, where the database I recommend using Supabase for hosting.

#### `.env.local`

```ts
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
DATABASE_URL=""
DIRECT_URL=""
```

#### `.env`

In order to ensure compatibility, create an `.env` file in the root directory and create the following environment variables

```ts
DATABASE_URL=""
DIRECT_URL=""
```

### 3. Quick start

```bash
npm run dev
```







