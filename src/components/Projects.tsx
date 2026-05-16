import { useState } from 'react';
import { ExternalLink, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, iconMap, type Project } from '../data/projects';
import { useInView } from '../hooks/useInView';

// Section header shared component
function SectionHeader({ label }: { label: string }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      className="flex items-center gap-4 mb-10 transition-all duration-600"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
      }}
    >
      <span className="section-label">{label}</span>
      <div className="section-rule" />
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [ref, visible] = useInView(0.1);
  const IconComp = iconMap[project.icon];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      onClick={() => window.open(project.repo, '_blank', 'noopener,noreferrer')}
      className="project-card rounded-2xl p-7 cursor-pointer flex flex-col gap-3 min-h-[180px] border border-[--border-subtle]"
      style={{ background: 'var(--bg-surface)' }}
    >
      {/* Image */}
      {project.image && (
        <div className="-mx-7 -mt-7 mb-0 rounded-t-2xl overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-video object-cover"
          />
        </div>
      )}

      {/* Icon */}
      {IconComp && (
        <div className="text-[--accent-blue] opacity-80">
          <IconComp size={22} />
        </div>
      )}

      {/* Title + Year */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="m-0 text-[17px] font-bold text-[--text-primary] tracking-[-0.02em] font-display">
          {project.title}
        </h3>
        <span className="text-[11px] text-[--text-muted] font-mono shrink-0 mt-0.5">
          {project.year}
        </span>
      </div>

      {/* Description */}
      <p className="m-0 text-[13.5px] text-[--text-secondary] leading-relaxed line-clamp-2 font-body">
        {project.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-semibold tracking-[0.05em] uppercase px-2 py-1 rounded border"
            style={{
              background: 'rgba(79,195,247,0.1)',
              color: 'var(--accent-blue)',
              borderColor: 'rgba(79,195,247,0.2)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom row */}
      <div className="flex items-center gap-2 pt-1">
        <Code2 size={14} className="text-[--text-muted]" />
        <span className="text-[11px] text-[--text-muted] font-mono">View on GitHub</span>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [showAll, setShowAll] = useState(false);

  const featured = projects.filter((p) => p.tier === 'featured');
  const notable = projects.filter((p) => p.tier === 'notable');
  const displayed = showAll ? projects : featured;

  return (
    <section id="projects" className="max-w-[960px] mx-auto px-5 md:px-10 py-20 md:py-24">
      <SectionHeader label="// featured projects" />

      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        <AnimatePresence>
          {displayed.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {notable.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[13px] text-[--accent-blue] hover:text-[#81d4fa] font-mono bg-transparent border-0 cursor-pointer transition-colors duration-200 underline decoration-[rgba(79,195,247,0.25)] underline-offset-4"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            {showAll ? 'Show fewer projects ↑' : `Show more projects (${notable.length} more) ↓`}
          </button>
        </div>
      )}

      <div className="mt-6 text-center">
        <a
          href="https://github.com/erichanwang"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] text-[--text-muted] hover:text-[--accent-blue] font-mono no-underline transition-colors duration-200"
        >
          <ExternalLink size={12} />
          view all repos on github →
        </a>
      </div>
    </section>
  );
}
