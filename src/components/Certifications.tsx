import { useState } from 'react';
import { ChevronDown, ExternalLink, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const certifications = [
  { name: 'Java IBC Certificate', issuer: 'IBC', link: null, tier: 'featured' as const },
  { name: 'UT Austin CS Machine Learning Certificate', issuer: 'UT Austin', link: null, tier: 'featured' as const },
  { name: 'HackerRank — Python', issuer: 'HackerRank', link: 'https://www.hackerrank.com/profile/ericwang559', tier: 'standard' as const },
  { name: 'HackerRank — Java', issuer: 'HackerRank', link: 'https://www.hackerrank.com/profile/ericwang559', tier: 'standard' as const },
  { name: 'HackerRank — C#', issuer: 'HackerRank', link: 'https://www.hackerrank.com/profile/ericwang559', tier: 'standard' as const },
  { name: 'HackerRank — JavaScript', issuer: 'HackerRank', link: 'https://www.hackerrank.com/profile/ericwang559', tier: 'standard' as const },
  { name: 'HackerRank — SQL', issuer: 'HackerRank', link: 'https://www.hackerrank.com/profile/ericwang559', tier: 'standard' as const },
  { name: 'HackerRank — CSS', issuer: 'HackerRank', link: 'https://www.hackerrank.com/profile/ericwang559', tier: 'standard' as const },
  { name: 'HackerRank — Go', issuer: 'HackerRank', link: 'https://www.hackerrank.com/profile/ericwang559', tier: 'standard' as const },
];

export function Certifications() {
  const [open, setOpen] = useState(false);
  const [sectionRef, sectionVisible] = useInView(0.05);

  const featured = certifications.filter((c) => c.tier === 'featured');
  const standard = certifications.filter((c) => c.tier === 'standard');

  return (
    <section id="certifications" className="max-w-[960px] mx-auto px-5 md:px-10 py-4 pb-16 md:pb-20">
      <div
        ref={sectionRef}
        className="transition-all duration-600"
        style={{
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(16px)',
        }}
      >
        {/* Click-to-open header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 p-5 md:p-6 rounded-2xl border transition-all duration-300 cursor-pointer bg-transparent"
          style={{
            background: open ? 'var(--bg-surface)' : 'rgba(79,195,247,0.03)',
            borderColor: open ? 'var(--accent-blue)' : 'var(--border-subtle)',
            boxShadow: open ? '0 0 24px rgba(79,195,247,0.08)' : 'none',
          }}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                open ? 'scale-110' : ''
              }`}
              style={{
                background: open ? 'rgba(79,195,247,0.12)' : 'rgba(79,195,247,0.06)',
              }}
            >
              <Award
                size={20}
                color={open ? 'var(--accent-blue)' : 'var(--text-muted)'}
                style={{
                  transition: 'color 0.3s ease, transform 0.3s ease',
                  transform: open ? 'scale(1.1)' : 'scale(1)',
                }}
              />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2.5">
                <span className="text-[15px] font-bold text-[--text-primary] font-display tracking-[-0.01em]">
                  Certifications
                </span>
                <span
                  className="text-[11px] font-semibold font-mono tracking-[0.04em] uppercase px-2 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(79,195,247,0.1)',
                    color: 'var(--accent-blue)',
                    border: '1px solid rgba(79,195,247,0.2)',
                  }}
                >
                  {certifications.length} earned
                </span>
              </div>
              <p className="m-0 mt-0.5 text-[12px] text-[--text-muted] font-body">
                {open ? 'Click to collapse' : 'Click to view professional certifications & badges'}
              </p>
            </div>
          </div>

          <ChevronDown
            size={20}
            color="var(--text-muted)"
            className={`shrink-0 transition-transform duration-400 ${open ? 'rotate-180' : ''}`}
            style={open ? { color: 'var(--accent-blue)' } : {}}
          />
        </button>

        {/* Expandable content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-5 space-y-5">
                {/* Featured certs */}
                {featured.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {featured.map((cert, i) => (
                      <motion.div
                        key={cert.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06 }}
                        className="flex items-center gap-3 p-4 rounded-xl border"
                        style={{
                          background: 'var(--bg-surface)',
                          borderColor: 'var(--border-subtle)',
                        }}
                      >
                        <div
                          className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                          style={{ background: 'rgba(79,195,247,0.08)' }}
                        >
                          <Award size={16} color="var(--accent-blue)" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[13px] font-semibold text-[--text-primary] font-body truncate">
                            {cert.name}
                          </div>
                          <span className="text-[10.5px] text-[--text-muted] font-mono">
                            {cert.issuer}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Standard certs in a compact grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {standard.map((cert, i) => (
                    <motion.a
                      key={cert.name}
                      href={cert.link ?? '#'}
                      target={cert.link ? '_blank' : undefined}
                      rel={cert.link ? 'noreferrer' : undefined}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, delay: i * 0.03 }}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border no-underline transition-all duration-200 ${
                        cert.link
                          ? 'hover:border-[var(--accent-blue)] hover:bg-[rgba(79,195,247,0.03)] cursor-pointer'
                          : 'cursor-default'
                      }`}
                      style={{
                        borderColor: 'var(--border-subtle)',
                        background: 'var(--bg-surface)',
                      }}
                    >
                      <ExternalLink size={11} className="text-[--text-muted] shrink-0" />
                      <span className="text-[11.5px] text-[--text-secondary] font-mono truncate">
                        {cert.name.replace('HackerRank — ', '')}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
