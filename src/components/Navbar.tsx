import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-foreground">Previon Seguridad</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#servicios" className="text-foreground hover:text-accent transition-colors">
              Servicios
            </a>
            <a href="#previon-gate" className="text-foreground hover:text-accent transition-colors">
              Previon Gate
            </a>
            <a href="#contacto" className="text-foreground hover:text-accent transition-colors">
              Contacto
            </a>
          </div>
          
          <Button variant="cta" size="lg">
            Solicitar Cotización
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
