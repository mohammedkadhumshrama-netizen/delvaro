/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { TrustMarquee } from "./components/TrustMarquee";
import { SocialProof } from "./components/SocialProof";
import { ServicesSection } from "./components/ServicesSection";
import { ProcessSection } from "./components/ProcessSection";
import { FlowDiagram } from "./components/FlowDiagram";
import { FeaturesSection } from "./components/FeaturesSection";
import { CaseStudies } from "./components/CaseStudies";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { ComparisonSection } from "./components/ComparisonSection";
import { FAQSection } from "./components/FAQSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { ExitIntentModal } from "./components/ExitIntentModal";
import { BookingModal } from "./components/BookingModal";
import { DemoModal } from "./components/DemoModal";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-accent/30 tracking-tight">
      <Navbar />
      <ExitIntentModal />
      <BookingModal />
      <DemoModal />
      
      <main className="flex-1">
        <HeroSection />
        <TrustMarquee />
        <SocialProof />
        <ServicesSection />
        <ProcessSection />
        <FlowDiagram />
        <FeaturesSection />
        <CaseStudies />
        <WhyChooseUs />
        <ComparisonSection />
        <FAQSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}
