import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from './LangContext';

const sections = [
  {
    id: 'privacidade',
    titleKey: 'legal.pv.title',
    contentKeys: ['legal.pv.p1', 'legal.pv.p2', 'legal.pv.p3'],
  },
  {
    id: 'termos',
    titleKey: 'legal.tu.title',
    contentKeys: ['legal.tu.p1', 'legal.tu.p2'],
  },
  {
    id: 'acessibilidade',
    titleKey: 'legal.ac.title',
    contentKeys: ['legal.ac.p1', 'legal.ac.p2'],
  },
  {
    id: 'cookies',
    titleKey: 'legal.ck.title',
    contentKeys: ['legal.ck.p1', 'legal.ck.p2'],
  },
];

const Legal = () => {
  const { t } = useLang();

  return (
    <article className="min-h-screen bg-black pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-emerald-300 text-sm tracking-wider hover:underline mb-10 py-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('legal.back')}
        </Link>

        <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-16">{t('legal.title')}</h1>

        <div className="space-y-14">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-5 pb-3 border-b border-white/10">
                <div className="w-10 h-px bg-emerald-300" />
                <h2 className="text-2xl font-light tracking-tight">{t(section.titleKey)}</h2>
              </div>
              {section.contentKeys.map((key, index) => (
                <p key={index} className="text-white/60 leading-relaxed font-light mb-4">
                  {t(key)}
                </p>
              ))}
            </section>
          ))}
        </div>

        <p className="text-white/50 text-sm mt-16">
          {t('legal.updated')}
        </p>
      </div>
    </article>
  );
};

export default Legal;
