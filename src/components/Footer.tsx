import previonLogo from "@/assets/previon-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12 border-t border-accent/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img src={previonLogo} alt="Previon - Prevención Inteligente" className="h-16 w-auto brightness-0 invert" />
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Empresa líder en seguridad privada en Talca. Prevención inteligente para proteger 
              lo que más valoras con tecnología de punta y personal altamente capacitado.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Servicios</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="#servicios" className="hover:text-accent transition-colors">
                  Guardias de Seguridad
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-accent transition-colors">
                  Sistemas de Cámaras
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-accent transition-colors">
                  Alarmas de Seguridad
                </a>
              </li>
              <li>
                <a href="#previon-gate" className="hover:text-accent transition-colors">
                  Previon Gate
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Talca, Chile</li>
              <li>contacto@previon.cl</li>
              <li>+56 9 XXXX XXXX</li>
              <li className="text-accent font-semibold">24/7 Emergencias</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/60">
          <p>© {currentYear} Previon Seguridad. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
