import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { NewsSection } from "@/components/news-section"
import { StatisticsSection } from "@/components/statistics-section"
import { GallerySection } from "@/components/gallery-section"
import { CtaSection } from "@/components/cta-section"
import { AiAssistantSection } from "@/components/ai-assistant-section"
import { IntroAnimationWrapper } from "@/components/intro-animation-wrapper"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <IntroAnimationWrapper>
        <HeroSection />
        <FeaturesSection />
        <StatisticsSection />
        <TestimonialsSection />
        <GallerySection />
        <NewsSection />
        <AiAssistantSection />
        <CtaSection />
      </IntroAnimationWrapper>
    </div>
  )
}
