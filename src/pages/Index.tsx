import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PrevionGate from "@/components/PrevionGate";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Index = () => {
  const { settings, loading } = useSiteSettings();
  if (loading) return <div className="min-h-screen" />;
  const v = settings.sections_visibility;
  return (
    <div className="min-h-screen">
      <Navbar />
      {v.hero && <Hero />}
      {v.services && <Services />}
      {v.previon_gate && <PrevionGate />}
      {v.contact && <Contact />}
      <Footer />
    </div>
  );
};

export default Index;
