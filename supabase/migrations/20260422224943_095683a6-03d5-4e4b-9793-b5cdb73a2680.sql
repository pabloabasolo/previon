UPDATE public.site_settings
SET value = jsonb_set(value, '{about}', 'true'::jsonb)
WHERE key = 'sections_visibility';

INSERT INTO public.site_settings (key, value) VALUES
  ('about_content', '{"title": "Quiénes Somos", "paragraph": "Previon Seguridad es una empresa chilena con sede en Talca, dedicada a brindar servicios integrales de seguridad privada con tecnología de vanguardia. Combinamos personal altamente capacitado con soluciones tecnológicas innovadoras para proteger lo que más importa.", "mission": "Proteger personas, bienes e instalaciones con servicios de seguridad de excelencia, integrando tecnología y profesionalismo.", "vision": "Ser la empresa líder en seguridad privada de la Región del Maule, reconocida por su innovación, confiabilidad y compromiso con cada cliente."}'::jsonb);