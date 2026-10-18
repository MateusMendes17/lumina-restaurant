import React, { useState, useEffect } from 'react';
import { getOpenStatus } from './openingHours';
import { useLang } from './LangContext';

const OpenStatus = ({ className = '' }) => {
  const { lang } = useLang();
  const [status, setStatus] = useState(() => getOpenStatus(new Date(), lang));

  // Atualiza de minuto em minuto + quando o idioma muda
  useEffect(() => {
    setStatus(getOpenStatus(new Date(), lang));
    const interval = setInterval(() => setStatus(getOpenStatus(new Date(), lang)), 60000);
    return () => clearInterval(interval);
  }, [lang]);

  return (
    <span className={`inline-flex items-center gap-2 text-sm ${className}`} role="status" aria-live="polite">
      <span
        className={`w-2 h-2 rounded-full flex-shrink-0 ${
          status.open ? 'bg-emerald-400 animate-pulse-slow' : 'bg-red-400/70'
        }`}
        aria-hidden="true"
      />
      {status.message}
    </span>
  );
};

export default OpenStatus;
