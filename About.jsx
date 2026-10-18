import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from './LangContext';

const values = [
  { key: 'v1' },
  { key: 'v2' },
  { key: 'v3' },
];

const About = () => {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-emerald-300 text-xs tracking-widest uppercase block mb-4">{t('about.label')}</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-8">
            {t('about.title')}
          </h1>
          <div className="space-y-5 text-white/60 leading-relaxed font-light text-lg">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
          </div>
        </div>
      </section>

      {/* Banda de imagem com citação */}
      <section className="relative h-[40vh] min-h-[280px] overflow-hidden">
        <img
          src="/hero-bg.jpg"
          alt={t('about.imgAlt')}
          width="1920"
          height="1072"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/25 to-black" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p className="text-2xl sm:text-3xl md:text-4xl font-light text-center text-white/90 max-w-3xl leading-snug">
            {t('about.quote')}
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className="py-24 md:py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div
              key={value.key}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:border-emerald-300/30 transition-colors duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-px bg-emerald-300 mb-6" />
              <h2 className="text-xl font-light tracking-tight mb-3">{t(`about.${value.key}t`)}</h2>
              <p className="text-white/60 text-sm leading-relaxed font-light">{t(`about.${value.key}d`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Números */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {[
            { value: '2019', label: t('about.since') },
            { value: '36', label: t('about.seats') },
            { value: '120+', label: t('about.wines') },
            { value: '40', label: t('about.producers') },
          ].map((stat) => (
            <div key={stat.label} className="bg-black py-10 text-center">
              <div className="text-3xl md:text-4xl font-light text-emerald-300">{stat.value}</div>
              <div className="text-xs tracking-widest uppercase text-white/40 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/#reserva"
            className="px-8 py-4 bg-emerald-300 text-black text-sm tracking-widest uppercase rounded-full font-medium text-center hover:bg-emerald-400 transition-all duration-300"
          >
            {t('cta.reserve')}
          </Link>
          <Link
            to="/galeria"
            className="px-8 py-4 border border-white/30 text-white text-sm tracking-widest uppercase rounded-full text-center hover:border-white/60 hover:bg-white/10 transition-all duration-300"
          >
            {t('about.ctaGallery')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
