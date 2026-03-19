import { BentoDemoSection } from "./bento-demo-section";

import { Background } from "@/components/background";
import { FAQ } from "@/components/blocks/faq";
import { Features } from "@/components/blocks/features";
import { Hero } from "@/components/blocks/hero";
import { Pricing } from "@/components/blocks/pricing";
import { Testimonials } from "@/components/blocks/testimonials";

export default function Home() {
  return (
    <>
      <Background className="via-muted to-muted/80">
        <Hero />
        {/* <Logos /> */}
        {/* <ResourceAllocation /> */}
        <BentoDemoSection />
        <Features />
      </Background>
      <Background variant="bottom">
        <Pricing />
        <Testimonials />
        <FAQ />
      </Background>
    </>
  );
}
