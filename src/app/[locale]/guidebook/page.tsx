import type { Metadata } from "next";

import { GuidebookPager } from "./guidebook-pager";

export const metadata: Metadata = {
  description:
    "Working reference for Auto-margin users covering overview, input quality, dealer outreach, and vehicle evaluation.",
};

export default function GuidebookPage() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <header className="not-prose border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
          General
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 md:text-4xl">
          Overview
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
          This guidebook is a working reference for Auto-margin users. It
          explains how the tool evaluates a vehicle, what input data produces
          reliable results, and how to interpret the output.
        </p>
      </header>

      <section className="mt-8">
        <h2>Sections in this guide</h2>
        <ul>
          <li>
            <strong>How to use optimally</strong> - required and recommended
            input data, the evaluation workflow, and how to read results.
          </li>
          <li>
            <strong>Find dealers</strong> - applicable to users conducting B2B
            outreach. Skip if selling direct to end customers.
          </li>
          <li>
            <strong>Is my car good?</strong> - a decision framework for
            evaluating individual vehicles.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2>Core principle</h2>
        <p>
          Auto-margin compares the vehicle being evaluated against live listings
          in a selected target market. The output is a market price band, a
          confidence level based on the number of comparable listings found, and
          - when an asking price is provided - a margin estimate.
        </p>
        <ol>
          <li>
            The quality of the output depends directly on the quality of the
            input. Incomplete vehicle data produces wide, less actionable price
            bands. Complete data produces tight, actionable ones.
          </li>
          <li>
            A wide price band reflects an actual wide market spread. It is
            information, not an error.
          </li>
        </ol>
      </section>

      <GuidebookPager
        nextHref="/guidebook/how-to-use"
        nextLabel="How to use optimally"
      />
    </article>
  );
}
