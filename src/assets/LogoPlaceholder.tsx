// TODO: Replace SVG placeholder with real logo asset

export function LogoPlaceholder({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Radial spokes */}
      <line x1="16" y1="16" x2="16" y2="4"   stroke="#4fc3f7" strokeWidth="1"   opacity="0.6"/>
      <line x1="16" y1="16" x2="16" y2="28"  stroke="#4fc3f7" strokeWidth="1"   opacity="0.6"/>
      <line x1="16" y1="16" x2="4"  y2="16"  stroke="#80cbc4" strokeWidth="1"   opacity="0.6"/>
      <line x1="16" y1="16" x2="28" y2="16"  stroke="#80cbc4" strokeWidth="1"   opacity="0.6"/>
      <line x1="16" y1="16" x2="7"  y2="7"   stroke="#4fc3f7" strokeWidth="0.8" opacity="0.4"/>
      <line x1="16" y1="16" x2="25" y2="7"   stroke="#4fc3f7" strokeWidth="0.8" opacity="0.4"/>
      <line x1="16" y1="16" x2="7"  y2="25"  stroke="#ce93d8" strokeWidth="0.8" opacity="0.4"/>
      <line x1="16" y1="16" x2="25" y2="25"  stroke="#ce93d8" strokeWidth="0.8" opacity="0.4"/>
      {/* Outer terminal dots */}
      <circle cx="16" cy="4"  r="1.5" fill="#4fc3f7" opacity="0.7"/>
      <circle cx="16" cy="28" r="1.5" fill="#4fc3f7" opacity="0.7"/>
      <circle cx="4"  cy="16" r="1.5" fill="#80cbc4" opacity="0.7"/>
      <circle cx="28" cy="16" r="1.5" fill="#80cbc4" opacity="0.7"/>
      <circle cx="7"  cy="7"  r="1.2" fill="#4fc3f7" opacity="0.4"/>
      <circle cx="25" cy="7"  r="1.2" fill="#4fc3f7" opacity="0.4"/>
      <circle cx="7"  cy="25" r="1.2" fill="#ce93d8" opacity="0.4"/>
      <circle cx="25" cy="25" r="1.2" fill="#ce93d8" opacity="0.4"/>
      {/* Center ring + core */}
      <circle cx="16" cy="16" r="5.5" fill="#0e1520" stroke="#4fc3f7" strokeWidth="1.2"/>
      <circle cx="16" cy="16" r="2"   fill="#4fc3f7"/>
    </svg>
  );
}
