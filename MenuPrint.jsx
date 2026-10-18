import React from 'react';
import { dishesData } from './dishesData';
import { useLang } from './LangContext';
import { categoryLabels } from './i18n';

const wineSummary = [
  { section: 'Espumantes · Sparkling', items: ['Quinta da Lixa Grande Reserva Brut — Vinho Verde — 42€', 'Champagne Billecart-Salmon Brut Réserve — Champagne — 140€'] },
  { section: 'Brancos · Whites', items: ['Alvarinho Parcela Única — Anselmo Mendes — Monção — 58€', 'Encruzado — Quinta dos Carvalhais — Dão — 48€', 'Antão Vaz Reserva — Herdade do Esporão — Alentejo — 46€'] },
  { section: 'Tintos · Reds', items: ['Touriga Nacional — Quinta do Vallado — Douro — 72€', 'Crasto Superior — Quinta do Crasto — Douro — 64€', 'Vinho de Talha Baga — Luís Pato — Bairrada — 54€'] },
  { section: 'Doces & Porto · Dessert & Port', items: ['Porto Tawny 10 Anos — Kopke — 48€', 'Moscatel de Setúbal — J.M. da Fonseca — 38€'] },
];

const MenuPrint = () => {
  const { t, lang } = useLang();
  const categories = ['Entradas', 'Pratos Principais', 'Sobremesas'];

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6 print:bg-white print:text-black print:pt-8 print:pb-8">
      <div className="max-w-3xl mx-auto print:max-w-none">
        {/* Botão imprimir (esconde na impressão) */}
        <div className="no-print text-center mb-12">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-300 text-black text-sm tracking-widest uppercase rounded-full font-medium hover:bg-emerald-400 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            {t('print.button')}
          </button>
        </div>

        {/* Cabeçalho do menu */}
        <header className="text-center mb-14 border-b border-white/10 pb-10 print:border-gray-400">
          <div className="text-4xl font-light tracking-[0.3em] text-white print:text-black">LUMINA</div>
          <div className="text-xs tracking-[0.4em] uppercase text-emerald-300 print:text-emerald-700 mt-2">{t('print.subtitle')}</div>
        </header>

        {/* Categorias */}
        {categories.map((catKey) => (
          <section key={catKey} className="mb-12 print:mb-8 print:break-inside-avoid">
            <h2 className="text-xl tracking-[0.2em] uppercase text-emerald-300 print:text-emerald-800 mb-6 border-b border-white/10 print:border-gray-300 pb-2">
              {categoryLabels[lang][catKey]}
            </h2>
            <ul>
              {dishesData.filter(d => d.category === catKey).map((dish) => (
                <li key={dish.id} className="mb-5 print:mb-4 print:break-inside-avoid">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-white print:text-black font-light">{lang === 'en' && dish.en ? dish.en.name : dish.name}</span>
                    <span className="border-b border-dotted border-white/20 flex-1 mx-2 translate-y-[-3px] print:border-gray-300" aria-hidden="true" />
                    <span className="text-emerald-300 print:text-emerald-800">{dish.price}</span>
                  </div>
                  <p className="text-white/50 print:text-gray-600 text-sm font-light mt-1">
                    {lang === 'en' && dish.en ? dish.en.shortDescription : dish.shortDescription}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Menu de degustação */}
        <section className="mb-12 print:mb-8 print:break-inside-avoid p-6 border border-emerald-300/30 print:border-emerald-800 rounded-xl">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-white print:text-black font-light tracking-wide">{t('menu.tastingCta')}</span>
          </div>
          <p className="text-white/50 print:text-gray-600 text-sm font-light mt-2">{t('menu.tastingLead')}</p>
        </section>

        {/* Vinhos */}
        <section className="mb-12 print:mb-8">
          <h2 className="text-xl tracking-[0.2em] uppercase text-emerald-300 print:text-emerald-800 mb-6 border-b border-white/10 print:border-gray-300 pb-2">
            {t('print.wines')}
          </h2>
          {wineSummary.map((group) => (
            <div key={group.section} className="mb-5 print:break-inside-avoid">
              <h3 className="text-white print:text-black font-light mb-2">{group.section}</h3>
              <ul className="text-white/50 print:text-gray-600 text-sm font-light space-y-1">
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </section>

        {/* Rodapé */}
        <footer className="text-center text-white/40 print:text-gray-500 text-sm border-t border-white/10 print:border-gray-300 pt-8">
          <p>{t('print.info')}</p>
          <p className="mt-2 print:block">{t('rev.guide')}</p>
        </footer>
      </div>
    </div>
  );
};

export default MenuPrint;
