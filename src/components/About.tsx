import { Card } from "@/components/ui/card";
import { Target, Eye, Building2 } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const About = () => {
  const { settings } = useSiteSettings();
  const { about_content } = settings;

  return (
    <section id="nosotros" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {about_content.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {about_content.paragraph}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 bg-card border-accent/20 hover:shadow-elevated transition-all duration-300">
            <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Target className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Nuestra Misión</h3>
            <p className="text-muted-foreground">{about_content.mission}</p>
          </Card>

          <Card className="p-8 bg-card border-accent/20 hover:shadow-elevated transition-all duration-300">
            <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Eye className="h-7 w-7 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Nuestra Visión</h3>
            <p className="text-muted-foreground">{about_content.vision}</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
