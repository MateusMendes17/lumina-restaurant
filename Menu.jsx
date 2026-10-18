import React from 'react';
import { Link } from 'react-router-dom';
import { dishesData } from './dishesData';
import { useLang } from './LangContext';
import { categoryLabels } from './i18n';
import { track } from './analytics';

const categoryOrder = ['Entradas', 'Pratos Principais', 'Sobremesas'];

const categoryMeta = {
  Entradas: { img: 'tartaro-atun.jpg', w: 1200, h: 655 },
  'Pratos Principais': { img: 'wagyu-a5.jpg', w: 1024, h: 682 },
  Sobremesas: { img: 'creme-brulee.jpg', w: 494, h: 404 },
};

const Menu = () => {
  const { t, lang } = useLang();

  const categories = categoryOrder.map((name, index) => ({
    id: index + 1,
    key: name,
    label: categoryLabels[lang][name],
    items: dishesData.filter(dish => dish.category === name),
  }));

  return (
    <section id="menu" className="py-24 md:py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-300 text-xs tracking-widest uppercase block mb-4">{t('menu.label')}</span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">{t('menu.title')}</h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto text-lg font-light">
            {t('menu.desc')}
          </p>
        </div>

        {/* Menu Categories */}
        <div className="space-y-20">
          {categories.map((category) => (
            <div key={category.id} className="animate-fade-in-up">
              {/* Category Title */}
              <div className="flex items-center gap-4 mb-10 pb-4 border-b border-white/10">
                <div className="w-12 h-px bg-emerald-300" />
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white">
                  {category.label}
                </h3>
              </div>

              {/* Dishes Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((dish) => {
                  const dishName = lang === 'en' && dish.en ? dish.en.name : dish.name;
                  const dishDesc = lang === 'en' && dish.en ? dish.en.shortDescription : dish.shortDescription;
                  return (
                    <Link
                      key={dish.id}
                      to={`/prato/${dish.slug}`}
                      className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-emerald-300/30 hover:bg-white/10 transition-all duration-500 backdrop-blur-sm block"
                    >
                      {/* Dish Image */}
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={dish.image}
                          alt={dishName}
                          width={categoryMeta[category.key].w}
                          height={categoryMeta[category.key].h}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>

                      {/* Dish Content */}
                      <div className="p-6">
                        {/* Dish Header */}
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-light tracking-tight text-white group-hover:text-emerald-300 transition-colors duration-300">
                            {dishName}
                          </h4>
                          <span className="text-emerald-300 text-sm font-medium tracking-wider whitespace-nowrap ml-4">
                            {dish.price}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-white/60 leading-relaxed font-light">
                          {dishDesc}
                        </p>

                        {/* Decorative line */}
                        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Tasting Menu CTA */}
          <div className="text-center pt-10 border-t border-white/10 animate-fade-in-up">
            <p className="text-white/50 mb-6 text-lg font-light">
              {t('menu.tastingLead')}
            </p>
            <a
              href="#reserva"
              className="inline-flex items-center justify-center gap-2 max-w-full px-6 sm:px-8 py-3 border border-emerald-300/50 text-emerald-300 text-xs sm:text-sm tracking-widest uppercase rounded-full text-center hover:bg-emerald-300/10 hover:border-emerald-300 transition-all duration-300"
            >
              {t('menu.tastingCta')}
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/vinhos"
                onClick={() => track('cta_click', { cta: 'wine_list' })}
                className="text-white/50 text-sm tracking-wider hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5 py-1"
              >
                {t('menu.wineLink')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/menu"
                onClick={() => track('cta_click', { cta: 'menu_pdf' })}
                className="text-white/50 text-sm tracking-wider hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5 py-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t('menu.pdfLink')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
