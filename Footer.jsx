import React from 'react';
import { Link } from 'react-router-dom';
import OpenStatus from './OpenStatus';
import { useLang } from './LangContext';

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Rua%20da%20Luz%2C%201200-247%20Lisboa';

const Footer = () => {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="no-print bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-light tracking-widest text-white mb-4">LUMINA</div>
            <OpenStatus className="text-emerald-300 mb-4" />
            <p className="text-white/50 text-sm leading-relaxed font-light mb-6">
              {t('foot.tagline')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-300/10 hover:border-emerald-300/30 transition-all duration-300" aria-label="Instagram">
                <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-300/10 hover:border-emerald-300/30 transition-all duration-300" aria-label="Facebook">
                <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-300/10 hover:border-emerald-300/30 transition-all duration-300" aria-label="TripAdvisor">
                <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm-1.414 14.667c-.736 0-1.392-.562-1.44-1.267l-.11-1.633c.017-2.382 1.375-4.403 3.71-4.856.21-.04.42-.077.617-.11.27-.048.507-.123.704-.23.23-.13.42-.294.56-.49.14-.195.23-.43.23-.707 0-.25-.05-.463-.11-.677-.07-.195-.183-.39-.327-.547-.185-.185-.42-.322-.695-.417a7.87 7.87 0 00-.73-.383c-.385-.18-.8-.323-1.248-.42l-1.84-.41c-.39-.09-.74-.22-1.03-.4-.29-.18-.517-.4-.68-.66-.16-.27-.24-.58-.24-.947 0-.61.22-1.15.63-1.61.4-.46.975-.8 1.7-.99.7-.19 1.448-.3 2.22-.3 1.035 0 1.99.145 2.86.45.87.31 1.55.77 2.04 1.37.49.59.73 1.33.73 2.23 0 1.047-.36 1.945-1.06 2.695-.71.75-1.7 1.12-2.98 1.12zm5.495-12.492c-.767 0-1.41.657-1.41 1.464 0 .806.643 1.464 1.41 1.464.796 0 1.44-.658 1.44-1.464 0-.807-.644-1.464-1.44-1.464zm0 9.084c-.767 0-1.41.657-1.41 1.464 0 .806.643 1.464 1.41 1.464.796 0 1.44-.658 1.44-1.464 0-.807-.644-1.464-1.44-1.464z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-emerald-300 mb-4">{t('foot.contact')}</h4>
            <address className="not-italic text-white/60 text-sm leading-relaxed font-light space-y-3">
              <p>Rua da Luz, 1200-247 Lisboa</p>
              <p>Portugal</p>
              <p className="mt-2">
                <a href="tel:+351210634213" className="hover:text-emerald-300 transition-colors">+351 210 634 213</a>
              </p>
              <p>
                <a href="mailto:reservas@lumina.pt" className="hover:text-emerald-300 transition-colors">reservas@lumina.pt</a>
              </p>
              <p>
                <a href="mailto:eventos@lumina.pt" className="hover:text-emerald-300 transition-colors">eventos@lumina.pt</a>
              </p>
              <p>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors py-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t('foot.directions')}
                </a>
              </p>
            </address>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-emerald-300 mb-4">{t('foot.hours')}</h4>
            <dl className="text-white/60 text-sm font-light space-y-2">
              <div className="flex justify-between gap-4">
                <dt>{t('foot.monThu')}</dt>
                <dd className="text-white/70">12:00 – 15:00 / 19:00 – 23:00</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>{t('foot.friSat')}</dt>
                <dd className="text-white/70">12:00 – 15:00 / 19:00 – 23:30</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>{t('foot.sun')}</dt>
                <dd className="text-white/70">12:00 – 16:00 {t('foot.sunNote')}</dd>
              </div>
            </dl>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-emerald-300 mb-4">{t('foot.useful')}</h4>
            <nav className="space-y-2">
              <Link to="/vinhos" className="block text-white/60 text-sm hover:text-emerald-300 transition-colors font-light py-1">{t('foot.wineList')}</Link>
              <Link to="/#menu" className="block text-white/60 text-sm hover:text-emerald-300 transition-colors font-light py-1">{t('foot.menuKitchen')}</Link>
              <Link to="/sobre" className="block text-white/60 text-sm hover:text-emerald-300 transition-colors font-light py-1">{t('foot.about')}</Link>
              <Link to="/galeria" className="block text-white/60 text-sm hover:text-emerald-300 transition-colors font-light py-1">{t('foot.gallery')}</Link>
              <Link to="/#reserva" className="block text-white/60 text-sm hover:text-emerald-300 transition-colors font-light py-1">{t('foot.reserve')}</Link>
              <a href="mailto:eventos@lumina.pt?subject=Eventos%20Privados" className="block text-white/60 text-sm hover:text-emerald-300 transition-colors font-light py-1">{t('foot.events')}</a>
              <a href="mailto:reservas@lumina.pt?subject=Voucher%20de%20Oferta" className="block text-white/60 text-sm hover:text-emerald-300 transition-colors font-light py-1">{t('foot.vouchers')}</a>
              <a href="mailto:recrutamento@lumina.pt?subject=Candidatura%20Espont%C3%A2nea" className="block text-white/60 text-sm hover:text-emerald-300 transition-colors font-light py-1">{t('foot.careers')}</a>
              <a href="mailto:imprensa@lumina.pt?subject=Pedido%20de%20Imprensa" className="block text-white/60 text-sm hover:text-emerald-300 transition-colors font-light py-1">{t('foot.press')}</a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-light">
            © {currentYear} Lumina. {t('foot.rights')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/40 font-light">
            <Link to="/legal#privacidade" className="hover:text-emerald-300 transition-colors py-1">{t('foot.privacy')}</Link>
            <span aria-hidden="true">·</span>
            <Link to="/legal#termos" className="hover:text-emerald-300 transition-colors py-1">{t('foot.terms')}</Link>
            <span aria-hidden="true">·</span>
            <Link to="/legal#acessibilidade" className="hover:text-emerald-300 transition-colors py-1">{t('foot.accessibility')}</Link>
            <span aria-hidden="true">·</span>
            <Link to="/legal#cookies" className="hover:text-emerald-300 transition-colors py-1">{t('foot.cookies')}</Link>
          </div>
          <p className="text-white/40 text-sm font-light">
            {t('foot.madeWith')} <span className="text-red-500">♥</span> {t('foot.for')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;