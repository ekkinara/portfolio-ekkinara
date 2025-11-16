import { ImageWithFallback } from './figma/ImageWithFallback';
import { BookOpen, FileText, Sparkles } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Brand Narrative Development',
    description: 'Crafting compelling brand stories that resonate with audiences and build emotional connections.',
    image: 'https://images.unsplash.com/photo-1689023540541-59aa2513b750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdyaXRpbmclMjBub3RlYm9va3xlbnwxfHx8fDE3NjMyMDIxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Brand Story', 'Content Strategy', 'Marketing'],
  },
  {
    id: 2,
    title: 'Editorial Content Creation',
    description: 'Writing engaging articles and editorial pieces that inform, inspire, and captivate readers.',
    image: 'https://images.unsplash.com/photo-1759936665743-67c10d828474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9yeXRlbGxpbmclMjBib29rJTIwcGFnZXN8ZW58MXx8fHwxNzYzMjEyNzk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Editorial', 'Journalism', 'Creative Writing'],
  },
  {
    id: 3,
    title: 'Narrative Design for Games',
    description: 'Creating immersive storylines and character arcs for interactive gaming experiences.',
    image: 'https://images.unsplash.com/photo-1689023540541-59aa2513b750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdyaXRpbmclMjBub3RlYm9va3xlbnwxfHx8fDE3NjMyMDIxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Game Writing', 'Interactive', 'Character Development'],
  },
];

export function StorytellingSection() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-slate-900" />
          <h2 className="text-slate-900">Storytelling</h2>
        </div>
        <p className="text-slate-600 max-w-2xl">
          Every brand has a story to tell. I help bring those narratives to life through compelling content, 
          strategic messaging, and creative storytelling that connects with audiences on a deeper level.
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
          <BookOpen className="w-10 h-10 text-slate-900 mb-4" />
          <h3 className="mb-2 text-slate-900">Brand Stories</h3>
          <p className="text-slate-600">
            Creating authentic narratives that define and differentiate your brand in the marketplace.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <FileText className="w-10 h-10 text-slate-900 mb-4" />
          <h3 className="mb-2 text-slate-900">Content Writing</h3>
          <p className="text-slate-600">
            Producing high-quality written content across blogs, articles, and marketing materials.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <Sparkles className="w-10 h-10 text-slate-900 mb-4" />
          <h3 className="mb-2 text-slate-900">Creative Direction</h3>
          <p className="text-slate-600">
            Guiding creative vision and ensuring cohesive storytelling across all touchpoints.
          </p>
        </div>
      </div>
    </div>
  );
}
