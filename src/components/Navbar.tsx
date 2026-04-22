import { Button } from "@/components/ui/button";
import previonLogo from "@/assets/previon-logo.png";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Navbar = () => {
  const { settings } = useSiteSettings();
  const v = settings.sections_visibility;

  return (
    <nav className="fixed top-0 w-full z-50 bg-background backdrop-blur-md border-b border-border shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center gap-3">
            <img src={previonLogo} alt="Previon Seguridad" className="h-20 w-auto" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {v.services && (
              <a href="#servicios" className="text-foreground hover:text-accent transition-colors">
                Servicios
              </a>
            )}
            {v.previon_gate && (
              <a href="#previon-gate" className="text-foreground hover:text-accent transition-colors">
                Previon Gate
              </a>
            )}
            {v.contact && (
              <a href="#contacto" className="text-foreground hover:text-accent transition-colors">
                Contacto
              </a>
            )}
          </div>

          <Button variant="cta" size="lg">
            {settings.button_labels.nav_cta}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
