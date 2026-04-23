import Image from "next/image";

import { Linkedin } from "lucide-react";

import { Link } from "@/i18n/navigation";

const boardMembers = [
  {
    name: "Kim N",
    company: "Developer",
    image: "/investors/4.webp",
  },
  {
    name: "Jessica K",
    company: "Vehicle Analyst",
    image: "/investors/5.webp",
  },
];

type OpenRole = {
  title: string;
  description: string;
  posted: string;
  updated: string;
  status: "Open";
  recruiterLinkedInHref: string;
  tags: string[];
};

const openRoles: OpenRole[] = [
  {
    title: "Sales (B2B)",
    description:
      "Own outbound and demos for dealers and sourcing teams. Help customers adopt AutoMargin and grow the pipeline from first touch to close.",
    posted: "Apr 2026",
    updated: "Apr 2026",
    status: "Open",
    recruiterLinkedInHref: "https://linkedin.com/company/auto-margin",
    tags: ["B2B", "Outbound", "Demos", "CRM"],
  },
  {
    title: "Backend Developer (Node.js)",
    description:
      "Build and scale APIs and data pipelines. Focus on reliability, performance, and clean interfaces for product and integrations.",
    posted: "Apr 2026",
    updated: "Apr 2026",
    status: "Open",
    recruiterLinkedInHref: "https://linkedin.com/company/auto-margin",
    tags: ["Node.js", "APIs", "Postgres", "Queues"],
  },
];

export function Investors() {
  return (
    <section className="container max-w-5xl py-12">
      <h2 className="text-foreground text-4xl font-medium tracking-wide">
        Board members
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {boardMembers.map((member) => (
          <div key={member.name} className="">
            <Image
              src={member.image}
              alt={member.name}
              width={120}
              height={120}
              className="object-cover"
            />
            <h3 className="mt-3 font-semibold">{member.name}</h3>
            <p className="text-muted-foreground">{member.company}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-foreground text-4xl font-medium tracking-wide">
          Open roles
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          We’re hiring. If you want to build AutoMargin with us:
        </p>
        <p className="mt-1 max-w-2xl">
          <a
            href="mailto:apply@auto-margin.com"
            className="text-foreground underline underline-offset-4"
          >
            Reach out at apply@auto-margin.com
          </a>
        </p>

        <div className="mt-8 space-y-4">
          {openRoles.map((role) => (
            <div
              key={role.title}
              className="border-border bg-card/20 rounded-2xl border p-6"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-foreground text-lg font-semibold">
                      <span className="md:hidden">
                        {role.title === "Backend Developer (Node.js)"
                          ? "Backend Developer"
                          : role.title}
                      </span>
                      <span className="max-md:hidden">{role.title}</span>
                    </h3>
                    <span className="bg-chart-1/15 text-chart-1 ring-chart-1/25 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1">
                      {role.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="text-muted-foreground flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 text-xs max-[380px]:flex-col max-[380px]:items-start max-[380px]:gap-y-1 md:justify-end">
                  <span className="tabular-nums max-[380px]:w-full">
                    Posted: {role.posted}
                  </span>
                  <div className="flex items-center gap-x-4 max-[380px]:w-full max-[380px]:justify-between">
                    <span className="tabular-nums">
                      Updated: {role.updated}
                    </span>
                    <Link
                      href={role.recruiterLinkedInHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center hover:opacity-80"
                      aria-label="Recruiter on LinkedIn"
                    >
                      <Linkedin className="size-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {role.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-muted/40 text-muted-foreground ring-border inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
