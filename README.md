# Scotia One

A mobile-first web application prototype of **Scotia One** — a feature embedded inside the Scotiabank app that uses real banking transaction data to surface investable surplus ("Money Moments") and continuously recalibrate the user's investment portfolio based on their actual financial behaviour (the "Living Risk Profile").

## Tech Stack

- **React 18** (Vite)
- **Tailwind CSS v4**
- **Framer Motion** — animations
- **Recharts** — portfolio charts
- **Lucide React** — icons
- **React Router v6** — routing

## Getting Started

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Production Build

```bash
npm run build
npm run preview
```

## Features

- **Home Dashboard** — Net worth, balances, AI-powered Money Moment cards
- **Money Moment Detail** — Full insight breakdown with TFSA room check
- **Confirmation** — Animated success with real-time balance updates + confetti
- **Portfolio View** — TFSA growth chart, holdings, risk profile alerts
- **Moments History** — Timeline of all AI-detected savings opportunities
- **Living Risk Profile** — Dynamic risk assessment based on actual behaviour

## Demo Flow

1. Open Home → see the Money Moment card
2. Tap to review details
3. Confirm the $25 investment
4. Watch balances update in real time
5. Explore History and Risk Profile screens
