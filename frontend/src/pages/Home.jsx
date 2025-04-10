import ServiceCard from '../components/ServiceCard';
import ContactForm from '../components/ContactForm';
// import { WhatsappButton } from '../components/WhatsappButton';

export default function Home() {
  const services = [
    { title: 'Reparación de PCs', price: '$20', description: 'Diagnóstico y solución de hardware/software' },
    { title: 'Mantenimiento', price: '$30', description: 'Limpieza y optimización completa' }
  ];

  return (
    <main className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">¿Problemas con tu PC? ¡Agenda una revisión!</h1>
        <a href="#contacto" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Reservar Ahora
        </a>
      </section>

      {/* Servicios */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Nuestros Servicios</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>

      <ContactForm />
      {/* <WhatsappButton /> */}
    </main>
  );
}