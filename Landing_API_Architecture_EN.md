# Landing Demo API — Architecture and Call Chain

[[]]

> Branch: `feature/merge-platform-v2` → Railway: `test.auto-margin.com`

---

## What it is

Public endpoint for the landing page `auto-margin.com`. Accepts a car description → calculates arbitrage margin → saves the car to the master_admin account → returns full EZ+ JSON.

---

## Endpoint

```
POST https://test.auto-margin.com/api/landing/demo/calculate
Content-Type: application/json

{ "input": "BMW 320d 2021...", "sourceCountry": "DE" }
// or
{ "car": { "brand": "BMW", "model": "320d", "year": 2021, ... }, "sourceCountry": "DE" }
```

Response: **SSE stream** (`text/event-stream`) with intermediate stages and a final `stage: "complete"`.

---

## What is returned (final event)

```json
{
  "stage": "complete",
  "success": true,
  "savedCarId": 15,
  "car": { "brand": "BMW", "model": "320d", "year": 2021, "mileage": 45000, "fuelType": "Diesel" },
  "sourcePriceEur": 28000,
  "eurToChfRate": 0.924,
  "ez": {
    "sourcePriceChf": 25872,
    "chPriceWithVat": 27967,
    "chPriceWithVatTax": 29086,
    "finalBuyingPriceChf": 31376,
    "sellingPriceB2C": 37700,
    "finalProfit1": 6324,
    "minPrice1": 28500,
    "profit1CHF": 6324,
    "profit1Percent": 20.1,
    "mobiledePrice1": 25000,
    "profit1DE": 800,
    "profit1DEPercent": 3.2,
    "asBeMinPrice1": 23500,
    "profit1BE": -300,
    "profit1BEPercent": -1.3
  },
  "markets": {
    "CH": { "targetPrice": 37900, "currency": "CHF", "profit": 6524, "profitPct": 17.2, "signal": "YES", "listings": { "min": 28500, "median": 37900, "max": 49900, "sampleSize": 20 } },
    "DE": { "targetPrice": 26500, "currency": "EUR", "profit": -1500, "profitPct": -5.4, "signal": "NO", "listings": {...} },
    "BE": { "targetPrice": 24000, "currency": "EUR", "profit": -4000, "profitPct": -14.3, "signal": "NO", "listings": {...} }
  },
  "recommendation": { "signal": "YES", "text": "Good deal for CH...", "bestMarket": "CH" },
  "sources": {
    "CH": "https://www.autoscout24.ch/lst/bmw/320d?...",
    "BE": "https://www.autoscout24.be/lst/bmw/320d?...",
    "DE": "https://www.autoscout24.de/lst/bmw/320d?..."
  }
}
```

---

## Signals (recommendation.signal)

| Signal     | Condition     | Meaning         |
| ---------- | ------------- | --------------- |
| `MUSTHAVE` | profit% ≥ 30% | Excellent deal  |
| `YES`      | profit% ≥ 20% | Good deal       |
| `MAYBE`    | profit% ≥ 10% | Borderline deal |
| `NO`       | profit% < 10% | Not recommended |

---

## Rate limit

- 5 requests / IP / hour
- On exceeding: HTTP 429 `{ "error": "Rate limit reached...", "limitReached": true }`

---

## What gets saved to the DB

Every successful request → a car in Cars under master_admin:

- `source = 'landing_demo'`
- `notes = 'Landing: IP @ YYYY-MM-DD'`
- `signal = 'YES'` / `'NO'` / etc.

The master admin sees these cars in their Cars list and can analyze them.

---
