This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Hosted App

[https://tymex-interview-frontend-florian-bar.vercel.app](https://tymex-interview-frontend-florian-bar.vercel.app)

## Getting Started

1. Duplicate the `.env.example` file and rename it to `.env`.
2. Run `npm i` to install all dependencies.
3. Run `npm run dev` to start the development server.
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Design Decisions

- I used an API route in Next.js to mock a server `app/api/users/route.ts`. This simulates a real-world scenario where data is fetched from a remote server.
- I used `useInfiniteQuery` from `@tanstack/react-query` to handle pagination and lazy loading. It also caches previous resuts based on provided query keys.
- For the user images, I created two utility functions to return a random image and background color `utils/images.ts`.
