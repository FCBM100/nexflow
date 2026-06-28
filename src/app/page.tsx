import Hero from "@/components/sections/Hero";
import ProblemSolution from "@/components/sections/ProblemSolution";
import Services from "@/components/sections/Services";
import CaseStudy from "@/components/sections/CaseStudy";
import Stats from "@/components/sections/Stats";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="relative">
        <ProblemSolution />
      </section>
      <section className="relative">
        <Services />
      </section>
      <section className="relative">
        <CaseStudy />
      </section>
      <section className="relative">
        <Stats />
      </section>
      <section className="relative">
        <ProcessTimeline />
      </section>
      <section className="relative">
        <FinalCTA />
      </section>
      <Footer />
    </>
  );
}
