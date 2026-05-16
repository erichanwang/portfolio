import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const certifications = [
  { name: 'Java IBC Certificate', issuer: 'IBC', link: null },
  { name: 'UT Austin CS Machine Learning Certificate', issuer: 'UT Austin', link: null },
  { name: 'HackerRank — Python', issuer: 'HackerRank', link: 'https://www.hackerrank.com/profile/ericwang559' },
  { name: 'HackerRank — Java', issuer: 'HackerRank', link: 'https://www.hackerrank.com/profile/ericwang559' },
  { name: 'HackerRank — C#', issuer: 'HackerRank', link: 'https://www.hackerrank.com/profile/ericwang559' },
  { name: 'HackerRank — JavaScript', issuer: 'HackerRank', link: 'https://www.hackerrank.com/profile/ericwang559' },
  { name: 'HackerRank — SQL', issuer: 'HackerRank', link: 'https://www.hackerrank.com/profile/ericwang559' },
  { name: 'HackerRank — CSS', issuer: 'HackerRank', link: 'https://www.hackerrank.com/profile/ericwang559' },
  { name: 'HackerRank — Go', issuer: 'HackerRank', link: 'https://www.hackerrank.com/profile/ericwang559' },
];

export function Certifications() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-[12px] text-[--text-muted] hover:text-[--accent-blue] font-mono bg-transparent border-none cursor-pointer transition-colors"
      >
        Certifications {open ? '↑' : '↓'}
        <ChevronDown
          size={12}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-2">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg border border-[--border-subtle]"
                  style={{ background: 'var(--bg-surface)' }}
                >
                  <span className="flex-1 text-[13px] text-[--text-secondary] font-body">
                    {cert.name}
                  </span>
                  <span
                    className="text-[10px] font-semibold tracking-[0.04em] uppercase px-2 py-0.5 rounded border font-mono"
                    style={{
                      background: 'rgba(79,195,247,0.08)',
                      color: 'var(--accent-blue)',
                      borderColor: 'rgba(79,195,247,0.15)',
                    }}
                  >
                    {cert.issuer}
                  </span>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[--text-muted] hover:text-[--accent-blue] transition-colors"
                      aria-label={`View ${cert.name} profile`}
                    >
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
