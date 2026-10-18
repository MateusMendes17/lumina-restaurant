import React, { useState, useEffect } from 'react';
import { useLang } from './LangContext';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('btt.label')}
      className="no-print fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-emerald-300 text-black flex items-center justify-center shadow-lg shadow-emerald-900/40 hover:bg-emerald-400 active:bg-emerald-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-black"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default BackToTop;
