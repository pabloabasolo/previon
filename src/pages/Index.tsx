import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
// import PrevionGate from "@/components/PrevionGate"; // Oculto temporalmente - activar cuando la app esté lista
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      {/* <PrevionGate /> */}
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
