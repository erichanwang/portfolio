import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { archiveProjects } from '../data/projects';

export function Archive() {
  return (
    <div className="min-h-screen bg-[--bg-base]">
      <div className="max-w-[720px] mx-auto px-5 md:px-10 py-16 md:py-24">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[13px] text-[--text-muted] hover:text-[--accent-blue] font-mono no-underline transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="section-label">// archive</span>
            <div className="section-rule" />
          </div>

          <p className="text-[14px] text-[--text-secondary] font-body mb-10 leading-relaxed">
            Earlier projects and experiments from high school.
          </p>
        </motion.div>

        <div className="space-y-0 border border-[--border-subtle] rounded-2xl overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
          {archiveProjects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04, ease: [0.4, 0, 0.2, 1] }}
              className={`flex items-center justify-between py-4 px-5 no-underline hover:bg-[--bg-hover] transition-colors ${
                i < archiveProjects.length - 1 ? 'border-b border-[--border-subtle]' : ''
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="text-[14px] text-[--text-primary] font-body truncate">
                  {project.title}
                </span>
                <span className="text-[11px] text-[--text-muted] font-mono shrink-0">
                  {project.year}
                </span>
              </div>
              <ExternalLink size={13} className="text-[--text-muted] shrink-0 ml-2" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
