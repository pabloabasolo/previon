import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phone = "56972159287";
  const message = encodeURIComponent("Hola, me gustaría más información sobre sus servicios de seguridad.");
  const href = `https://wa.me/${phone}?text=${message}`;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    try {
      if (window.top && window.top !== window) {
        window.top.location.href = href;
        return;
      }
    } catch {
      // fallback below
    }

    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <a
      href={href}
      target="_top"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 animate-fade-in"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </a>
  );
};

export default WhatsAppButton;

