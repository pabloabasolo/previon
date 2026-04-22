import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SectionsVisibility = {
  hero: boolean;
  services: boolean;
  previon_gate: boolean;
  contact: boolean;
};

export type HeroContent = {
  title_part1: string;
  title_highlight: string;
  subtitle: string;
};

export type ContactInfo = {
  phone: string;
  email: string;
  address: string;
};

export type ButtonLabels = {
  nav_cta: string;
  hero_primary: string;
  hero_secondary: string;
};

export type SiteSettings = {
  sections_visibility: SectionsVisibility;
  hero_content: HeroContent;
  contact_info: ContactInfo;
  button_labels: ButtonLabels;
};

const DEFAULTS: SiteSettings = {
  sections_visibility: { hero: true, services: true, previon_gate: false, contact: true },
  hero_content: {
    title_part1: "Protegemos lo que más",
    title_highlight: "valoras",
    subtitle:
      "Servicios profesionales de seguridad privada en Talca. Guardias, cámaras y sistemas de alarma con tecnología de vanguardia.",
  },
  contact_info: { phone: "+56 9 XXXX XXXX", email: "contacto@previon.cl", address: "Talca, Chile" },
  button_labels: {
    nav_cta: "Solicitar Cotización",
    hero_primary: "Solicitar Cotización",
    hero_secondary: "Conocer Servicios",
  },
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("site_settings").select("key, value");
    if (data) {
      const map: Record<string, unknown> = {};
      data.forEach((row: { key: string; value: unknown }) => (map[row.key] = row.value));
      setSettings({
        sections_visibility: (map.sections_visibility as SectionsVisibility) ?? DEFAULTS.sections_visibility,
        hero_content: (map.hero_content as HeroContent) ?? DEFAULTS.hero_content,
        contact_info: (map.contact_info as ContactInfo) ?? DEFAULTS.contact_info,
        button_labels: (map.button_labels as ButtonLabels) ?? DEFAULTS.button_labels,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return { settings, loading, reload: load };
}
