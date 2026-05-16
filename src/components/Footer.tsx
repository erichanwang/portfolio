import { Code2, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[--border-subtle] py-7 px-5 md:px-10 max-w-[960px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
      <span className="text-[12px] text-[--text-muted] font-mono">
        {'\u00A9'} 2026 Eric Han Wang {'\u00B7'} github.com/erichanwang
        {/* TODO: Update footer link when domain is purchased */}
      </span>
      <div className="flex items-center gap-5">
        <a
          href="https://github.com/erichanwang"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-[12px] text-[--text-muted] hover:text-[--accent-blue] font-mono no-underline transition-colors"
        >
          <Code2 size={13} />
          GitHub
        </a>
        <a
          href="mailto:ericwang559@gmail.com"
          className="flex items-center gap-1.5 text-[12px] text-[--text-muted] hover:text-[--accent-blue] font-mono no-underline transition-colors"
        >
          <Mail size={13} />
          Email
        </a>
      </div>
    </footer>
  );
}
