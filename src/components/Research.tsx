import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { researchAreas, awards } from '../data/research';
import { useInView } from '../hooks/useInView';

function ResearchItem({
  item,
  index,
}: {
  item: { label: string; detail: string; color: string };
  index: number;
}) {
  const [ref, visible] = useInView(0.1);

  return (
    <div ref={ref} className="flex gap-4">
      <div
        className="research-bar shrink-0 self-stretch"
        style={{ background: item.color }}
      />
      <div
        className="transition-all duration-500"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-20px)',
          transitionDelay: `${index * 80}ms`,
        }}
      >
        <div className="text-[15px] font-semibold text-[--text-primary] font-display tracking-[-0.01em] transition-colors duration-200">
          {item.label}
        </div>
        <div className="text-[12px] text-[--text-muted] font-mono mt-1 leading-relaxed">
          {item.detail}
        </div>
      </div>
    </div>
  );
}

export function Research() {
  const [awardsOpen, setAwardsOpen] = useState(false);
  const [sectionRef, sectionVisible] = useInView(0.05);

  return (
    <section id="research" className="max-w-[960px] mx-auto px-5 md:px-10 py-20 md:py-24">
      <div
        ref={sectionRef}
        className="flex items-center gap-4 mb-10 transition-all duration-[600ms]"
        style={{
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(16px)',
        }}
      >
        <span className="section-label">// research & interests</span>
        <div className="section-rule" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-x-12">
        {researchAreas.map((area, i) => (
          <ResearchItem key={area.label} item={area} index={i} />
        ))}
      </div>

      {/* Awards & Activity Accordion */}
      <div
        className="mt-10 border border-[--border-subtle] rounded-2xl overflow-hidden"
        style={{ background: 'var(--bg-surface)' }}
      >
        <button
          onClick={() => setAwardsOpen(!awardsOpen)}
          className="w-full flex items-center gap-2 px-7 py-5 bg-transparent border-none cursor-pointer text-left hover:bg-[--bg-hover] transition-colors"
        >
          <span className="text-[14px] font-semibold text-[--text-primary] font-display tracking-[-0.01em]">
            {awardsOpen ? '\u25BC' : '\u25B6'}  Awards & Activity
          </span>
        </button>

        <AnimatePresence>
          {awardsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-7 pb-6 space-y-0">
                {awards.map((award, i) => (
                  <div
                    key={i}
                    className={`flex gap-4 py-3 ${
                      i < awards.length - 1 ? 'border-b border-[--border-subtle]' : ''
                    }`}
                  >
                    <span className="text-[12px] text-[--text-muted] font-mono shrink-0 w-[44px]">
                      {award.year}
                    </span>
                    <span className="text-[13.5px] text-[--text-secondary] font-body leading-relaxed">
                      {award.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
