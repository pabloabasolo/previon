import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Clock, Users, BarChart3, CheckCircle2 } from "lucide-react";
import previonGateApp from "@/assets/previon-gate-app.png";

const PrevionGate = () => {
  const features = [
    {
      icon: Clock,
      title: "Registro en Tiempo Real",
      description: "Controla entradas y salidas del personal al instante"
    },
    {
      icon: Users,
      title: "Gestión de Personal",
      description: "Administra guardias y turnos desde cualquier lugar"
    },
    {
      icon: BarChart3,
      title: "Reportes Detallados",
      description: "Analítica completa de accesos y actividades"
    },
    {
      icon: CheckCircle2,
      title: "Verificación Biométrica",
      description: "Máxima seguridad con reconocimiento facial"
    }
  ];

  return (
    <section id="previon-gate" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
              <Smartphone className="h-4 w-4" />
              <span className="font-semibold">Nueva Tecnología</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Previon <span className="text-accent">Gate</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8">
              La plataforma innovadora de control de accesos que revoluciona la gestión de seguridad. 
              Permite a tus guardias controlar el acceso del personal con registro en tiempo real desde 
              cualquier dispositivo.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg">
                Solicitar Demo
              </Button>
              <Button variant="outline" size="lg">
                Ver Características
              </Button>
            </div>
          </div>

          {/* Right - App Mockup */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-accent rounded-full blur-3xl opacity-20" />
            <Card className="relative bg-card/50 backdrop-blur-sm border-accent/20 p-8 shadow-elevated">
              <img 
                src={previonGateApp} 
                alt="Previon Gate - Aplicación de control de accesos en tiempo real"
                className="w-full max-w-md mx-auto drop-shadow-2xl"
              />
              
              {/* Floating Stats */}
              <div className="absolute top-8 -left-4 bg-card rounded-lg shadow-card p-4 border border-border">
                <div className="text-2xl font-bold text-accent">847</div>
                <div className="text-sm text-muted-foreground">Accesos Hoy</div>
              </div>
              
              <div className="absolute bottom-8 -right-4 bg-card rounded-lg shadow-card p-4 border border-border">
                <div className="text-2xl font-bold text-accent">100%</div>
                <div className="text-sm text-muted-foreground">Tiempo Real</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <Card className="p-6 bg-card border-accent/20 hover:shadow-glow transition-all duration-300">
            <h3 className="text-xl font-bold text-foreground mb-2">🚀 Implementación Rápida</h3>
            <p className="text-muted-foreground">
              Tu equipo operando con Previon Gate en menos de 24 horas
            </p>
          </Card>
          
          <Card className="p-6 bg-card border-accent/20 hover:shadow-glow transition-all duration-300">
            <h3 className="text-xl font-bold text-foreground mb-2">☁️ Cloud Native</h3>
            <p className="text-muted-foreground">
              Accede desde cualquier dispositivo, en cualquier momento y lugar
            </p>
          </Card>
          
          <Card className="p-6 bg-card border-accent/20 hover:shadow-glow transition-all duration-300">
            <h3 className="text-xl font-bold text-foreground mb-2">🔒 Máxima Seguridad</h3>
            <p className="text-muted-foreground">
              Encriptación de datos y cumplimiento de estándares internacionales
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PrevionGate;
