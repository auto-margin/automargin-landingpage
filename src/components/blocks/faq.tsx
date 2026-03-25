import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Product & How it works",
    questions: [
      {
        question: "What does AutoMargin do?",
        answer:
          "AutoMargin analyzes vehicle offers from emails, PDFs, Excel, and other formats. It compares supplier prices to live market data, calculates margins, and highlights the most profitable opportunities for you.",
      },
      {
        question: "How does it identify the best deals?",
        answer:
          "Our AI evaluates each offer against real-time market listings, computes resale margins, and ranks options based on your criteria. You get clear recommendations without manual spreadsheets.",
      },
      {
        question: "Which file types are supported?",
        answer:
          "PDF, Excel, Word, Google Sheets, and emails—including mixed formats in one batch. Our auto-forwarding handles the rest. Just send it and we parse it.",
      },
    ],
  },
  {
    title: "Pricing & Security",
    questions: [
      {
        question: "Who is AutoMargin for?",
        answer:
          "Independent dealers, trading companies, and B2B marketplaces who handle high volumes of offers and want faster, data-driven purchasing decisions.",
      },
      {
        question: "Is there a free trial?",
        answer:
          "Yes. Try AutoMargin with your own files first. After that, plans depend on volume and features. Book a demo and we'll tailor one for you.",
      },
      {
        question: "Is my data safe?",
        answer:
          "Absolutely. Your files are encrypted, processed in secure environments, and never shared with third parties.",
      },
    ],
  },
  {
    title: "Getting started",
    questions: [
      {
        question: "Can I trust the market prices?",
        answer:
          "Yes. We cross-check against live listings from AutoScout24, Mobile.de, and trusted European marketplaces. Data updates daily to reflect real-world price shifts.",
      },
      {
        question: "How do I get started?",
        answer:
          "Send your first offer via email and we'll walk you through the setup. Most users see results in under a minute.",
      },
    ],
  },
];

export const FAQ = ({
  headerTag = "h2",
  className,
  className2,
}: {
  headerTag?: "h1" | "h2";
  className?: string;
  className2?: string;
}) => {
  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className={cn("mx-auto grid gap-16 lg:grid-cols-2", className2)}>
          <div className="space-y-4">
            {headerTag === "h1" ? (
              <h1 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h1>
            ) : (
              <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h2>
            )}
            <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
              If you can't find what you're looking for,{" "}
              <Link href="/contact" className="underline underline-offset-4">
                get in touch
              </Link>
              .
            </p>
          </div>

          <div className="grid gap-6 text-start">
            {categories.map((category, categoryIndex) => (
              <div key={category.title} className="">
                <h3 className="text-muted-foreground border-b py-4">
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, i) => (
                    <AccordionItem key={i} value={`${categoryIndex}-${i}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
