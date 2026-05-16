import { researchAreas } from '../data/research';
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


    </section>
  );
}
