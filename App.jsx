import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LangProvider, useLang } from './LangContext';
import { track } from './analytics';
import Hero from './Hero';
import Menu from './Menu';
import ReservationForm from './ReservationForm';
import Reviews from './Reviews';
import Footer from './Footer';
import DishDetail from './DishDetail';
import NotFound from './NotFound';
import Legal from './Legal';
import Wines from './Wines';
import About from './About';
import Gallery from './Gallery';
import MenuPrint from './MenuPrint';
import ErrorBoundary from './ErrorBoundary';
import BackToTop from './BackToTop';

const HomePage = () => (
  <>
    <Hero />
    <Menu />
    <Reviews />
    <ReservationForm />
  </>
);

// Rola para a âncora ou topo + regista page views
const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  const { t, lang } = useLang();

  useEffect(() => {
    track('page_view');
  }, [pathname]);

  // Título dinâmico por rota e idioma (as páginas de prato definem o seu próprio)
  useEffect(() => {
    if (pathname.startsWith('/prato/')) return;
    const key =
      pathname === '/' ? 'meta.home'
      : pathname.startsWith('/sobre') ? 'meta.about'
      : pathname.startsWith('/galeria') ? 'meta.gallery'
      : pathname.startsWith('/vinhos') ? 'meta.wines'
      : pathname.startsWith('/menu') ? 'meta.menu'
      : pathname.startsWith('/legal') ? 'meta.legal'
      : 'meta.404';
    document.title = t(key);
  }, [pathname, lang, t]);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0 });
        }
      }, 80);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
};

// Seletor de idioma PT/EN
const LangSwitch = ({ className = '' }) => {
  const { lang, setLang, t } = useLang();
  return (
    <div className={`flex items-center gap-1 text-xs tracking-widest border border-white/15 rounded-full p-1 ${className}`} role="group" aria-label={t('lang.label')}>
      <button
        onClick={() => setLang('pt')}
        aria-pressed={lang === 'pt'}
        className={`px-2.5 py-1 rounded-full transition-colors duration-300 ${
          lang === 'pt' ? 'bg-emerald-300 text-black font-medium' : 'text-white/50 hover:text-white'
        }`}
      >
        PT
      </button>
      <button
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`px-2.5 py-1 rounded-full transition-colors duration-300 ${
          lang === 'en' ? 'bg-emerald-300 text-black font-medium' : 'text-white/50 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
};

const NavAnchor = ({ to, onClick, className, children }) => {
  const location = useLocation();
  const [path, anchor] = to.split('#');

  const handleClick = (e) => {
    if (location.pathname === path && location.hash === `#${anchor}`) {
      e.preventDefault();
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    if (onClick) onClick();
  };

  return (
    <Link to={to} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};

const LogoLink = ({ onClick }) => {
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (onClick) onClick();
  };

  return (
    <Link to="/" onClick={handleClick} className="flex flex-col items-start group">
      <div className="text-2xl font-light tracking-widest text-white group-hover:text-emerald-300 transition-colors duration-300">LUMINA</div>
      <div className="text-xs tracking-widest text-emerald-300 mt-1">restaurant</div>
    </Link>
  );
};

const AppShell = () => {
  const { t } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const overlayRef = useRef(null);

  // Bloquear scroll do corpo quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Focus trap no menu mobile
  useEffect(() => {
    if (!mobileMenuOpen || !overlayRef.current) return;
    const overlay = overlayRef.current;
    const focusables = overlay.querySelectorAll('a[href], button:not([disabled])');
    if (focusables.length) focusables[0].focus();

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      const items = overlay.querySelectorAll('a[href], button:not([disabled])');
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    overlay.addEventListener('keydown', handleTab);
    document.addEventListener('keydown', handleEsc);
    return () => {
      overlay.removeEventListener('keydown', handleTab);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-black text-white font-serif antialiased overflow-x-hidden">
      {/* Skip-link (acessibilidade) */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:px-5 focus:py-3 focus:bg-emerald-300 focus:text-black focus:text-sm focus:tracking-wider focus:rounded-full"
      >
        Saltar para o conteúdo
      </a>

      {/* Navigation */}
      <nav className="no-print fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <LogoLink onClick={closeMobileMenu} />
          <div className="hidden md:flex items-center gap-8">
            <Link to="/sobre" className="text-sm tracking-wider hover:text-emerald-300 transition-colors duration-300 py-2">{t('nav.about')}</Link>
            <Link to="/galeria" className="text-sm tracking-wider hover:text-emerald-300 transition-colors duration-300 py-2">{t('nav.gallery')}</Link>
            <NavAnchor to="/#reserva" className="text-sm tracking-wider hover:text-emerald-300 transition-colors duration-300 py-2">{t('nav.reservations')}</NavAnchor>
            <LangSwitch />
          </div>
          <div className="flex md:hidden items-center gap-3">
            <LangSwitch />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white w-11 h-11 -mr-2 flex items-center justify-center"
              aria-label={mobileMenuOpen ? t('aria.closeMenu') : t('aria.openMenu')}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className={`no-print md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-lg transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col justify-center min-h-full px-6 pb-16 pt-28">
          <nav className="flex flex-col gap-2">
            <Link
              to="/sobre"
              onClick={closeMobileMenu}
              className="py-4 text-3xl font-light tracking-wide text-white border-b border-white/10 active:text-emerald-300 transition-colors"
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/galeria"
              onClick={closeMobileMenu}
              className="py-4 text-3xl font-light tracking-wide text-white border-b border-white/10 active:text-emerald-300 transition-colors"
            >
              {t('nav.gallery')}
            </Link>
            <NavAnchor
              to="/#reserva"
              onClick={closeMobileMenu}
              className="py-4 text-3xl font-light tracking-wide text-white border-b border-white/10 active:text-emerald-300 transition-colors"
            >
              {t('nav.reservations')}
            </NavAnchor>
          </nav>
          <Link
            to="/#reserva"
            onClick={closeMobileMenu}
            className="mt-10 w-full py-4 bg-emerald-300 text-black text-sm tracking-widest uppercase rounded-full font-medium text-center active:bg-emerald-400 transition-all duration-300"
          >
            {t('cta.reserve')}
          </Link>
        </div>
      </div>

      <main id="conteudo">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/prato/:slug" element={<DishDetail />} />
            <Route path="/vinhos" element={<Wines />} />
            <Route path="/menu" element={<MenuPrint />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <ScrollManager />
        <AppShell />
      </BrowserRouter>
    </LangProvider>
  );
}

export default App;
