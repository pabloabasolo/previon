import { Card } from "@/components/ui/card";
import { Shield, Camera, Bell, LucideIcon } from "lucide-react";
import previonGuardImage from "@/assets/previon-guard.jpg";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const ICONS: Record<string, LucideIcon> = { Shield, Camera, Bell };

const Services = () => {
  const { settings } = useSiteSettings();
  const sc = settings.services_content;

  return (
    <section id="servicios" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {sc.section_title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {sc.section_subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {sc.items.map((service, index) => {
            const Icon = ICONS[service.icon] ?? Shield;
            return (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 bg-card border-border"
              >
                {service.image && (
                  <div className="w-full h-48 overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-8">
                  <Icon className="h-12 w-12 text-accent mb-6" />
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
                </div>
              </Card>
            );
          })}
        </div>

        {/* Image Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-elevated">
          <img
            src={sc.banner_image || previonGuardImage}
            alt="Guardia de seguridad Previon"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl">
                <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  {sc.banner_title}
                </h3>
                <p className="text-xl text-primary-foreground/90 mb-6">
                  {sc.banner_text}
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
