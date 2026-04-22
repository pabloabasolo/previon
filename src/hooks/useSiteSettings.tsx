import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SectionsVisibility = {
  hero: boolean;
  about: boolean;
  services: boolean;
  previon_gate: boolean;
  contact: boolean;
};

export type HeroContent = {
  title_part1: string;
  title_highlight: string;
  subtitle: string;
};

export type AboutContent = {
  title: string;
  paragraph: string;
  mission: string;
  vision: string;
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

export type ServiceItem = {
  icon: string;
  title: string;
  description: string;
  features: string[];
  image: string;
};

export type ServicesContent = {
  section_title: string;
  section_subtitle: string;
  items: ServiceItem[];
  banner_title: string;
  banner_text: string;
  banner_image: string;
};

export type SiteSettings = {
  sections_visibility: SectionsVisibility;
  hero_content: HeroContent;
  about_content: AboutContent;
  contact_info: ContactInfo;
  button_labels: ButtonLabels;
  services_content: ServicesContent;
};

const DEFAULTS: SiteSettings = {
  sections_visibility: { hero: true, about: true, services: true, previon_gate: false, contact: true },
  hero_content: {
    title_part1: "Protegemos lo que más",
    title_highlight: "valoras",
    subtitle:
      "Servicios profesionales de seguridad privada en Talca. Guardias, cámaras y sistemas de alarma con tecnología de vanguardia.",
  },
  about_content: {
    title: "Quiénes Somos",
    paragraph:
      "Previon Seguridad es una empresa chilena con sede en Talca, dedicada a brindar servicios integrales de seguridad privada con tecnología de vanguardia.",
    mission: "Proteger personas, bienes e instalaciones con servicios de seguridad de excelencia.",
    vision: "Ser la empresa líder en seguridad privada de la Región del Maule.",
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
        sections_visibility: { ...DEFAULTS.sections_visibility, ...((map.sections_visibility as SectionsVisibility) ?? {}) },
        hero_content: (map.hero_content as HeroContent) ?? DEFAULTS.hero_content,
        about_content: (map.about_content as AboutContent) ?? DEFAULTS.about_content,
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
