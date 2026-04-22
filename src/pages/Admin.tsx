import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { settings, loading, reload } = useSiteSettings();
  const [local, setLocal] = useState(settings);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "Panel admin | Previon";
  }, []);

  useEffect(() => setLocal(settings), [settings]);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [authLoading, user, navigate]);

  if (authLoading || loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="p-8 max-w-md text-center">
          <h1 className="text-xl font-bold mb-2">Acceso restringido</h1>
          <p className="text-muted-foreground mb-4">
            Tu cuenta ({user?.email}) no tiene rol de administrador. Pídele a un admin que te lo asigne.
          </p>
          <Button onClick={async () => { await supabase.auth.signOut(); navigate("/auth"); }}>
            Cerrar sesión
          </Button>
        </Card>
      </div>
    );
  }

  const save = async (key: string, value: unknown) => {
    setSaving(true);
    const { error } = await supabase.from("site_settings").update({ value: value as never }).eq("key", key);
    if (error) toast.error(error.message);
    else {
      toast.success("Guardado");
      reload();
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Panel de administración</h1>
            <p className="text-muted-foreground">Gestiona el contenido visible en tu sitio</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>Ver sitio</Button>
            <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); navigate("/auth"); }}>
              Salir
            </Button>
          </div>
        </div>

        {/* Visibility toggles */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Mostrar / Ocultar secciones</h2>
          <div className="space-y-4">
            {(
              [
                ["hero", "Hero (banner principal)"],
                ["services", "Servicios"],
                ["previon_gate", "Previon Gate (app de control)"],
                ["contact", "Contacto"],
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <Label>{label}</Label>
                <Switch
                  checked={local.sections_visibility[key]}
                  onCheckedChange={(checked) => {
                    const next = { ...local.sections_visibility, [key]: checked };
                    setLocal({ ...local, sections_visibility: next });
                    save("sections_visibility", next);
                  }}
                  disabled={saving}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Hero content */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-bold">Textos del Hero</h2>
          <div>
            <Label>Título (parte 1)</Label>
            <Input
              value={local.hero_content.title_part1}
              onChange={(e) => setLocal({ ...local, hero_content: { ...local.hero_content, title_part1: e.target.value } })}
            />
          </div>
          <div>
            <Label>Título (palabra destacada)</Label>
            <Input
              value={local.hero_content.title_highlight}
              onChange={(e) => setLocal({ ...local, hero_content: { ...local.hero_content, title_highlight: e.target.value } })}
            />
          </div>
          <div>
            <Label>Subtítulo</Label>
            <Textarea
              value={local.hero_content.subtitle}
              onChange={(e) => setLocal({ ...local, hero_content: { ...local.hero_content, subtitle: e.target.value } })}
            />
          </div>
          <Button onClick={() => save("hero_content", local.hero_content)} disabled={saving}>
            Guardar Hero
          </Button>
        </Card>

        {/* Contact info */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-bold">Datos de contacto</h2>
          <div>
            <Label>Teléfono</Label>
            <Input
              value={local.contact_info.phone}
              onChange={(e) => setLocal({ ...local, contact_info: { ...local.contact_info, phone: e.target.value } })}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              value={local.contact_info.email}
              onChange={(e) => setLocal({ ...local, contact_info: { ...local.contact_info, email: e.target.value } })}
            />
          </div>
          <div>
            <Label>Dirección</Label>
            <Input
              value={local.contact_info.address}
              onChange={(e) => setLocal({ ...local, contact_info: { ...local.contact_info, address: e.target.value } })}
            />
          </div>
          <Button onClick={() => save("contact_info", local.contact_info)} disabled={saving}>
            Guardar contacto
          </Button>
        </Card>

        {/* Button labels */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-bold">Etiquetas de botones</h2>
          <div>
            <Label>Botón menú (CTA navbar)</Label>
            <Input
              value={local.button_labels.nav_cta}
              onChange={(e) => setLocal({ ...local, button_labels: { ...local.button_labels, nav_cta: e.target.value } })}
            />
          </div>
          <div>
            <Label>Botón principal Hero</Label>
            <Input
              value={local.button_labels.hero_primary}
              onChange={(e) => setLocal({ ...local, button_labels: { ...local.button_labels, hero_primary: e.target.value } })}
            />
          </div>
          <div>
            <Label>Botón secundario Hero</Label>
            <Input
              value={local.button_labels.hero_secondary}
              onChange={(e) => setLocal({ ...local, button_labels: { ...local.button_labels, hero_secondary: e.target.value } })}
            />
          </div>
          <Button onClick={() => save("button_labels", local.button_labels)} disabled={saving}>
            Guardar botones
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
