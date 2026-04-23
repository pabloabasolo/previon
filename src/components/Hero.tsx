import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-security.jpg";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Hero = () => {
  const { settings } = useSiteSettings();
  const { hero_content, button_labels } = settings;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/75" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in">
            {hero_content.title_part1} <span className="text-accent">{hero_content.title_highlight}</span>
          </h1>

          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl">
            {hero_content.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="cta"
              size="lg"
              className="text-lg"
              onClick={() =>
                document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {button_labels.hero_primary}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="hero"
              size="lg"
              className="text-lg"
              onClick={() =>
                document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {button_labels.hero_secondary}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-accent/30">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">15+</div>
              <div className="text-primary-foreground/80">Años de Experiencia</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-primary-foreground/80">Clientes Satisfechos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-primary-foreground/80">Monitoreo Continuo</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
