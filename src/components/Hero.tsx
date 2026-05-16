import { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronRight, ExternalLink } from 'lucide-react';
import { useClock } from '../hooks/useClock';

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
const TARGET_NAME = 'Eric Han Wang';
const TICK_MS = 50;
const TOTAL_DURATION = 1200;

export function Hero() {
  const time = useClock();
  const [displayChars, setDisplayChars] = useState<string[]>(() =>
    Array(TARGET_NAME.length).fill('')
  );
  const [decodePhase, setDecodePhase] = useState<'scrambling' | 'done'>('scrambling');
  const [taglineVisible, setTaglineVisible] = useState(false);

  // Mutable refs for animation state (avoids closure issues)
  const lockedInRef = useRef<boolean[]>(Array(TARGET_NAME.length).fill(false));
  const lockTimesRef = useRef<number[]>(
    Array.from({ length: TARGET_NAME.length }, (_, i) =>
      TOTAL_DURATION * (0.1 + 0.7 * (i / TARGET_NAME.length) + 0.2 * Math.random())
    )
  );
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<number>(0);

  // Hacker decode animation
  useEffect(() => {
    lockedInRef.current = Array(TARGET_NAME.length).fill(false);
    lockTimesRef.current = Array.from({ length: TARGET_NAME.length }, (_, i) =>
      TOTAL_DURATION * (0.1 + 0.7 * (i / TARGET_NAME.length) + 0.2 * Math.random())
    );
    startTimeRef.current = 0;
    setDecodePhase('scrambling');
    setDisplayChars(Array(TARGET_NAME.length).fill(''));

    // Small delay before starting the scramble
    const startDelay = setTimeout(() => {
      startTimeRef.current = performance.now();

      intervalRef.current = setInterval(() => {
        const elapsed = performance.now() - startTimeRef.current;
        const lockedIn = lockedInRef.current;
        const lockTimes = lockTimesRef.current;

        setDisplayChars((prev) => {
          const newChars = [...prev];
          for (let i = 0; i < TARGET_NAME.length; i++) {
            if (lockedIn[i]) continue;
            if (elapsed >= lockTimes[i]) {
              lockedIn[i] = true;
              newChars[i] = TARGET_NAME[i];
            } else {
              newChars[i] = CHARSET[Math.floor(Math.random() * CHARSET.length)];
            }
          }
          return newChars;
        });

        // If we’ve reached the end, force-resolve to the target string character-by-character
        // (Prevents leaving tail chars scrambled, while keeping the “one at a time” feel.)
        if (elapsed >= TOTAL_DURATION) {
          clearInterval(intervalRef.current);

          // Build final chars in a final tick sequence so it doesn’t jump all at once.
          lockedInRef.current = Array(TARGET_NAME.length).fill(true);
          const finalChars = Array.from(TARGET_NAME);

          // Start from whatever we have right now.
          setDisplayChars((prev) => [...prev]);

          let idx = 0;
          const finalTimer = window.setInterval(() => {
            idx++;
            setDisplayChars((prev) => {
              const next = [...prev];
              for (let j = 0; j < idx; j++) next[j] = finalChars[j];
              return next;
            });
            if (idx >= finalChars.length) {
              window.clearInterval(finalTimer);
              setDisplayChars(finalChars);
              setDecodePhase('done');
            }
          }, TICK_MS);

          return;
        }

        // Check if all chars are locked (usually happens right around TOTAL_DURATION)
        if (lockedIn.every(Boolean)) {
          clearInterval(intervalRef.current);
          setDisplayChars(Array.from(TARGET_NAME));
          setDecodePhase('done');
          return;
        }
      }, TICK_MS);
    }, 200);

    return () => {
      clearTimeout(startDelay);
      clearInterval(intervalRef.current);
    };
  }, []);

  // Tagline fade in after decode
  useEffect(() => {
    if (decodePhase === 'done') {
      const t = setTimeout(() => setTaglineVisible(true), 200);
      return () => clearTimeout(t);
    }
  }, [decodePhase]);

  const timeStr = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'America/Chicago',
  });

  const taglineItems = [
    { text: 'CS + AI @ Carnegie Mellon University' },
    { text: 'Research: Neuromorphic Computing \u00b7 Quantum Systems \u00b7 Bio-Inspired Architectures' },
    { text: 'Building at the intersection of computation and nature' },
  ];

  const stats = [
    { value: '100+', label: 'Repos' },
    { value: '15+', label: 'Languages' },
    { value: '3', label: 'Research Areas' },
    { value: "CMU CS+AI '30", label: 'University' },
  ];

  const getLetterColor = (char: string, i: number) => {
    if (decodePhase === 'done') return 'var(--text-primary)';
    if (char === TARGET_NAME[i]) return 'var(--text-primary)';
    return 'rgba(79,195,247,0.7)';
  };

  return (
    <section className="min-h-screen flex flex-col justify-center px-5 md:px-10 max-w-[960px] mx-auto relative">
      {/* Ambient glow */}
      <div
        className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(79,195,247,0.06) 0%, transparent 70%)',
        }}
      />

      <div
        className="opacity-0 translate-y-[30px]"
        style={{ animation: 'heroEnter 0.9s cubic-bezier(0.4,0,0.2,1) forwards' }}
      >
        {/* Location + Clock */}
        <div className="flex items-center gap-2.5 mb-8">
          <div
            className="w-[7px] h-[7px] rounded-full shadow-[0_0_8px_var(--accent-blue)] pulse-dot"
            style={{ background: 'var(--accent-blue)' }}
          />
          <MapPin size={12} color="var(--accent-blue)" />
          <span className="font-mono text-[12.5px] text-[--text-muted] tracking-[0.04em]">
            Pittsburgh, PA {'\u00b7'} UTC-5 CDT {'\u00b7'} {timeStr}
          </span>
        </div>

        {/* English Name with hacker decode */}
        <h1
          className="hero-name-glow m-0 leading-none tracking-[-0.04em]"
          style={{ fontSize: 'clamp(48px, 8vw, 88px)' }}
        >
          {displayChars.map((char, i) => (
            <span
              key={i}
              className="decode-letter"
              style={{ color: getLetterColor(char, i) }}
            >
              {char === ' ' ? '\u00A0' : char || '\u00A0'}
            </span>
          ))}
        </h1>

        {/* Chinese Name */}
        <h2
          className="mt-1 leading-none tracking-[-0.04em] chinese-gradient"
          style={{
            fontSize: 'clamp(42px, 7vw, 72px)',
            fontWeight: 800,
            fontFamily: "'Ma Shan Zheng', 'ZCOOL XiaoWei', cursive",
            opacity: decodePhase === 'done' ? 1 : 0,
            transform: decodePhase === 'done' ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.3s',
          }}
        >
          {'\u738B\u7FF0'}
        </h2>

        {/* Tagline */}
        <ul
          className="mt-7 space-y-2.5 max-w-[580px] list-none p-0"
          style={{
            opacity: taglineVisible ? 1 : 0,
            transform: taglineVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {taglineItems.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-[15px] md:text-[17px] text-[--text-secondary] font-body leading-relaxed"
              style={{
                opacity: taglineVisible ? 1 : 0,
                transform: taglineVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}
            >
              <ChevronRight size={16} color="var(--accent-blue)" className="mt-0.5 shrink-0" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap gap-3.5 mt-9"
          style={{
            opacity: taglineVisible ? 1 : 0,
            transition: 'opacity 0.5s ease 0.3s',
          }}
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-7 py-3 rounded-[10px] font-bold text-sm no-underline tracking-[0.01em] cta-filled font-body"
          >
            View Projects <ChevronRight size={16} />
          </a>
          <a
            href="https://github.com/erichanwang"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-7 py-3 rounded-[10px] font-semibold text-sm no-underline cta-ghost font-body"
          >
            GitHub <ExternalLink size={14} />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-7 py-3 rounded-[10px] font-semibold text-sm no-underline cta-ghost font-body"
          >
            Contact Me
          </a>
          {/* TODO: Replace href="#" with actual resume PDF URL */}
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-7 py-3 rounded-[10px] font-semibold text-sm no-underline cta-ghost font-body"
          >
            Resume <ExternalLink size={14} />
          </a>
        </div>

        {/* Stats Row */}
        <div
          className="flex flex-wrap gap-8 md:gap-12 mt-[52px] pt-8 border-t border-[--border-subtle]"
          style={{
            opacity: taglineVisible ? 1 : 0,
            transition: 'opacity 0.5s ease 0.5s',
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div
                className="text-[22px] font-extrabold font-display tracking-[-0.03em]"
                style={{ color: 'var(--accent-blue)' }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-[--text-muted] font-mono tracking-[0.03em] mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes heroEnter {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
