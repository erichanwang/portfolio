import { ExternalLink } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { experiences, type Experience } from '../data/experiences';

const typeConfig: Record<Experience['type'], { label: string; color: string; bg: string; glow: string }> = {
  research: { label: 'Research', color: '#4fc3f7', bg: 'rgba(79,195,247,0.08)', glow: 'rgba(79,195,247,0.25)' },
  internship: { label: 'Internship', color: '#ce93d8', bg: 'rgba(206,147,216,0.08)', glow: 'rgba(206,147,216,0.25)' },
  work: { label: 'Work', color: '#80cbc4', bg: 'rgba(128,203,196,0.08)', glow: 'rgba(128,203,196,0.25)' },
  teaching: { label: 'Teaching', color: '#ffcc80', bg: 'rgba(255,204,128,0.08)', glow: 'rgba(255,204,128,0.25)' },
  school: { label: 'School', color: '#a5d6a7', bg: 'rgba(165,214,167,0.08)', glow: 'rgba(165,214,167,0.25)' },
};

function ExperienceCard({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) {
  const [ref, visible] = useInView(0.08);
  const cfg = typeConfig[exp.type];
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-[1fr] md:grid-cols-[1fr_auto_1fr] gap-0 md:gap-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.55s cubic-bezier(0.4,0,0.2,1) ${index * 100}ms`,
      }}
    >
      {/* Left column (content for left-aligned cards, empty for right) */}
      <div className={`${isLeft ? 'block' : 'hidden md:block'}`}>
        {isLeft && <CardContent exp={exp} cfg={cfg} />}
      </div>

      {/* Timeline spine + dot */}
      <div className="hidden md:flex flex-col items-center">
        <div
          className="w-[14px] h-[14px] rounded-full z-10 shrink-0 mt-6"
          style={{
            background: cfg.color,
            boxShadow: `0 0 16px ${cfg.glow}, 0 0 6px ${cfg.glow}`,
          }}
        />
        <div className="w-[2px] flex-1 min-h-[40px] mt-1" style={{ background: 'var(--border-subtle)' }} />
      </div>

      {/* Right column (content for right-aligned cards, empty for left) */}
      <div className={`${!isLeft ? 'block' : 'hidden md:block'}`}>
        {!isLeft && <CardContent exp={exp} cfg={cfg} />}
      </div>

      {/* Mobile: always show content on the left side of the timeline */}
      <div className="md:hidden relative pl-8 before:absolute before:left-0 before:top-6 before:w-[14px] before:h-[14px] before:rounded-full before:z-10 before:-translate-x-1/2 before:border-2 before:border-[--border-subtle]"
        style={{
          borderLeft: '2px solid var(--border-subtle)',
        }}
      >
        <div
          className="absolute left-0 top-6 w-[14px] h-[14px] rounded-full z-10 -translate-x-1/2"
          style={{
            background: cfg.color,
            boxShadow: `0 0 16px ${cfg.glow}, 0 0 6px ${cfg.glow}`,
          }}
        />
        <CardContent exp={exp} cfg={cfg} />
      </div>
    </div>
  );
}

function CardContent({
  exp,
  cfg,
}: {
  exp: Experience;
  cfg: { label: string; color: string; bg: string; glow: string };
}) {
  return (
    <div
      className="rounded-2xl border border-[--border-subtle] p-5 md:p-6 transition-all duration-300 hover:border-[var(--border-hover)] group"
      style={{ background: 'var(--bg-surface)' }}
    >
      {/* Type badge */}
      <div className="flex items-center gap-3 mb-3">
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.06em] uppercase px-2.5 py-1 rounded-full font-mono"
          style={{
            background: cfg.bg,
            color: cfg.color,
            border: `1px solid ${cfg.color}30`,
          }}
        >
          <span
            className="w-[5px] h-[5px] rounded-full"
            style={{ background: cfg.color }}
          />
          {cfg.label}
        </span>
        <span className="text-[11px] text-[--text-muted] font-mono">
          {exp.period}
        </span>
      </div>

      {/* Title */}
      <h3 className="m-0 text-[17px] font-bold text-[--text-primary] tracking-[-0.01em] font-display leading-snug">
        {exp.title}
      </h3>

      {/* Organization + Location */}
      <p className="m-0 mt-1 text-[13px] text-[--text-secondary] font-body">
        {exp.organization}
        <span className="text-[--text-muted] mx-1.5">·</span>
        <span className="text-[--text-muted]">{exp.location}</span>
      </p>

      {/* Description */}
      <p className="mt-3 text-[13.5px] text-[--text-secondary] leading-relaxed font-body">
        {exp.desc}
      </p>

      {/* Tags */}
      {exp.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium font-mono tracking-[0.02em] px-2 py-1 rounded-md"
              style={{
                background: 'var(--bg-hover)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* External link */}
      {exp.link && (
        <a
          href={exp.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 mt-4 text-[12px] font-semibold text-[--accent-blue] hover:text-[#81d4fa] no-underline transition-colors duration-200 font-mono group/link"
        >
          <ExternalLink size={12} className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          {exp.linkLabel || 'View link'}
        </a>
      )}
    </div>
  );
}

export function Experiences() {
  const [sectionRef, sectionVisible] = useInView(0.05);

  return (
    <section id="experiences" className="max-w-[1000px] mx-auto px-5 md:px-10 py-20 md:py-28">
      {/* Section header */}
      <div
        ref={sectionRef}
        className="flex items-center gap-4 mb-12 transition-all duration-[600ms]"
        style={{
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(16px)',
        }}
      >
        <span className="section-label">// experience</span>
        <div className="section-rule" />
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-2">
        {experiences.length > 0 ? (
          experiences.map((exp, i) => (
            <ExperienceCard key={exp.title + exp.period} exp={exp} index={i} />
          ))
        ) : (
          <p className="text-[13px] text-[--text-muted] font-mono mt-2">
            No experiences added yet — edit{' '}
            <code className="text-[--accent-blue] bg-[--bg-hover] px-1 py-0.5 rounded">
              src/data/experiences.ts
            </code>{' '}
            to add your first one.
          </p>
        )}
      </div>
    </section>
  );
}
