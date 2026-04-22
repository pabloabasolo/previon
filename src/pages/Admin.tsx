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

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("site-images").upload(path, file, { upsert: false });
    if (error) {
      toast.error(error.message);
      return null;
    }
    const { data } = supabase.storage.from("site-images").getPublicUrl(path);
    return data.publicUrl;
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
                ["about", "Quiénes Somos"],
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

        {/* About content */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-bold">Quiénes Somos</h2>
          <div>
            <Label>Título</Label>
            <Input
              value={local.about_content.title}
              onChange={(e) => setLocal({ ...local, about_content: { ...local.about_content, title: e.target.value } })}
            />
          </div>
          <div>
            <Label>Descripción de la empresa</Label>
            <Textarea
              rows={4}
              value={local.about_content.paragraph}
              onChange={(e) => setLocal({ ...local, about_content: { ...local.about_content, paragraph: e.target.value } })}
            />
          </div>
          <div>
            <Label>Misión</Label>
            <Textarea
              value={local.about_content.mission}
              onChange={(e) => setLocal({ ...local, about_content: { ...local.about_content, mission: e.target.value } })}
            />
          </div>
          <div>
            <Label>Visión</Label>
            <Textarea
              value={local.about_content.vision}
              onChange={(e) => setLocal({ ...local, about_content: { ...local.about_content, vision: e.target.value } })}
            />
          </div>
          <Button onClick={() => save("about_content", local.about_content)} disabled={saving}>
            Guardar Quiénes Somos
          </Button>
        </Card>

        {/* Services content */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-bold">Sección Servicios</h2>
          <div>
            <Label>Título de la sección</Label>
            <Input
              value={local.services_content.section_title}
              onChange={(e) => setLocal({ ...local, services_content: { ...local.services_content, section_title: e.target.value } })}
            />
          </div>
          <div>
            <Label>Subtítulo de la sección</Label>
            <Textarea
              value={local.services_content.section_subtitle}
              onChange={(e) => setLocal({ ...local, services_content: { ...local.services_content, section_subtitle: e.target.value } })}
            />
          </div>

          <div className="space-y-6 pt-4 border-t">
            {local.services_content.items.map((item, idx) => (
              <div key={idx} className="space-y-3 p-4 border rounded-lg">
                <h3 className="font-semibold">Servicio {idx + 1}</h3>
                <div>
                  <Label>Ícono</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={item.icon}
                    onChange={(e) => {
                      const items = [...local.services_content.items];
                      items[idx] = { ...item, icon: e.target.value };
                      setLocal({ ...local, services_content: { ...local.services_content, items } });
                    }}
                  >
                    <option value="Shield">Escudo (Shield)</option>
                    <option value="Camera">Cámara (Camera)</option>
                    <option value="Bell">Alarma (Bell)</option>
                  </select>
                </div>
                <div>
                  <Label>Título</Label>
                  <Input
                    value={item.title}
                    onChange={(e) => {
                      const items = [...local.services_content.items];
                      items[idx] = { ...item, title: e.target.value };
                      setLocal({ ...local, services_content: { ...local.services_content, items } });
                    }}
                  />
                </div>
                <div>
                  <Label>Descripción</Label>
                  <Textarea
                    value={item.description}
                    onChange={(e) => {
                      const items = [...local.services_content.items];
                      items[idx] = { ...item, description: e.target.value };
                      setLocal({ ...local, services_content: { ...local.services_content, items } });
                    }}
                  />
                </div>
                <div>
                  <Label>Características (una por línea)</Label>
                  <Textarea
                    value={item.features.join("\n")}
                    onChange={(e) => {
                      const items = [...local.services_content.items];
                      items[idx] = { ...item, features: e.target.value.split("\n").filter(Boolean) };
                      setLocal({ ...local, services_content: { ...local.services_content, items } });
                    }}
                  />
                </div>
                <div>
                  <Label>Imagen del servicio</Label>
                  {item.image && <img src={item.image} alt="" className="w-32 h-20 object-cover rounded mb-2" />}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const url = await uploadImage(file);
                      if (!url) return;
                      const items = [...local.services_content.items];
                      items[idx] = { ...item, image: url };
                      const next = { ...local.services_content, items };
                      setLocal({ ...local, services_content: next });
                      save("services_content", next);
                    }}
                  />
                  {item.image && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        const items = [...local.services_content.items];
                        items[idx] = { ...item, image: "" };
                        setLocal({ ...local, services_content: { ...local.services_content, items } });
                      }}
                    >
                      Quitar imagen
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold">Banner inferior</h3>
            <div>
              <Label>Título del banner</Label>
              <Input
                value={local.services_content.banner_title}
                onChange={(e) => setLocal({ ...local, services_content: { ...local.services_content, banner_title: e.target.value } })}
              />
            </div>
            <div>
              <Label>Texto del banner</Label>
              <Textarea
                value={local.services_content.banner_text}
                onChange={(e) => setLocal({ ...local, services_content: { ...local.services_content, banner_text: e.target.value } })}
              />
            </div>
            <div>
              <Label>Imagen del banner</Label>
              {local.services_content.banner_image && (
                <img src={local.services_content.banner_image} alt="" className="w-48 h-24 object-cover rounded mb-2" />
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = await uploadImage(file);
                  if (!url) return;
                  const next = { ...local.services_content, banner_image: url };
                  setLocal({ ...local, services_content: next });
                  save("services_content", next);
                }}
              />
            </div>
          </div>

          <Button onClick={() => save("services_content", local.services_content)} disabled={saving}>
            Guardar Servicios
          </Button>
        </Card>

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
