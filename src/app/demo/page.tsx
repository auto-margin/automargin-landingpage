import { Calculator } from "lucide-react";

import { Background } from "@/components/background";
import { DemoFileDropzone } from "@/components/demo-file-dropzone";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function DemoPage() {
  return (
    <Background>
      <section className="py-28 lg:py-32 lg:pt-44">
        <div className="container max-w-4xl">
          <header className="text-center">
            <p className="text-primary mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
              Live profit demo
            </p>
            <h1 className="text-foreground text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Try AutoMargin on a real car offer.
            </h1>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-sm md:text-base">
              Describe any car you&apos;re considering and we&apos;ll show you
              how AutoMargin could analyze its profit potential using live
              market data from major leading marketplaces.
            </p>
          </header>

          <div className="bg-card/80 mt-10 rounded-3xl border p-5 shadow-sm md:mt-14 md:p-8 lg:p-10">
            <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-full">
                  <Calculator className="size-5" />
                </span>
                <div>
                  <h2 className="text-base font-semibold md:text-lg">
                    Profit calculator
                  </h2>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    Free demo — 1 car per visitor. No signup needed.
                  </p>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <DemoFileDropzone />
              <div className="flex items-center gap-3">
                <span className="bg-border h-px flex-1" />
                <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  or
                </span>
                <span className="bg-border h-px flex-1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="car-description" className="text-foreground">
                  Car description
                </Label>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Describe a car and see how we&apos;d analyze the deal.
                </p>
                <Textarea
                  id="car-description"
                  rows={4}
                  placeholder="e.g. BMW X5 2020 30d xDrive, 85,000 km, diesel, automatic, asking price 32,000 EUR"
                  maxLength={500}
                  className="resize-none"
                />
                <p className="text-muted-foreground text-xs">
                  Add as much detail as you can — mileage, fuel type, trim,
                  optional extras, asking price.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
                <div className="space-y-2">
                  <Label htmlFor="source-country" className="text-foreground">
                    Source country
                  </Label>
                  <Select defaultValue="DE">
                    <SelectTrigger
                      id="source-country"
                      className="w-full max-w-[220px]"
                    >
                      <SelectValue placeholder="Choose country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DE">DE — Germany</SelectItem>
                      <SelectItem value="CH">CH — Switzerland</SelectItem>
                      <SelectItem value="AT">AT — Austria</SelectItem>
                      <SelectItem value="PL">PL — Poland</SelectItem>
                      <SelectItem value="EU">Other EU</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-xs md:text-sm">
                    We compare your car against live listings from multiple
                    marketplaces to estimate realistic resale price and margin.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-muted-foreground text-xs md:text-sm">
                  This is a demo. For a real analysis with live data, book a
                  call with our team.
                </p>
                <Button type="button" className="mt-1 w-full sm:mt-0 sm:w-auto">
                  Calculate your profit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Background>
  );
}
