export function WhatsappButton({ number = "123456789", text = "¡Hola! Necesito información sobre servicios técnicos" }) {
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/${number}?text=${encodedText}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#20BA5C] transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      <span className="sr-only">Contactar por WhatsApp</span>
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path>
        <path d="M12 1.5c-5.799 0-10.5 4.701-10.5 10.5s4.701 10.5 10.5 10.5 10.5-4.701 10.5-10.5-4.701-10.5-10.5-10.5zm0 19.25c-4.817 0-8.75-3.933-8.75-8.75s3.933-8.75 8.75-8.75 8.75 3.933 8.75 8.75-3.933 8.75-8.75 8.75z"></path>
      </svg>
      <span className="ml-2 font-medium max-w-0 overflow-hidden transition-all duration-300 group-hover:max-w-xs whitespace-nowrap opacity-0 group-hover:opacity-100 hidden md:inline-block">
        Chatea con nosotros
      </span>
    </a>
  );
}
