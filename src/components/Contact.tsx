import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Contact = () => {
  const { settings } = useSiteSettings();
  const { contact_info } = settings;

  return (
    <section id="contacto" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Contáctanos</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos listos para proteger tu negocio. Solicita una cotización sin compromiso
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="p-8 bg-card border-border shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-6">Solicitar Cotización</h3>

            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Nombre</label>
                  <Input placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Empresa</label>
                  <Input placeholder="Nombre de tu empresa" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <Input type="email" placeholder="tu@email.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Teléfono</label>
                  <Input type="tel" placeholder="+56 9 XXXX XXXX" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Servicio de Interés</label>
                <Input placeholder="Guardias, Cámaras, Alarmas, Previon Gate..." />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Mensaje</label>
                <Textarea placeholder="Cuéntanos sobre tus necesidades de seguridad..." rows={4} />
              </div>

              <Button variant="cta" size="lg" className="w-full">Enviar Solicitud</Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 bg-card border-border hover:shadow-card transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Ubicación</h3>
                  <p className="text-muted-foreground">{contact_info.address}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border hover:shadow-card transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Teléfono</h3>
                  <p className="text-muted-foreground">
                    {contact_info.phone}
                    <br />
                    Línea de emergencia 24/7
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border hover:shadow-card transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Email</h3>
                  <p className="text-muted-foreground">{contact_info.email}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border hover:shadow-card transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Horario de Atención</h3>
                  <p className="text-muted-foreground">
                    Lunes a Viernes: 9:00 - 18:00
                    <br />
                    Sábado: 9:00 - 13:00
                    <br />
                    <span className="text-accent font-semibold">Emergencias: 24/7</span>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
