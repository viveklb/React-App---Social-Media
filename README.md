# Social

A small responsive React app with a post feed and individual post pages.

## Run locally

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

Uses React Router for `/` and `/item/:id`, and Redux Toolkit's built-in Redux Thunk middleware to fetch JSONPlaceholder posts. Redux tracks loading, success, and errors. Includes loading placeholders, retry, missing-post handling, and Picsum images.

## Deploy

Push this folder to a GitHub repository. Import the repository in Vercel (Vite preset) or Netlify. Build command: `npm run build`. Output folder: `dist`. SPA routing files for both services are included, so detail links work on refresh.

The supplied Figma file could not be accessed with the connected account; this implementation uses a simple independent design.
