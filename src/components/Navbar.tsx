import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { LogoPlaceholder } from '../assets/LogoPlaceholder';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Research', href: '#research' },
    { label: 'Experience', href: '#experiences' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between h-[60px] px-5 md:px-10 transition-all duration-[400ms] ${
          scrolled
            ? 'glass border-b border-[--border-subtle]'
            : ''
        }`}
        style={{
          background: scrolled ? 'rgba(14,21,32,0.85)' : 'transparent',
        }}
      >
        {/* Logo — click to scroll to top */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigate('/');
            }
          }}
          className="flex items-center gap-2 no-underline"
          aria-label="Scroll to top"
        >
          <LogoPlaceholder size={32} />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-[13px] font-medium text-[--text-secondary] hover:text-[--text-primary] no-underline transition-colors duration-200 font-body"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-[--text-secondary] hover:text-[--text-primary] transition-colors bg-transparent border-none cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[99] md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="absolute inset-0 glass flex flex-col items-center justify-center gap-10" onClick={() => setMobileOpen(false)}
            style={{ background: 'rgba(14,21,32,0.95)' }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-2xl font-bold text-[--text-secondary] hover:text-[--accent-blue] no-underline transition-colors duration-200 font-display tracking-[-0.02em]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
