# la3oasa 🍔🌀🚀

**لغوصة - تجربة أكل مصرية بريميوم 🍟**

## 🌐 Live Website (رابط الموقع الحي)
### [la3oasa.vercel.app](https://la3oasa.vercel.app/)

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Appwrite Backend Setup 🚀

This project uses **Appwrite Cloud** for order management and image storage.

### Environment Variables

Before deploying or running locally, make sure to set up the following environment variables (defined in `.env.local` for local development):

```bash
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id
NEXT_PUBLIC_APPWRITE_BUCKET_ID=your_bucket_id
```

> [!IMPORTANT]
> **Project Isolation (Free Plan Tips):**
> If you are running multiple websites within the same Appwrite Project, make sure each website has its own **Unique Database ID** and **Unique Bucket ID**. This prevents data overlap and keeps your orders separated.

### Deploy on Vercel

1. Push your code to GitHub.
2. Link your repository to a new project on **Vercel**.
3. Add the **Environment Variables** above in the Vercel project settings.
4. Deploy! 🚀

---
🌀 **Laghwasa - Premium Egyptian Food Experience** 🌀
