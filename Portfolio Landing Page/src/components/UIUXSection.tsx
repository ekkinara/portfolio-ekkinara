import { ImageWithFallback } from './figma/ImageWithFallback';
import { Palette, Smartphone, Layout } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform Redesign',
    description: 'Complete UX overhaul of a major e-commerce platform, increasing conversion rates by 45%.',
    image: 'https://images.unsplash.com/photo-1717323454555-f053c31ff4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzYzMTE4NTQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Web Design', 'UX Research', 'Prototyping'],
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    description: 'User-friendly mobile banking experience with intuitive navigation and enhanced security features.',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYzMTg0MTI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Mobile App', 'Fintech', 'UI Design'],
  },
  {
    id: 3,
    title: 'SaaS Dashboard Interface',
    description: 'Clean, data-driven dashboard design that simplifies complex analytics for business users.',
    image: 'https://images.unsplash.com/photo-1717323454555-f053c31ff4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzYzMTE4NTQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Dashboard', 'Data Viz', 'SaaS'],
  },
];

export function UIUXSection() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-8 h-8 text-slate-900" />
          <h2 className="text-slate-900">UI/UX Design</h2>
        </div>
        <p className="text-slate-600 max-w-2xl">
          Creating intuitive, beautiful digital experiences that prioritize user needs while achieving business goals. 
          From research to final design, I focus on delivering interfaces that delight users.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="aspect-[4/3] overflow-hidden bg-slate-100">
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-slate-900">{project.title}</h3>
              <p className="text-slate-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <Layout className="w-10 h-10 text-slate-900 mb-4" />
          <h3 className="mb-2 text-slate-900">UX Research</h3>
          <p className="text-slate-600">
            Deep user research and testing to understand needs and validate design decisions.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <Smartphone className="w-10 h-10 text-slate-900 mb-4" />
          <h3 className="mb-2 text-slate-900">Interface Design</h3>
          <p className="text-slate-600">
            Crafting pixel-perfect interfaces that are both beautiful and highly functional.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <Palette className="w-10 h-10 text-slate-900 mb-4" />
          <h3 className="mb-2 text-slate-900">Design Systems</h3>
          <p className="text-slate-600">
            Building scalable design systems that ensure consistency across products.
          </p>
        </div>
      </div>
    </div>
  );
}
