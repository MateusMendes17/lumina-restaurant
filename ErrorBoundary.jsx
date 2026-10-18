import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from './LangContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Erro na aplicação:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

const ErrorFallback = () => {
  const { t } = useLang();
  return (
    <section className="min-h-screen flex items-center justify-center bg-black px-6 pt-24 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-emerald-300 text-xs tracking-widest uppercase mb-6">{t('eb.label')}</div>
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-6">{t('eb.title')}</h1>
        <p className="text-white/50 mb-10 font-light leading-relaxed">{t('eb.text')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-emerald-300 text-black text-sm tracking-widest uppercase rounded-full font-medium hover:bg-emerald-400 transition-all duration-300"
          >
            {t('eb.reload')}
          </button>
          <Link
            to="/"
            className="px-8 py-4 border border-white/30 text-white text-sm tracking-widest uppercase rounded-full hover:border-white/60 hover:bg-white/10 transition-all duration-300"
          >
            {t('eb.home')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorBoundary;
