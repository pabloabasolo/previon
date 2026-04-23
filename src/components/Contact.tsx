import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xbdqpppq";

const contactSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido").max(100),
  company: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().max(30).optional(),
  service: z.string().trim().max(150).optional(),
  message: z.string().trim().min(1, "El mensaje es requerido").max(1000),
});

const Contact = () => {
  const { settings } = useSiteSettings();
  const { contact_info } = settings;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: "Datos inválidos",
        description: parsed.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          _subject: `Nueva solicitud de cotización - ${parsed.data.name}`,
        }),
      });

      if (!res.ok) throw new Error("Error al enviar");

      toast({
        title: "¡Solicitud enviada!",
        description: "Nos pondremos en contacto contigo a la brevedad.",
      });
      setForm({ name: "", company: "", email: "", phone: "", service: "", message: "" });
    } catch {
      toast({
        title: "Error al enviar",
        description: "Inténtalo nuevamente o escríbenos directamente a " + contact_info.email,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Nombre</label>
                  <Input name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Empresa</label>
                  <Input name="company" value={form.company} onChange={handleChange} placeholder="Nombre de tu empresa" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Teléfono</label>
                  <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+56 9 XXXX XXXX" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Servicio de Interés</label>
                <Input name="service" value={form.service} onChange={handleChange} placeholder="Guardias, Cámaras, Alarmas, Previon Gate..." />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Mensaje</label>
                <Textarea name="message" value={form.message} onChange={handleChange} placeholder="Cuéntanos sobre tus necesidades de seguridad..." rows={4} required />
              </div>

              <Button type="submit" variant="cta" size="lg" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Solicitud"
                )}
              </Button>
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
