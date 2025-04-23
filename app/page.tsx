import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import StatisticsSection from "@/components/statistics-section"
import GallerySection from "@/components/gallery-section"
import NewsSection from "@/components/news-section"
import CTASection from "@/components/cta-section"
import FeedbackSection from "@/components/feedback-section"
import AIAssistantSection from "@/components/ai-assistant-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatisticsSection />
      <FeaturesSection />
      <GallerySection />
      <TestimonialsSection />
      <NewsSection />
      <AIAssistantSection />
      <FeedbackSection />
      <CTASection />
      <Footer />
    </main>
  )
}
