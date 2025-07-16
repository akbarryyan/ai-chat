import React from "react";
import {
  Header,
  HeroSection,
  FeaturesSection,
  TestimonialsSection,
  StatsSection,
  CTASection,
  Footer,
  BackgroundElements,
} from "../components/landing";

const LandingPage = () => {
  return (
    <div
      id="home"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <BackgroundElements />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
