import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phone = "56972159287";
  const message = encodeURIComponent("Hola, me gustaría más información sobre sus servicios de seguridad.");
  const href = `https://web.whatsapp.com/send?phone=${phone}&text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 animate-fade-in"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </a>
  );
};

export default WhatsAppButton;
