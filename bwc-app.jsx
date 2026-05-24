// bwc-app.jsx — mounts the ContentCore Studio landing page

function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <PainSection />
      <HowItWorksSection />
      <TechStackSection />
      <BeforeAfterSection />
      <TestimonialsSection />
      <PricingSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
