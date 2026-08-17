import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectsBrowser from "@/components/ProjectsBrowser";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Aurum Design Studio'nun villa, konut iç mekânı, ticari mekân, cephe ve 3D görselleştirme işlerinin tamamı.",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Suspense fallback={<div className="pt-[52px] px-5 py-24 text-[12px] opacity-50">Yükleniyor…</div>}>
          <ProjectsBrowser />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
