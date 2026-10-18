import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getDishBySlug, getDishesByCategory } from './dishesData';
import { useLang } from './LangContext';
import { categoryLabels } from './i18n';

const DishDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const dish = getDishBySlug(slug);
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  const [showAllergens, setShowAllergens] = useState(false);

  // Conteúdo no idioma selecionado
  const en = lang === 'en' && dish && dish.en;
  const name = dish ? (en ? dish.en.name : dish.name) : '';
  const shortDesc = dish ? (en ? dish.en.shortDescription : dish.shortDescription) : '';
  const fullDesc = dish ? (en ? dish.en.fullDescription : dish.fullDescription) : '';
  const ingredients = dish ? (en ? dish.en.ingredients : dish.ingredients) : [];
  const allergens = dish ? (en ? dish.en.allergens : dish.allergens) : [];
  const chefNotes = dish ? (en ? dish.en.chefNotes : dish.chefNotes) : '';
  const pairingReason = dish ? (en ? dish.en.wineReason : dish.winePairing.reason) : '';
  const category = dish ? categoryLabels[lang][dish.category] : '';

  // Título e meta description dinâmicos por prato (SEO)
  useEffect(() => {
    const previousTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const previousDesc = metaDesc ? metaDesc.content : null;

    if (dish) {
      document.title = `${name} | Lumina Restaurant, ${lang === 'en' ? 'Lisbon' : 'Lisboa'}`;
      if (metaDesc) metaDesc.content = `${shortDesc}. ${lang === 'en' ? 'Book at Lumina, Lisbon.' : 'Reserve no Lumina, Lisboa.'}`;
    } else {
      document.title = lang === 'en' ? 'Dish not found | Lumina Restaurant' : 'Prato não encontrado | Lumina Restaurant';
    }

    return () => {
      document.title = previousTitle;
      if (metaDesc && previousDesc !== null) metaDesc.content = previousDesc;
    };
  }, [dish, name, shortDesc, lang]);

  // Voltar ao menu se não houver histórico (aterragem direta no link)
  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/#menu');
    }
  };

  if (!dish) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black px-6">
        <div className="text-center">
          <h2 className="text-3xl font-light text-white mb-4">{t('dish.notFoundTitle')}</h2>
          <p className="text-white/50 mb-8">{t('dish.notFoundText')}</p>
          <Link to="/#menu" className="text-emerald-300 hover:underline text-sm tracking-wider uppercase py-2 inline-block">
            {t('dish.backToMenu')}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <article className="min-h-screen bg-black text-white">
      {/* Hero Image Section */}
      <section className="relative h-[60svh] sm:h-[70vh] min-h-[420px] max-h-[700px]">
        <img
          src={dish.image}
          alt={name}
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-[4.75rem] sm:top-24 left-4 sm:left-6 z-10 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-sm tracking-wider hover:bg-white/15 hover:border-white/40 active:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          aria-label={t('wines.back')}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('aria.back')}
        </button>

        {/* Category & Price Badge */}
        <div className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <span className="text-xs tracking-widest uppercase text-emerald-300/80">{category}</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mt-2">
              {name}
            </h1>
          </div>
          <div className="sm:text-right flex-shrink-0">
            <span className="text-2xl sm:text-3xl md:text-4xl font-light text-emerald-300">{dish.price}</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 md:px-12 lg:px-20 py-16 max-w-5xl mx-auto">
        {/* Description */}
        <div className="mb-16 animate-fade-in-up">
          <p className="text-lg md:text-xl text-white/70 leading-relaxed font-light max-w-3xl">
            {fullDesc}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Ingredients & Allergens */}
          <div className="lg:col-span-2 space-y-10">
            {/* Ingredients */}
            <div className="animate-fade-in-up delay-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light tracking-tight">{t('dish.ingredients')}</h3>
                <button
                  onClick={() => setShowAllIngredients(!showAllIngredients)}
                  className="text-emerald-300 text-sm tracking-wider uppercase hover:underline transition-colors py-2"
                >
                  {showAllIngredients ? t('dish.showLess') : t('dish.showAll')}
                </button>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3 text-white/70">
                {(
                  showAllIngredients
                    ? ingredients
                    : ingredients.slice(0, 8)
                ).map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300/50 flex-shrink-0" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Allergens */}
            <div className="animate-fade-in-up delay-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light tracking-tight">{t('dish.allergens')}</h3>
                <button
                  onClick={() => setShowAllergens(!showAllergens)}
                  className="text-emerald-300 text-sm tracking-wider uppercase hover:underline transition-colors py-2"
                >
                  {showAllergens ? t('dish.showLess') : t('dish.showDetails')}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {allergens.length === 0 && (
                  <span className="text-white/40 text-sm font-light">—</span>
                )}
                {allergens.map((allergen, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-xs tracking-wider uppercase bg-white/5 border border-white/10 rounded-full text-white/70"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Wine Pairing & Chef Notes */}
          <div className="space-y-8 animate-fade-in-up delay-300">
            {/* Wine Pairing */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-300/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.431 9 11.922V8.5c0-2.081 2.787-3.314 4.679-2.734 1.505.464 2.465 1.48 2.715 2.728.385 1.913-.67 3.78-2.557 4.644l-.249.249-.532-.533c-.293-.293-.767-.293-1.06 0l-.277.277a1 1 0 01-.707-.293l-.232-.232-.287.287a1 1 0 01-.707.293l-.248-.248-.677.677a10.56 10.56 0 01-3.085.327" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-light tracking-tight">{t('dish.pairing')}</h4>
                  <p className="text-emerald-300 text-sm tracking-wider uppercase mt-1">{dish.winePairing.suggestion}</p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{pairingReason}</p>
            </div>

            {/* Chef Notes */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="text-lg font-light tracking-tight mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                {t('dish.chefNote')}
              </h4>
              <p className="text-white/60 text-sm leading-relaxed font-italic">{chefNotes}</p>
            </div>

            {/* Reserve CTA */}
            <div className="text-center">
              <Link
                to="/#reserva"
                className="inline-flex items-center justify-center gap-2 max-w-full px-6 sm:px-8 py-4 sm:py-3 bg-emerald-300 text-black text-xs sm:text-sm tracking-widest uppercase rounded-full font-medium hover:bg-emerald-400 transition-all duration-300"
              >
                {t('dish.reserveCta')}
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Dishes - Same Category */}
        <div className="mt-20 animate-fade-in-up delay-400">
          <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-8">
            {lang === 'pt' && dish.category === 'Pratos Principais' ? 'Outros' : t('dish.other')} {category.toLowerCase()}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getDishesByCategory(dish.category)
              .filter(d => d.id !== dish.id)
              .slice(0, 3)
              .map((relatedDish) => {
                const relEn = lang === 'en' && relatedDish.en;
                const relName = relEn ? relatedDish.en.name : relatedDish.name;
                const relDesc = relEn ? relatedDish.en.shortDescription : relatedDish.shortDescription;
                return (
                  <Link
                    key={relatedDish.id}
                    to={`/prato/${relatedDish.slug}`}
                    className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-emerald-300/30 hover:bg-white/10 transition-all duration-500 backdrop-blur-sm"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={relatedDish.image}
                        alt={relName}
                        width="1200"
                        height="900"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-base font-light tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                          {relName}
                        </h4>
                        <span className="text-emerald-300 text-sm font-medium tracking-wider whitespace-nowrap ml-3">
                          {relatedDish.price}
                        </span>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
                        {relDesc}
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </article>
  );
};

export default DishDetail;
