import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const categories = [
  {
    key: "product",
    questions: ["what", "identify", "files"],
  },
  {
    key: "pricing",
    questions: ["audience", "trial", "security"],
  },
  {
    key: "gettingStarted",
    questions: ["prices", "start"],
  },
] as const;

const EMAIL = "to@auto-margin.com";

export const FAQ = ({
  headerTag = "h2",
  className,
  className2,
  homeHeader = false,
}: {
  headerTag?: "h1" | "h2";
  className?: string;
  className2?: string;
  homeHeader?: boolean;
}) => {
  const t = useTranslations("FAQ");
  const title = homeHeader ? t("homeTitle") : t("title");

  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className={cn("mx-auto grid gap-16 lg:grid-cols-2", className2)}>
          <div className="space-y-4">
            {headerTag === "h1" ? (
              <h1 className="text-2xl tracking-tight whitespace-pre-line md:text-4xl lg:text-5xl">
                {title}
              </h1>
            ) : (
              <h2 className="text-2xl tracking-tight whitespace-pre-line md:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {homeHeader ? (
              <div className="space-y-5">
                <p className="text-muted-foreground max-w-md leading-snug whitespace-pre-line lg:mx-auto">
                  {t("homeDescription")}
                </p>
                <Button variant="outline" asChild>
                  <a href={`mailto:${EMAIL}`}>{t("homeEmailCta")}</a>
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
                {t("contactPrefix")}{" "}
                <Link href="/contact" className="underline underline-offset-4">
                  {t("contactLink")}
                </Link>
                .
              </p>
            )}
          </div>

          <div className="grid gap-6 text-start">
            {categories.map((category, categoryIndex) => (
              <div key={category.key} className="">
                <h3 className="text-muted-foreground border-b py-4">
                  {t(`categories.${category.key}.title`)}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, i) => (
                    <AccordionItem key={item} value={`${categoryIndex}-${i}`}>
                      <AccordionTrigger>
                        {t(`categories.${category.key}.questions.${item}.q`)}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {t(`categories.${category.key}.questions.${item}.a`)}
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
