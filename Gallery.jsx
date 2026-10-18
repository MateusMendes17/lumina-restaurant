import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLang } from './LangContext';

const galleryImages = [
  { src: '/hero-bg.jpg', w: 1920, h: 1072, caption: { pt: 'Sala Principal', en: 'Main Dining Room' }, tag: 'room' },
  { src: '/images/dishes/wagyu-a5.jpg', w: 1024, h: 682, caption: { pt: 'Wagyu A5', en: 'A5 Wagyu' }, tag: 'dishes' },
  { src: '/images/dishes/tartaro-atun.jpg', w: 1200, h: 655, caption: { pt: 'Tártaro de Atum', en: 'Tuna Tartare' }, tag: 'dishes' },
  { src: '/images/dishes/robalo-crosta.jpg', w: 640, h: 424, caption: { pt: 'Robalo em Crosta', en: 'Sea Bass in Crust' }, tag: 'dishes' },
  { src: '/images/dishes/vieiras-grelhadas.jpg', w: 740, h: 414, caption: { pt: 'Vieiras do Algarve', en: 'Algarve Scallops' }, tag: 'dishes' },
  { src: '/images/dishes/risoto-cogumelos.jpg', w: 1200, h: 988, caption: { pt: 'Risoto de Trufa', en: 'Truffle Risotto' }, tag: 'dishes' },
  { src: '/images/dishes/foie-gras.jpg', w: 1000, h: 667, caption: { pt: 'Foie Gras Terrina', en: 'Foie Gras Terrine' }, tag: 'dishes' },
  { src: '/images/dishes/souffle-chocolate.webp', w: 1200, h: 800, caption: { pt: 'Soufflé Valrhona', en: 'Valrhona Soufflé' }, tag: 'dishes' },
  { src: '/images/dishes/creme-brulee.jpg', w: 494, h: 404, caption: { pt: 'Crème Brûlée', en: 'Crème Brûlée' }, tag: 'dishes' },
  { src: '/images/dishes/queijos.jpg', w: 1200, h: 655, caption: { pt: 'Queijos Artesanos', en: 'Artisan Cheeses' }, tag: 'dishes' },
];

const Gallery = () => {
  const { t, lang } = useLang();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const isOpen = lightboxIndex !== null;
  const dialogRef = useRef(null);
  const triggerRef = useRef(null); // elemento que abriu (devolver o foco ao fechar)

  const captionOf = (img) => img.caption[lang] || img.caption.pt;
  const tagOf = (img) => (img.tag === 'room' ? t('gal.tagRoom') : t('gal.tagDishes'));

  const openAt = (index) => {
    triggerRef.current = document.activeElement;
    setLightboxIndex(index);
  };

  const close = useCallback(() => {
    setLightboxIndex(null);
    // Devolver o foco ao botão que abriu a lightbox
    if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
      triggerRef.current.focus();
    }
  }, []);
  const next = useCallback(
    () => setLightboxIndex(i => (i + 1) % galleryImages.length),
    []
  );
  const prev = useCallback(
    () => setLightboxIndex(i => (i - 1 + galleryImages.length) % galleryImages.length),
    []
  );

  // Teclado no lightbox + focus-trap + bloqueio de scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'Tab') {
        // Prender o foco dentro do lightbox
        const dialog = dialogRef.current;
        if (!dialog) return;
        const items = dialog.querySelectorAll('button');
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    // Foco inicial no botão de fechar
    const closeButton = dialogRef.current && dialogRef.current.querySelector('button');
    if (closeButton) closeButton.focus();
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close, next, prev]);

  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-emerald-300 text-xs tracking-widest uppercase block mb-4">{t('gal.label')}</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight">{t('gal.title')}</h1>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto text-lg font-light">
            {t('gal.desc')}
          </p>
        </div>

        {/* Mosaico (masonry) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              onClick={() => openAt(index)}
              className="group relative w-full mb-4 break-inside-avoid rounded-2xl overflow-hidden border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-300 animate-fade-in-up block"
              style={{ animationDelay: `${(index % 6) * 80}ms` }}
              aria-label={`${t('gal.viewFull')}: ${captionOf(image)}`}
            >
              <img
                src={image.src}
                alt={captionOf(image)}
                width={image.w}
                height={image.h}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay com legenda */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="inline-block px-2.5 py-1 text-[10px] tracking-widest uppercase text-emerald-300 bg-black/60 backdrop-blur-sm rounded-full mb-2 border border-emerald-300/20">
                  {tagOf(image)}
                </span>
                <p className="text-white text-lg font-light">{captionOf(image)}</p>
              </div>
              {/* Ícone de expansão */}
              <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={captionOf(galleryImages[lightboxIndex])}
        >
          {/* Fechar */}
          <button
            onClick={close}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label={t('gal.close')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Anterior */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label={t('gal.prev')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Próxima */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label={t('gal.next')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Imagem com crossfade */}
          <figure className="max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              key={galleryImages[lightboxIndex].src}
              src={galleryImages[lightboxIndex].src}
              alt={captionOf(galleryImages[lightboxIndex])}
              width={galleryImages[lightboxIndex].w}
              height={galleryImages[lightboxIndex].h}
              className="w-full max-h-[68vh] object-contain rounded-lg animate-fade-in"
            />
            <figcaption className="text-center mt-4 text-white/80 tracking-wider">
              {captionOf(galleryImages[lightboxIndex])}
              <span className="text-white/40 text-sm ml-3">
                {lightboxIndex + 1} / {galleryImages.length}
              </span>
            </figcaption>

            {/* Miniaturas */}
            <div className="flex gap-2 mt-5 max-w-full overflow-x-auto pb-2 px-1" onClick={(e) => e.stopPropagation()}>
              {galleryImages.map((image, index) => (
                <button
                  key={image.src}
                  onClick={() => setLightboxIndex(index)}
                  className={`relative w-16 h-12 flex-shrink-0 rounded-md overflow-hidden border transition-all duration-300 ${
                    index === lightboxIndex
                      ? 'border-emerald-300 opacity-100 ring-1 ring-emerald-300'
                      : 'border-white/10 opacity-40 hover:opacity-80'
                  }`}
                  aria-label={`${t('gal.viewFull')}: ${captionOf(image)}`}
                  aria-current={index === lightboxIndex}
                >
                  <img src={image.src} alt="" width={image.w} height={image.h} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </figure>
        </div>
      )}
    </div>
  );
};

export default Gallery;
