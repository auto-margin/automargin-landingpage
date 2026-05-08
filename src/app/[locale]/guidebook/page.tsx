import type { Metadata } from "next";

import { GuidebookArticle } from "./_shared/guidebook-article";
import { GuidebookPager } from "./guidebook-pager";

export const metadata: Metadata = {
  description:
    "Working reference for Auto-margin users covering overview, input quality, dealer outreach, and vehicle evaluation.",
};

export default function GuidebookPage() {
  return (
    <GuidebookArticle
      sectionLabel="General"
      title="Overview"
      description="This guidebook is a working reference for Auto-margin users. It explains how the tool evaluates a vehicle, what input data produces reliable results, and how to interpret the output."
    >
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
    </GuidebookArticle>
  );
}
