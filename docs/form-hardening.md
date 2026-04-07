# Form Hardening Setup

This project applies layered anti-abuse checks for contact submissions.

## Required environment variables

Set these in Vercel for both Preview and Production:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `BACKEND_CONTACT_URL`

Local development can use `.env.example` as a template.

## What is protected

- Contact form: rate-limited + honeypot + minimum human submit time

## Current limits

- Contact: `5 / 10m` and burst `2 / 30s`

## Validation checklist

1. Normal submit works for contact
2. Rapid repeated submits return a friendly rate-limit message
3. Honeypot field filled -> submission blocked
4. Instant submit (too fast) -> submission blocked
5. `npm run lint` and `npm run build` pass
