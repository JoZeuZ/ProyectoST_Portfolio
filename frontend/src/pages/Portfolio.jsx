import { useState, useEffect } from 'react';
import SEO from '../components/SEO';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'web', name: 'Desarrollo Web' },
    { id: 'mobile', name: 'Apps Móviles' },
    { id: 'desktop', name: 'Apps de Escritorio' }
  ];
  
  const projects = [
    {
      id: 1,
      title: 'TecniService Web',
      category: 'web',
      image: 'https://placehold.co/600x400/3B82F6/FFFFFF/png?text=TecniService+Web',
      description: 'Plataforma web para gestión de servicios técnicos con React y Node.js',
      technologies: ['React', 'Node.js', 'MongoDB', 'UnoCSS'],
      link: '#'
    },
    {
      id: 2,
      title: 'Inventory Manager',
      category: 'desktop',
      image: 'https://placehold.co/600x400/10B981/FFFFFF/png?text=Inventory+App',
      description: 'Aplicación de escritorio para la gestión de inventario de tiendas',
      technologies: ['Electron', 'React', 'SQLite'],
      link: '#'
    },
    {
      id: 3,
      title: 'TecniService Mobile',
      category: 'mobile',
      image: 'https://placehold.co/600x400/6366F1/FFFFFF/png?text=Mobile+App',
      description: 'App móvil para técnicos que trabajan en terreno',
      technologies: ['React Native', 'Redux', 'Firebase'],
      link: '#'
    },
    {
      id: 4,
      title: 'E-commerce Platform',
      category: 'web',
      image: 'https://placehold.co/600x400/F59E0B/FFFFFF/png?text=E-commerce',
      description: 'Plataforma completa de comercio electrónico con pasarela de pagos',
      technologies: ['Next.js', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
      link: '#'
    }
  ];

  // Filtrar proyectos según la categoría seleccionada
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Efecto para animación de aparición en scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { 
      root: null,
      threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, [activeCategory]); // Re-ejecutar cuando cambia la categoría

  return (
    <main className="pt-16 sm:pt-20 pb-12 sm:pb-16 min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <SEO 
        title="Portafolio de Desarrollo Web y Software"
        description="Conoce nuestros proyectos de desarrollo web, aplicaciones móviles y software de escritorio realizados en Los Ángeles, región del Biobío."
        canonicalUrl="/dev"
        keywords={[
          'desarrollo web Los Ángeles', 
          'aplicaciones móviles Biobío', 
          'desarrollador software Chile', 
          'diseño web Los Ángeles',
          'proyectos web aplicaciones',
          'portfolio desarrollo software'
        ]}
      />
      <section className="py-10 sm:py-16 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-serif">Portafolio de Desarrollo</h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 px-2">
              Proyectos y soluciones tecnológicas personalizadas para diversos sectores.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          {/* Categorías - Optimizado para móvil con scroll horizontal */}
          <div className="overflow-x-auto pb-3 mb-8 sm:mb-12">
            <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 min-w-max sm:min-w-0">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de proyectos - Mejorado con estructura responsiva */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="animate-on-scroll opacity-0 bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-40 sm:h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-0 right-0 bg-accent text-white px-2 sm:px-3 py-1 text-xs rounded-bl-lg">
                    {categories.find(c => c.id === project.category)?.name}
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4 text-sm sm:text-base">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 sm:py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={project.link}
                    className="btn-primary inline-block w-full text-center text-sm sm:text-base py-2"
                  >
                    Ver proyecto
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mensaje cuando no hay proyectos */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-10">
              <p className="text-lg text-neutral-500 dark:text-neutral-400">
                No hay proyectos en esta categoría.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-white dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-8 font-serif">¿Interesado en mis servicios de desarrollo?</h2>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-300 mb-6 sm:mb-8 px-2">
              Además de servicios técnicos, ofrezco soluciones de desarrollo web y móvil a medida.
              Contáctame para discutir tu proyecto y encontrar la mejor solución para tus necesidades.
            </p>
            <a 
              href="/#contacto" 
              className="btn-accent inline-block px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg"
            >
              Contactar para un proyecto
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}