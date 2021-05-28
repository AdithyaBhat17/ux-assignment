### Quality Feed & Gardening Company

Please go through the UX Case study at [https://www.notion.so/adithyanr/Case-Study-9e60d782c8174e9e8e145ada8c3bb442](https://www.notion.so/adithyanr/Case-Study-9e60d782c8174e9e8e145ada8c3bb442) before checking this source code.

This repository contains the source code for Quality Feed & Gardening company's website (mock). 

Visit [https://softway-ux.adithyabhat.com](https://softway-ux.adithyabhat.com) to test the site live. You can access the admin portal using [https://softway-ux.adithyabhat.com/admin](https://softway-ux.adithyabhat.com/admin). 

## Pre-requisites

1. Node.js runtime (>14.x)
2. A Node Package Manager (Yarn, NPM or PNPM)
3. A Terminal.

## Setup Guide

Create a DB on [https://supabase.io](https://supabase.io) with the following schema - 

![db schema](https://user-images.githubusercontent.com/20818481/120028493-63214080-c012-11eb-997e-0b27850130da.png)


Copy the contents of `.env.local.example` to `.env.local` and fill the values for the environment variables from your supabase account.

Then, run the following commands.

```bash
git clone https://github.com/adithyabhat17/ux-assignment
cd ux-assignment
code . #open VS Code
yarn install && yarn dev #Install dependencies and start the server.
```

### Libraries used

- [Next.js (A React Framework)](https://nextjs.org)
- [TypeScript](http://typescriptlang.org)
- [Chakra UI](http://chakra-ui.com)
- [Supabase SDK](https://supabase.io)

### Future Enhancements

- [ ]  Authentication & Authorization for admins.
- [ ]  Better Sitemap
- [ ]  Better marketing page
- [ ]  Way for users to request new products
- [ ]  Reminders to stock up on products with very less count.
- [ ]  Search functionality to access products quickly.
- [ ]  A/B test with emails.
- [ ]  Facebook Messenger Chatbot.
