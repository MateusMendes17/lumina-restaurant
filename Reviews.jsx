import React, { useState, useEffect, useCallback } from 'react';
import { useLang } from './LangContext';

const reviews = [
  {
    id: 1,
    author: 'Maria Santos',
    location: 'Lisboa',
    date: 'Outubro 2024',
    rating: 5,
    text: 'Uma experiência verdadeiramente extraordinária. O tasting menu do chef é uma obra de arte — cada prato conta uma história. O Wagyu A5 derrete na boca e o soufflé de chocolate é o final perfeito. Serviço impecável, atencioso sem ser intrusivo. Voltaremos certamente.',
    highlight: 'Menu de Degustação'
  },
  {
    id: 2,
    author: 'Thomas Mueller',
    location: 'Berlim',
    date: 'Setembro 2024',
    rating: 5,
    text: 'Best fine dining in Lisbon by far. The wine pairing was exceptional — the sommelier really knows his Portuguese wines. The scallops with nori butter were a revelation. Atmosphere is elegant but not stuffy. Worth every euro.',
    highlight: 'Harmonização de Vinhos'
  },
  {
    id: 3,
    author: 'Ana Rodrigues',
    location: 'Porto',
    date: 'Agosto 2024',
    rating: 5,
    text: 'Comemorámos o nosso aniversário de casamento e não podíamos ter escolhido melhor. A equipa fez-nos sentir especiais desde o primeiro momento. O tártaro de atum e o robalo em crosta de ervas estavam divinais. Uma noite para recordar.',
    highlight: 'Ocasião Especial'
  },
  {
    id: 4,
    author: 'James Chen',
    location: 'Londres',
    date: 'Julho 2024',
    rating: 4,
    text: 'Excellent modern Portuguese cuisine with Japanese influences. The foie gras terrine with fig compote was outstanding. Only reason for 4 stars is the noise level when full — but that\'s a sign of popularity. Book early!',
    highlight: 'Foie Gras Terrina'
  },
  {
    id: 5,
    author: 'Sofia Almeida',
    location: 'Cascais',
    date: 'Junho 2024',
    rating: 5,
    text: 'Já visitei muitos restaurantes de fine dining, mas o Lumina destaca-se pela alma que colocam em cada prato. O risoto de cogumelos silvestres com trufa negra é dos melhores que já provei. A equipa de sala é de uma simpatia genuína.',
    highlight: 'Risoto de Trufa'
  },
  {
    id: 6,
    author: 'Pierre Dubois',
    location: 'Paris',
    date: 'Maio 2024',
    rating: 5,
    text: 'Une expérience gastronomique remarquable. La technique est parfaite, les produits d\'une fraîcheur exceptionnelle. Le soufflé au chocolat Valrhona — une maîtrise technique impressionnante. Le service est précis, chaleureux.',
    highlight: 'Soufflé Valrhona'
  }
];

const Reviews = () => {
  const { t } = useLang();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = React.useRef(null);

  const totalReviews = reviews.length;
  const maxIndex = Math.max(0, totalReviews - visibleReviews);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  // Adjust visible reviews on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleReviews(1);
      else if (window.innerWidth < 1024) setVisibleReviews(2);
      else setVisibleReviews(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, [maxIndex]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  }, [currentIndex, maxIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex <= 0 ? maxIndex : currentIndex - 1);
  }, [currentIndex, maxIndex, goToSlide]);

  // Manter o índice dentro dos limites ao redimensionar
  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [currentIndex, maxIndex]);

  // Swipe tátil (mobile)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsAutoPlaying(false);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <section id="reviews" className="py-24 md:py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-300 text-xs tracking-widest uppercase block mb-4">{t('rev.label')}</span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            {t('rev.title')}
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto text-lg font-light">
            {t('rev.desc')}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          {/* Track */}
          <div 
            className="flex gap-6 transition-transform duration-700 ease-out"
            style={{ 
              transform: `translateX(calc(-${currentIndex} * ((100% + 1.5rem) / ${visibleReviews})))` 
            }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {reviews.map((review, index) => (
              <article
                key={review.id}
                className="flex-shrink-0 w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] animate-fade-in-up"
                style={{ animationDelay: `${Math.min(index, 3) * 100}ms` }}
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 h-full hover:border-emerald-300/30 hover:bg-white/10 transition-all duration-500 backdrop-blur-sm flex flex-col">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${star <= review.rating ? 'text-emerald-300' : 'text-white/10'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Highlight tag */}
                  <span className="inline-block px-3 py-1 text-xs tracking-wider uppercase text-emerald-300 bg-emerald-300/10 rounded-full mb-4 w-fit">
                    {review.highlight}
                  </span>

                  {/* Review text */}
                  <blockquote className="text-white/80 text-base leading-relaxed font-light mb-6 flex-1">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>

                  {/* Author info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-600 flex items-center justify-center text-black font-light text-lg">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-light">{review.author}</p>
                      <p className="text-white/40 text-sm">{review.location} · {review.date}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Navigation Arrows - Desktop only */}
          <div className="hidden lg:flex absolute top-1/2 left-0 right-0 -translate-y-1/2 px-4 pointer-events-none">
            <button
              onClick={prevSlide}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-300/30 flex items-center justify-center transition-all duration-300"
              aria-label={t('rev.prev')}
            >
              <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-300/30 flex items-center justify-center transition-all duration-300 ml-auto"
              aria-label={t('rev.next')}
            >
              <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mobile Dots */}
          <div className="flex justify-center gap-2 mt-8 lg:hidden">
            {Array.from({ length: Math.max(1, totalReviews - visibleReviews + 1) }, (_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-emerald-300 w-6' : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`${t('rev.label')} ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Google/TheFork badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 opacity-60 hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <svg className="w-5 h-5 text-emerald-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <span>{t('rev.google')}</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <span className="text-emerald-300">★</span>
            <span>{t('rev.guide')}</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <svg className="w-5 h-5 text-emerald-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <span>{t('rev.thefork')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;