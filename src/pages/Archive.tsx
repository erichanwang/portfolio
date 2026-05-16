import { ArrowLeft, ExternalLink, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { archiveProjects } from '../data/projects';
import { hsAwards, hsActivities } from '../data/archive';

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

          <p className="text-[14px] text-[--text-secondary] font-body mb-12 leading-relaxed">
            High school awards, activities, and early projects.
          </p>
        </motion.div>

        {/* ── Awards ────────────────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-2.5 mb-5">
            <Trophy size={15} className="text-[--accent-blue]" />
            <h2 className="text-[14px] font-bold text-[--text-primary] font-display tracking-[-0.01em] m-0">
              Awards & Honors
            </h2>
          </div>

          <div className="space-y-0 border border-[--border-subtle] rounded-2xl overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
            {hsAwards.map((award, i) => (
              <motion.div
                key={award.text}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04, ease: [0.4, 0, 0.2, 1] }}
                className={`flex items-start justify-between gap-4 py-3.5 px-5 ${
                  i < hsAwards.length - 1 ? 'border-b border-[--border-subtle]' : ''
                }`}
              >
                <div className="min-w-0 pr-2">
                  <span className="text-[13.5px] text-[--text-primary] font-body">
                    {award.text}
                  </span>
                  {(award.location || award.detail) && (
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1">
                      {award.detail && (
                        <span className="text-[10.5px] font-semibold text-[--accent-blue] font-mono tracking-[0.03em] uppercase">
                          {award.detail}
                        </span>
                      )}
                      {award.location && (
                        <span className="text-[11px] text-[--text-muted] font-mono">
                          {award.location}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[11px] text-[--text-muted] font-mono shrink-0 mt-0.5">
                  {award.year}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Activities ────────────────────────────────── */}
        <section className="mb-14">
          <div className="flex items-center gap-2.5 mb-5">
            <Users size={15} className="text-[--accent-blue]" />
            <h2 className="text-[14px] font-bold text-[--text-primary] font-display tracking-[-0.01em] m-0">
              Activities & Leadership
            </h2>
          </div>

          <div className="space-y-3">
            {hsActivities.map((activity, i) => (
              <motion.div
                key={activity.organization + activity.role}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}
                className="rounded-xl p-5 border border-[--border-subtle]"
                style={{ background: 'var(--bg-surface)' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-semibold text-[--text-primary] font-display tracking-[-0.01em] m-0">
                      {activity.role}
                    </h3>
                    <p className="text-[12.5px] text-[--text-secondary] font-body mt-0.5 m-0">
                      {activity.organization}
                      {activity.location && (
                        <span className="text-[--text-muted]"> · {activity.location}</span>
                      )}
                    </p>
                    {activity.detail && (
                      <p className="text-[12px] text-[--text-muted] font-body mt-2 m-0 leading-relaxed">
                        {activity.detail}
                      </p>
                    )}
                    {/* External link */}
                    {activity.link && (
                      <a
                        href={activity.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-medium text-[--accent-blue] hover:text-[#81d4fa] no-underline transition-colors duration-200 font-mono"
                      >
                        <ExternalLink size={11} />
                        {activity.linkLabel || activity.link}
                      </a>
                    )}
                  </div>
                  <span className="text-[11px] text-[--text-muted] font-mono shrink-0 mt-0.5 text-right leading-relaxed">
                    {activity.yearSpan || activity.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Archived Repos ────────────────────────────── */}
        <section>
          <div className="flex items-center gap-2.5 mb-5">
            <ExternalLink size={15} className="text-[--accent-blue]" />
            <h2 className="text-[14px] font-bold text-[--text-primary] font-display tracking-[-0.01em] m-0">
              Early Projects
            </h2>
          </div>

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
        </section>
      </div>
    </div>
  );
}
