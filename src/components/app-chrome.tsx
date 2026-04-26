"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/blocks/footer";
import { Navbar } from "@/components/blocks/navbar";
import { AliceChatbot } from "@/features/alice/alice-chatbot";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = pathname.includes("/guidebook");

  return (
    <>
      {hideChrome ? null : <Navbar />}
      <main>{children}</main>
      {hideChrome ? null : <Footer />}
      {hideChrome ? null : <AliceChatbot />}
    </>
  );
}
