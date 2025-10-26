import { Card } from "@/components/ui/card";
import { Shield, Camera, Bell } from "lucide-react";
import securityGuardImage from "@/assets/security-guard.jpg";

const Services = () => {
  const services = [
    {
      icon: Shield,
      title: "Guardias de Seguridad",
      description: "Personal altamente capacitado y certificado para proteger tus instalaciones las 24 horas del día.",
      features: ["Personal certificado", "Turnos flexibles", "Informes detallados"]
    },
    {
      icon: Camera,
      title: "Sistemas de Cámaras",
      description: "Tecnología de vigilancia de última generación con monitoreo remoto y grabación en alta definición.",
      features: ["HD 4K", "Visión nocturna", "Acceso remoto"]
    },
    {
      icon: Bell,
      title: "Alarmas de Seguridad",
      description: "Sistemas inteligentes de alarma conectados a nuestra central de monitoreo para respuesta inmediata.",
      features: ["Monitoreo 24/7", "Respuesta rápida", "App móvil"]
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Soluciones integrales de seguridad adaptadas a las necesidades de tu empresa
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 bg-card border-border"
            >
              <service.icon className="h-12 w-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Image Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-elevated">
          <img 
            src={securityGuardImage} 
            alt="Guardia de seguridad profesional monitoreando sistemas de vigilancia"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl">
                <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Tecnología y Experiencia
                </h3>
                <p className="text-xl text-primary-foreground/90 mb-6">
                  Combinamos años de experiencia con las últimas tecnologías para brindarte 
                  la mejor protección posible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
