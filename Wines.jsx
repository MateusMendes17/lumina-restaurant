import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from './LangContext';

const wineSections = [
  {
    id: 'espumantes',
    titleKey: 'wines.sec.esp',
    subtitleKey: 'wines.sub.esp',
    wines: [
      { name: 'Quinta da Lixa Grande Reserva Brut', region: 'Vinho Verde · Lixa', glass: '9€', bottle: '42€' },
      { name: 'Caves Aliança Aliança Brut', region: 'Dão · Mangualde', glass: '8€', bottle: '36€' },
      { name: 'Champagne Billecart-Salmon Brut Réserve', region: 'Champagne · França', glass: '22€', bottle: '140€' },
    ],
  },
  {
    id: 'brancos',
    titleKey: 'wines.sec.white',
    subtitleKey: 'wines.sub.white',
    wines: [
      { name: 'Alvarinho Parcela Única — Anselmo Mendes', region: 'Vinho Verde · Monção', glass: '12€', bottle: '58€' },
      { name: 'Alvarinho Seleção — Soalheiro', region: 'Vinho Verde · Melgaço', glass: '11€', bottle: '52€' },
      { name: 'Encruzado — Quinta dos Carvalhais', region: 'Dão · Mangualde', glass: '10€', bottle: '48€' },
      { name: 'Antão Vaz Reserva — Herdade do Esporão', region: 'Alentejo · Reguengos', glass: '10€', bottle: '46€' },
      { name: 'Loureiro Quinta do Ameal', region: 'Vinho Verde · Lima', glass: '9€', bottle: '44€' },
    ],
  },
  {
    id: 'tintos',
    titleKey: 'wines.sec.red',
    subtitleKey: 'wines.sub.red',
    wines: [
      { name: 'Touriga Nacional — Quinta do Vallado', region: 'Douro · Corgo', glass: '14€', bottle: '72€' },
      { name: 'Crasto Superior — Quinta do Crasto', region: 'Douro · Douro', glass: '13€', bottle: '64€' },
      { name: 'Esporão Reserva — Herdade do Esporão', region: 'Alentejo · Reguengos', glass: '12€', bottle: '58€' },
      { name: 'Vinho de Talha Baga — Luís Pato', region: 'Bairrada · Ílhavo', glass: '11€', bottle: '54€' },
      { name: 'Grande Reserva Jaen — João Portugal Ramos', region: 'Dão · Vilar de Frades', glass: '9€', bottle: '40€' },
    ],
  },
  {
    id: 'doces',
    titleKey: 'wines.sec.sweet',
    subtitleKey: 'wines.sub.sweet',
    wines: [
      { name: 'Porto Tawny 10 Anos — Kopke', region: 'Douro · Gaia', glass: '8€', bottle: '48€' },
      { name: 'Porto LBV — Niepoort', region: 'Douro · Gaia', glass: '9€', bottle: '52€' },
      { name: 'Porto Vintage 2011 — Quinta do Noval', region: 'Douro · Gaia', glass: '16€', bottle: '95€' },
      { name: 'Moscatel de Setúbal Superior — J.M. da Fonseca', region: 'Setúbal · Azeitão', glass: '7€', bottle: '38€' },
    ],
  },
];

const Wines = () => {
  const { t } = useLang();

  return (
    <article className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Link to="/#menu" className="inline-flex items-center gap-2 text-emerald-300 text-sm tracking-wider hover:underline mb-10 py-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('wines.back')}
        </Link>

        <div className="mb-16">
          <span className="text-emerald-300 text-xs tracking-widest uppercase block mb-4">{t('wines.label')}</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6">
            {t('wines.title')}
          </h1>
          <p className="text-white/60 text-lg font-light leading-relaxed max-w-2xl">
            {t('wines.desc')}
          </p>
        </div>

        {/* Secções de vinho */}
        <div className="space-y-16">
          {wineSections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 animate-fade-in-up">
              <div className="flex items-center gap-4 mb-2 pb-3 border-b border-white/10">
                <div className="w-10 h-px bg-emerald-300 flex-shrink-0" />
                <h2 className="text-2xl md:text-3xl font-light tracking-tight">{t(section.titleKey)}</h2>
              </div>
              <p className="text-white/40 text-sm font-light mb-6 italic">{t(section.subtitleKey)}</p>

              <ul>
                {section.wines.map((wine) => (
                  <li
                    key={wine.name}
                    className="flex flex-wrap sm:flex-nowrap items-baseline justify-between gap-x-4 gap-y-1 py-4 border-b border-white/5 hover:bg-white/5 transition-colors duration-300 px-2 -mx-2 rounded"
                  >
                    <div className="min-w-0">
                      <p className="text-white font-light">{wine.name}</p>
                      <p className="text-white/40 text-sm mt-0.5">{wine.region}</p>
                    </div>
                    <div className="flex items-baseline gap-6 flex-shrink-0">
                      <span className="text-white/50 text-sm w-16 sm:w-14 text-right">
                        {t('wines.glass')} <span className="text-emerald-300 font-medium ml-1">{wine.glass}</span>
                      </span>
                      <span className="text-white/50 text-sm w-20 sm:w-14 text-right">
                        {t('wines.bottle')} <span className="text-white font-medium ml-1">{wine.bottle}</span>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Nota final */}
        <div className="mt-16 p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl text-center">
          <p className="text-white/60 font-light leading-relaxed">
            {t('wines.final')}
          </p>
          <Link
            to="/#reserva"
            className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-emerald-300 text-black text-sm tracking-widest uppercase rounded-full font-medium hover:bg-emerald-400 transition-all duration-300"
          >
            {t('cta.reserve')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Wines;
