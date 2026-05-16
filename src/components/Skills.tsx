import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '../data/skills';
import { useInView } from '../hooks/useInView';

function SkillPill({ name, index }: { name: string; index: number }) {
  const [ref, visible] = useInView(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className="skill-pill flex items-center gap-2 px-3.5 py-2.5 rounded-[10px] border border-[--border-subtle] cursor-default"
      style={{ background: 'var(--bg-surface)' }}
    >
      {/* First letter as icon mark */}
      <span className="text-[11px] font-bold text-[--accent-blue] opacity-70 font-mono w-4 text-center">
        {name[0]}
      </span>
      <span className="text-[12px] font-medium text-[--text-secondary] font-mono">
        {name}
      </span>
    </motion.div>
  );
}

export function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);
  const [sectionRef, sectionVisible] = useInView(0.05);

  const activeCategory = skillCategories.find((c) => c.id === activeTab) ?? skillCategories[0];

  return (
    <section id="skills" className="max-w-[960px] mx-auto px-5 md:px-10 py-20 md:py-24">
      <div
        ref={sectionRef}
        className="flex items-center gap-4 mb-10 transition-all duration-600"
        style={{
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(16px)',
        }}
      >
        <span className="section-label">// skills & tools</span>
        <div className="section-rule" />
      </div>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 mb-8 border-b border-[--border-subtle]">
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`skills-tab px-4 py-2.5 text-[12px] font-medium font-mono tracking-[0.03em] bg-transparent border-0 border-b-2 cursor-pointer transition-colors duration-200 -mb-[1px] ${
              activeTab === cat.id
                ? 'border-[--accent-blue] text-[--accent-blue]'
                : 'border-transparent text-[--text-muted] hover:text-[--text-secondary]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="grid gap-2.5"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}
        >
          {activeCategory.skills.map((skill, i) => (
            <SkillPill key={skill} name={skill} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
