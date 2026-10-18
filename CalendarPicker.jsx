import React, { useState, useEffect, useRef } from 'react';

// ----- Nomes localizados -----
const MONTHS_PT = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS_PT = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'];
const WEEKDAYS_EN = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const WEEKDAYS_LONG_PT = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo'];
const WEEKDAYS_LONG_EN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const pad = (n) => String(n).padStart(2, '0');
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseISO = (s) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);

/**
 * Mini calendário premium (tema escuro) para escolher a data da reserva.
 * Dias passados e além do limite ficam desativados.
 */
const CalendarPicker = ({ value, min, max, lang, invalid = false, onChange }) => {
  const en = lang === 'en';
  const months = en ? MONTHS_EN : MONTHS_PT;
  const weekdays = en ? WEEKDAYS_EN : WEEKDAYS_PT;
  const weekdaysLong = en ? WEEKDAYS_LONG_EN : WEEKDAYS_LONG_PT;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => startOfMonth(value ? parseISO(value) : parseISO(min)));
  const rootRef = useRef(null);
  const triggerRef = useRef(null);

  // Ao abrir, mostrar o mês da data escolhida (ou o mês atual)
  useEffect(() => {
    if (open) setView(startOfMonth(value ? parseISO(value) : parseISO(min)));
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fechar com clique fora / Esc
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        if (triggerRef.current) triggerRef.current.focus();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const minDate = parseISO(min);
  const maxDate = parseISO(max);
  const viewYear = view.getFullYear();
  const viewMonth = view.getMonth();

  const canPrev = viewYear > minDate.getFullYear() || (viewYear === minDate.getFullYear() && viewMonth > minDate.getMonth());
  const canNext = viewYear < maxDate.getFullYear() || (viewYear === maxDate.getFullYear() && viewMonth < maxDate.getMonth());

  // Grelha: semana a começar à segunda-feira
  const firstDow = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const todayISO = toISO(new Date());

  const selectDay = (d) => {
    const iso = `${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`;
    setOpen(false);
    if (onChange) onChange(iso);
    if (triggerRef.current) triggerRef.current.focus();
  };

  const longLabel = (d) => {
    const dow = new Date(viewYear, viewMonth, d).getDay();
    const month = months[viewMonth];
    return en
      ? `${weekdaysLong[dow]}, ${month} ${d}, ${viewYear}`
      : `${weekdaysLong[dow]}, ${d} de ${month} de ${viewYear}`;
  };

  const display = value
    ? (() => {
        const dt = parseISO(value);
        const m = months[dt.getMonth()];
        return en
          ? `${m} ${dt.getDate()}, ${dt.getFullYear()}`
          : `${dt.getDate()} de ${m} de ${dt.getFullYear()}`;
      })()
    : null;

  return (
    <div ref={rootRef} className="relative">
      {/* Gatilho */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3 bg-black/50 border rounded-lg text-left focus:outline-none focus:ring-2 transition-all duration-300 ${
          invalid ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-emerald-300/20'
        }`}
      >
        <span className={display ? 'text-white' : 'text-white/40'}>{display || (en ? 'Select a date' : 'Escolha o dia')}</span>
        <svg className="w-5 h-5 text-white/40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {/* Calendário */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label={en ? 'Booking calendar' : 'Calendário de reservas'}
          className="absolute left-0 right-0 top-full mt-2 z-30 bg-gray-950/95 backdrop-blur-md border border-white/15 rounded-xl p-4 shadow-2xl shadow-black/60 animate-fade-in"
        >
          {/* Cabeçalho */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => canPrev && setView(new Date(viewYear, viewMonth - 1, 1))}
              disabled={!canPrev}
              aria-label={en ? 'Previous month' : 'Mês anterior'}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm tracking-wider text-white font-light" aria-live="polite">
              {en ? `${months[viewMonth]} ${viewYear}` : `${months[viewMonth]} de ${viewYear}`}
            </span>
            <button
              type="button"
              onClick={() => canNext && setView(new Date(viewYear, viewMonth + 1, 1))}
              disabled={!canNext}
              aria-label={en ? 'Next month' : 'Mês seguinte'}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dias da semana */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {weekdays.map((w) => (
              <div key={w} className="text-[10px] uppercase tracking-wider text-white/40 text-center py-1">
                {w}
              </div>
            ))}
          </div>

          {/* Dias */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (d === null) return <span key={`e${i}`} className="h-10" aria-hidden="true" />;
              const iso = `${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`;
              const isPast = iso < min;
              const isBeyond = iso > max;
              const disabled = isPast || isBeyond;
              const isSelected = iso === value;
              const isToday = iso === todayISO;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDay(d)}
                  aria-label={longLabel(d)}
                  aria-current={isToday ? 'date' : undefined}
                  className={`h-10 rounded-lg text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-300/40 ${
                    isSelected
                      ? 'bg-emerald-300 text-black font-medium'
                      : disabled
                      ? 'text-white/20 cursor-not-allowed'
                      : isToday
                      ? 'border border-emerald-300/50 text-white hover:bg-white/10'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>

          {/* Rodapé: atalho para hoje */}
          <div className="mt-3 pt-3 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                if (toISO(now) >= min && toISO(now) <= max) selectDay(now.getDate());
              }}
              disabled={toISO(new Date()) < min || toISO(new Date()) > max}
              className="text-emerald-300 text-xs tracking-wider uppercase hover:underline disabled:opacity-30 py-1 px-2"
            >
              {en ? 'Today' : 'Hoje'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPicker;
