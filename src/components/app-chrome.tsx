"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { Footer } from "@/components/blocks/footer";
import { Navbar } from "@/components/blocks/navbar";

const AliceChatbot = dynamic(
  () => import("@/features/alice/alice-chatbot").then((m) => m.AliceChatbot),
  { ssr: false },
);

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
