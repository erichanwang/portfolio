import { useState } from 'react';
import { MapPin, Phone, Mail, Copy, Check } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { Certifications } from './Certifications';

interface ContactItem {
  icon: 'MapPin' | 'Phone' | 'Mail';
  value: string;
  label: string;
  href?: string;
  copyable: boolean;
}

const contactItems: ContactItem[] = [
  {
    icon: 'MapPin',
    value: 'Pittsburgh, PA',
    label: 'Location',
    copyable: true,
  },
  {
    icon: 'Phone',
    value: '+1 979 402 8365',
    label: 'Personal',
    href: 'tel:+19794028365',
    copyable: true,
  },
  {
    icon: 'Mail',
    value: 'ericwang559@gmail.com',
    label: 'Personal',
    href: 'mailto:ericwang559@gmail.com',
    copyable: true,
  },
  {
    icon: 'Mail',
    value: 'ehw2@andrew.cmu.edu',
    label: 'Carnegie Mellon',
    href: 'mailto:ehw2@andrew.cmu.edu',
    copyable: true,
  },
  // TODO: Add work/startup contact when ready
];

function ContactRow({ item, index }: { item: ContactItem; index: number }) {
  const [ref, visible] = useInView(0.1);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
    }
  };

  const IconComponent = item.icon === 'MapPin' ? MapPin : item.icon === 'Phone' ? Phone : Mail;
  const iconColor = item.icon === 'Mail' && item.label === 'Carnegie Mellon' ? '#ce93d8' : 'var(--accent-blue)';

  return (
    <div
      ref={ref}
      className="contact-row flex items-center gap-4 py-4 px-4 rounded-xl transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <IconComponent size={18} color={iconColor} className="shrink-0" />

      <div className="flex-1 min-w-0">
        {item.href ? (
          <a
            href={item.href}
            className="text-[14px] md:text-[15px] text-[--text-primary] no-underline hover:text-[--accent-blue] transition-colors font-body"
          >
            {item.value}
          </a>
        ) : (
          <span className="text-[14px] md:text-[15px] text-[--text-primary] font-body">
            {item.value}
          </span>
        )}
      </div>

      <span
        className="text-[10px] font-semibold tracking-[0.05em] uppercase px-2 py-0.5 rounded border font-mono"
        style={{
          background: 'rgba(79,195,247,0.08)',
          color: iconColor,
          borderColor: 'rgba(79,195,247,0.15)',
        }}
      >
        {item.label}
      </span>

      {item.copyable && (
        <button
          onClick={handleCopy}
          className="copy-btn flex items-center justify-center w-8 h-8 rounded-lg bg-transparent border border-[--border-subtle] cursor-pointer hover:bg-[--bg-hover] transition-all"
          aria-label={`Copy ${item.value}`}
        >
          {copied ? (
            <Check size={14} color="var(--accent-teal)" />
          ) : (
            <Copy size={13} color="var(--text-muted)" />
          )}
        </button>
      )}
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="max-w-[640px] mx-auto px-5 md:px-10 py-20 md:py-24">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-10">
        <span className="section-label">// contact me</span>
        <div className="section-rule" />
      </div>

      <div className="space-y-1">
        {contactItems.map((item, i) => (
          <ContactRow key={item.value} item={item} index={i} />
        ))}
      </div>

      {/* Certifications (hidden by default) */}
      <Certifications />
    </section>
  );
}
