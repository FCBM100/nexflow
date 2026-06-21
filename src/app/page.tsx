import Hero from "@/components/sections/Hero";
import ProblemSolution from "@/components/sections/ProblemSolution";
import Services from "@/components/sections/Services";
import CaseStudy from "@/components/sections/CaseStudy";
import Stats from "@/components/sections/Stats";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import ParallaxBlob from "@/components/ui/ParallaxBlob";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="relative">
        <ParallaxBlob
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #00E5FF, transparent 70%)" }}
          speed={0.1}
        />
        <ProblemSolution />
      </section>
      <section className="relative">
        <ParallaxBlob
          className="absolute top-0 right-1/4 w-80 h-80 rounded-full opacity-[0.02]"
          style={{ background: "radial-gradient(circle, #0099FF, transparent 70%)" }}
          speed={-0.08}
        />
        <Services />
      </section>
      <section className="relative">
        <ParallaxBlob
          className="absolute top-0 left-1/3 w-72 h-72 rounded-full opacity-[0.025]"
          style={{ background: "radial-gradient(circle, #00E5FF, transparent 70%)" }}
          speed={0.12}
        />
        <CaseStudy />
      </section>
      <section className="relative">
        <ParallaxBlob
          className="absolute top-0 right-1/3 w-64 h-64 rounded-full opacity-[0.02]"
          style={{ background: "radial-gradient(circle, #0099FF, transparent 70%)" }}
          speed={-0.1}
        />
        <Stats />
      </section>
      <section className="relative">
        <ParallaxBlob
          className="absolute top-0 left-1/2 w-88 h-88 rounded-full opacity-[0.02]"
          style={{ background: "radial-gradient(circle, #00E5FF, transparent 70%)" }}
          speed={0.09}
        />
        <ProcessTimeline />
      </section>
      <section className="relative">
        <ParallaxBlob
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #0099FF, transparent 70%)" }}
          speed={-0.07}
        />
        <FinalCTA />
      </section>
      <Footer />
    </>
  );
}
