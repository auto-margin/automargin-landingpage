import { DashedLine } from "@/components/dashed-line";

const stats = [
  {
    value: "2025",
    label: "Founded",
  },
  {
    value: "15+",
    label: "Years in industry",
  },
  {
    value: "Europe",
    label: "Dealers connected",
  },
  {
    value: "Swiss",
    label: "HQ & Network",
  },
];

export function AboutHero() {
  return (
    <section className="">
      <div className="container flex max-w-5xl flex-col justify-between gap-8 md:gap-20 lg:flex-row lg:items-center lg:gap-24 xl:gap-24">
        <div className="flex-[1.5]">
          <h1 className="text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Smart car deals with Automation
          </h1>

          <p className="text-muted-foreground mt-5 text-2xl md:text-3xl lg:text-4xl">
            Turn dealer insight into one automated tool.
          </p>

          <p className="text-muted-foreground mt-8 hidden max-w-lg space-y-6 text-lg text-balance md:block lg:mt-12">
            We've connected dealers across Europe and built our ground network
            in Switzerland. With over 15 years in the car industry, we took the
            best dealer insights—how they compare, how they find deals—and
            turned it into one automated tool. You get more than price
            difference: best brands, best dealers, country by country, and more.
            <br />
            <br />
            We started with an idea to automate manual work. We built AutoMargin
            around our best car dealer people—their insight, their way of
            comparing and finding the best deals. Combined into one fully
            automated system. This is just a little sneak peek of what we're
            building.
          </p>
        </div>

        <div
          className={`relative flex flex-1 flex-col justify-center gap-3 pt-10 lg:pt-0 lg:pl-10`}
        >
          <DashedLine
            orientation="vertical"
            className="absolute top-0 left-0 max-lg:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute top-0 lg:hidden"
          />
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <div className="font-display text-4xl tracking-wide md:text-5xl">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
