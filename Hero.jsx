import React from 'react';
import { useLang } from './LangContext';

const Hero = () => {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Lumina Restaurant Ambience"
          className="w-full h-full object-cover"
          width="1920"
          height="1072"
          fetchPriority="high"
          decoding="async"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 px-6 pt-24 pb-12 text-center max-w-5xl mx-auto">
        {/* Main headline */}
        <h1 className="text-[2.75rem] sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[1.05] mb-6 animate-fade-in-up delay-100 text-white">
          Lumina
          <br />
          <span className="text-emerald-200">Restaurant</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 sm:mb-12 font-light leading-relaxed animate-fade-in-up delay-200">
          {t('hero.sub')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <a
            href="#reserva"
            className="group relative w-full sm:w-auto px-10 py-4 bg-emerald-200 text-gray-900 text-sm tracking-widest uppercase rounded-full overflow-hidden transition-all duration-500 hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-black"
          >
            <span className="relative z-10">{t('cta.reserve')}</span>
            <span className="absolute inset-0 bg-black/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
          </a>
          <a
            href="#menu"
            className="w-full sm:w-auto px-10 py-4 border border-white/30 text-white text-sm tracking-widest uppercase rounded-full hover:border-white/60 hover:bg-white/10 active:bg-white/10 transition-all duration-300 backdrop-blur-sm text-center"
          >
            {t('hero.ctaMenu')}
          </a>
        </div>
      </div>

      {/* Floating decorative elements - adapted to image */}
      <div className="hidden sm:block absolute top-20 right-10 w-2 h-2 bg-emerald-200/40 rounded-full animate-pulse-slow" />
      <div className="hidden sm:block absolute bottom-20 left-10 w-1 h-1 bg-emerald-200/30 rounded-full animate-pulse-slow delay-1000" />
      <div className="hidden sm:block absolute top-1/3 right-20 w-3 h-3 border border-emerald-200/30 rounded-full animate-spin-slow" />
    </section>
  );
};

export default Hero;
