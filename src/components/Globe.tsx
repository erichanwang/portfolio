import { useEffect, useRef, useState, useCallback } from 'react';
import { GraduationCap } from 'lucide-react';
import GlobeGL from 'react-globe.gl';

// Pittsburgh, PA coordinates
const PITTSBURGH_LAT = 40.44;
const PITTSBURGH_LON = -79.99;

// Night earth texture — dark globe with city lights, fits the portfolio theme
const GLOBE_IMAGE_URL = '//unpkg.com/three-globe/example/img/earth-night.jpg';

// College Station, TX coordinates
const COLLEGE_STATION_LAT = 30.63;
const COLLEGE_STATION_LON = -96.33;

interface CityDot {
  lat: number;
  lng: number;
  size: number;
  color: string;
  label: string;
}

interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

export function Globe() {
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dims, setDims] = useState({ w: 340, h: 380 });
  const [popupVisible, setPopupVisible] = useState(false);
  const [hoveredCity, setHoveredCity] = useState<'Pittsburgh' | 'College Station'>('Pittsburgh');
  const [pghTime, setPghTime] = useState('');
  const [csTime, setCsTime] = useState('');

  // ── Live clocks for popups ────────────────────────────
  const updateClocks = useCallback(() => {
    setPghTime(
      new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'America/New_York',
      })
    );
    setCsTime(
      new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'America/Chicago',
      })
    );
  }, []);

  // Cleanup hide timer on unmount
  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!popupVisible) return;
    updateClocks();
    const id = setInterval(updateClocks, 1000);
    return () => clearInterval(id);
  }, [popupVisible, updateClocks]);

  // ── Responsive sizing via ResizeObserver ──────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        setDims({ w: width, h: height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Point globe at Pittsburgh + slow auto-rotation ────
  useEffect(() => {
    const el = globeEl.current;
    if (!el) return;

    // Delay so the globe initializes first
    const timer = setTimeout(() => {
      // Point camera at Pittsburgh initially
      el.pointOfView({ lat: PITTSBURGH_LAT, lng: PITTSBURGH_LON, altitude: 1.9 }, 1500);

      // Enable auto-rotation with momentum (slippery drag)
      const controls = el.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.45;
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // ── Pittsburgh + College Station markers ───────────────
  const points: CityDot[] = [
    { lat: PITTSBURGH_LAT, lng: PITTSBURGH_LON, size: 0.12, color: 'rgba(204,255,0,0.35)', label: 'Pittsburgh' },
    { lat: COLLEGE_STATION_LAT, lng: COLLEGE_STATION_LON, size: 0.10, color: 'rgba(128,203,196,0.30)', label: 'College Station' },
  ];

  // ── Pulsing rings ─────────────────────────────────────
  const rings = [
    { lat: PITTSBURGH_LAT, lng: PITTSBURGH_LON, maxR: 2.5, propagationSpeed: 2.5, repeatPeriod: 1800, color: '#CCFF00' },
    { lat: COLLEGE_STATION_LAT, lng: COLLEGE_STATION_LON, maxR: 2.0, propagationSpeed: 2.0, repeatPeriod: 2000, color: '#80CBC4' },
  ];

  // ── Arc from College Station → Pittsburgh ─────────────
  const arcs: ArcData[] = [
    { startLat: COLLEGE_STATION_LAT, startLng: COLLEGE_STATION_LON, endLat: PITTSBURGH_LAT, endLng: PITTSBURGH_LON, color: 'rgba(128,203,196,0.25)' },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[420px] md:min-h-[620px] relative"
    >
      {/* Popup label on hover — Pittsburgh */}
      {popupVisible && hoveredCity === 'Pittsburgh' && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          style={{ animation: 'popupEnter 0.25s cubic-bezier(0.4,0,0.2,1) forwards' }}
        >
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className="w-[9px] h-[9px] rounded-full shadow-[0_0_10px_#CCFF00]"
                style={{ background: 'rgba(204,255,0,0.45)', border: '2px solid #CCFF00' }}
              />
              <span className="text-[14px] font-bold text-[var(--text-primary)] font-display tracking-[-0.01em]">
                Pittsburgh, PA
              </span>
              <span className="text-[10.5px] text-[var(--text-muted)] font-mono">
                40.44°N 79.99°W
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-[--text-secondary] font-body">
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap size={13} color="var(--accent-blue)" />
                Carnegie Mellon University
              </span>
              <span className="text-[--text-muted]">·</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[--accent-blue]">
                {pghTime || '--:--:--'} EST/EDT
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Popup label on hover — College Station */}
      {popupVisible && hoveredCity === 'College Station' && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          style={{ animation: 'popupEnter 0.25s cubic-bezier(0.4,0,0.2,1) forwards' }}
        >
          <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className="w-[9px] h-[9px] rounded-full shadow-[0_0_10px_#80CBC4]"
                style={{ background: 'rgba(128,203,196,0.45)', border: '2px solid #80CBC4' }}
              />
              <span className="text-[14px] font-bold text-[var(--text-primary)] font-display tracking-[-0.01em]">
                College Station, TX
              </span>
              <span className="text-[10.5px] text-[var(--text-muted)] font-mono">
                30.63°N 96.33°W
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-[--text-secondary] font-body">
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap size={13} color="var(--accent-teal)" />
                College Station High School
              </span>
              <span className="text-[--text-muted]">·</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[--accent-teal]">
                {csTime || '--:--:--'} CST/CDT
              </span>
            </div>
          </div>
        </div>
      )}

      <GlobeGL
        ref={globeEl}
        width={dims.w}
        height={dims.h}
        globeImageUrl={GLOBE_IMAGE_URL}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere
        atmosphereColor="#4fc3f7"
        atmosphereAltitude={0.15}
        pointsData={points}
        pointColor="color"
        pointRadius={2.75}
        onPointHover={(point) => {
          if (hideTimer.current) {
            clearTimeout(hideTimer.current);
            hideTimer.current = null;
          }
          if (point !== null) {
            const p = point as CityDot;
            setHoveredCity(p.label as 'Pittsburgh' | 'College Station');
            setPopupVisible(true);
          } else {
            hideTimer.current = setTimeout(() => setPopupVisible(false), 0);
          }
        }}
        arcsData={arcs}
        arcColor="color"
        arcStroke={1.0}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={3000}
        arcsTransitionDuration={0}
        ringsData={rings}
        ringColor="color"
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
      />

      <style>{`
        @keyframes popupEnter {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

      `}</style>
    </div>
  );
}
