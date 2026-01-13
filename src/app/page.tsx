import Hero from "@/src/components/landing/Hero";
import Features from "@/src/components/landing/Features";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
    </div>
  )
}
