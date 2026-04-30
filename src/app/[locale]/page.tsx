import { BentoDemoSection } from "../bento-demo-section";
import "@/styles/motion.css";

import { Background } from "@/components/background";
import { FAQ } from "@/components/blocks/faq";
import { Features } from "@/components/blocks/features";
import { Hero } from "@/components/blocks/hero";
import { TopMarketsSection } from "@/components/blocks/top-markets-section";
import { HomeDeferredSections } from "@/components/home-deferred-sections";

export default function Home() {
  return (
    <>
      <Background className="via-muted to-muted/80">
        <Hero />
        <BentoDemoSection />
        <Features />
        <TopMarketsSection />
      </Background>
      <Background variant="bottom">
        <HomeDeferredSections />
        <FAQ homeHeader />
      </Background>
    </>
  );
}
