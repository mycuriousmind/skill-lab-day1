# Swojas portfolio

This portfolio is a React + TypeScript + Vite site. It uses Tailwind CSS v4 for its build integration, Motion for small interface transitions, and React Three Fiber / Three.js for the hero and object explorer.

## Run locally

```sh
npm ci
npm run dev
```

Create and preview a production build with:

```sh
npm run build
npm run preview
```

## Personalize

Update `src/portfolio.ts` to edit the introduction, learning notes, skills, project descriptions, journey entries, email, and optional profile links. Keep projects marked as concepts until they exist; add real demo and repository URLs only when available. Skills are intentionally limited to the experience currently listed.

The contact form validates locally and opens a prefilled email draft. Set `portfolio.email` to a real address to enable it; the message is not sent by this website.

## Deploy

Deploy the `portfolio` app with a static host that supports Vite. Use `npm run build` and publish the generated `dist/` directory. No backend or environment secrets are required.
