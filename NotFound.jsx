import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from './LangContext';

const NotFound = () => {
  const { t } = useLang();

  return (
    <section className="min-h-screen flex items-center justify-center bg-black px-6 pt-24 text-center">
      <div className="max-w-xl mx-auto">
        <div className="text-emerald-300 text-xs tracking-widest uppercase mb-6">{t('nf.label')}</div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight mb-6">
          {t('nf.title')}
        </h1>
        <p className="text-white/50 max-w-md mx-auto mb-10 font-light leading-relaxed">
          {t('nf.text')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-4 bg-emerald-300 text-black text-sm tracking-widest uppercase rounded-full font-medium hover:bg-emerald-400 active:bg-emerald-400 transition-all duration-300"
          >
            {t('nf.home')}
          </Link>
          <Link
            to="/#menu"
            className="px-8 py-4 border border-white/30 text-white text-sm tracking-widest uppercase rounded-full hover:border-white/60 hover:bg-white/10 active:bg-white/10 transition-all duration-300"
          >
            {t('nf.menu')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
