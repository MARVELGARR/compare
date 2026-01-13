import Hero from "@/src/components/landing/Hero";
import Features from "@/src/components/landing/Features";
import Header from "@/src/components/landing/Header";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen overflow-y-auto no-scrollbar">
      <Header />
      <Hero />
      <Features />
    </div>
  )
}
