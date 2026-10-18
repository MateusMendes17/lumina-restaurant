import React, { useState } from 'react';
import OpenStatus from './OpenStatus';
import CalendarPicker from './CalendarPicker';
import { useLang } from './LangContext';

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Rua%20da%20Luz%2C%201200-247%20Lisboa';

const timeSlots = [
  '12:00', '12:30', '13:00', '13:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
];

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, '9+'];

// ----- Datas e horários possíveis -----
const pad = (n) => String(n).padStart(2, '0');
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const todayISO = () => toISO(new Date());
const maxDateISO = () => {
  const d = new Date();
  d.setDate(d.getDate() + 90);
  return toISO(d);
};

// Horários válidos para uma data:
// - domingo: apenas almoço (nada a partir das 16:00)
// - hoje: apenas a hora atual em diante (nunca para trás)
const getValidSlots = (dateStr) => {
  if (!dateStr) return timeSlots;
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return timeSlots;

  const day = new Date(y, m - 1, d).getDay();
  let slots = timeSlots.filter((s) => !(day === 0 && Number(s.slice(0, 2)) >= 16));

  if (dateStr === todayISO()) {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    slots = slots.filter((s) => {
      const [hh, mm] = s.split(':').map(Number);
      return hh * 60 + mm >= nowMin;
    });
  }
  return slots;
};

const ReservationForm = () => {
  const { t, lang } = useLang();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, submitting, success, error
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'e.name' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'e.email' : '';
      case 'phone': {
        const digits = (value.match(/\d/g) || []).length;
        return digits < 9 || digits > 15 ? 'e.phone' : '';
      }
      case 'date': {
        if (!value) return 'e.date';
        if (value < todayISO()) return 'e.pastDate';
        if (value > maxDateISO()) return 'e.maxDate';
        if (value === todayISO() && getValidSlots(value).length === 0) return 'e.noSlotsToday';
        return '';
      }
      case 'time': {
        if (!value) return 'e.time';
        const valid = getValidSlots(formData.date);
        if (valid.includes(value)) return '';
        return formData.date === todayISO() ? 'e.pastTime' : 'e.noService';
      }
      case 'guests':
        return !value ? 'e.guests' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const next = { ...prev, [name]: value };
      // Se a data mudou, a hora escolhida pode deixar de ser válida → limpar
      if (name === 'date' && next.time) {
        if (!getValidSlots(value).includes(next.time)) next.time = '';
      }
      return next;
    });

    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Ao mudar a data, limpar também o erro da hora (pode ter mudado de valor)
    if (name === 'date' && errors.time) {
      setErrors(prev => ({ ...prev, time: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Selecionar o dia no calendário próprio: valida logo e limpa hora inválida
  const handleDateSelect = (iso) => {
    handleChange({ target: { name: 'date', value: iso } });
    setTouched(prev => ({ ...prev, date: true }));
    setErrors(prev => ({ ...prev, date: validateField('date', iso) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    setSubmitStatus('submitting');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success (in real app, check response)
    setSubmitStatus('success');
    setFormData({
      name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: ''
    });
    setTouched({});
    
    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  // Datas possíveis (data local, sem desvio UTC) + horários da data escolhida
  const today = todayISO();
  const maxDate = maxDateISO();
  const availableSlots = getValidSlots(formData.date);

  return (
    <section id="reserva" className="py-24 md:py-32 px-6 bg-gradient-to-b from-gray-950 via-black to-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info Panel */}
          <div className="lg:pr-16 animate-fade-in-up">
            <span className="text-emerald-300 text-xs tracking-widest uppercase block mb-4">{t('res.label')}</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              {t('res.title')}
            </h2>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-10">
              {t('res.desc')}
            </p>
            
            <div className="space-y-6 border-t border-white/10 pt-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-300/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-light text-lg">{t('res.hoursTitle')}</h4>
                  <p className="text-white/50 text-sm mt-1 whitespace-pre-line">{t('res.hoursText')}</p>
                  <OpenStatus className="text-emerald-300 mt-2" />
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-300/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-light text-lg">{t('res.contactTitle')}</h4>
                  <p className="text-white/50 text-sm mt-1"><a href="tel:+351210634213" className="hover:text-emerald-300 transition-colors">+351 210 634 213</a><br />reservas@lumina.pt</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-300/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-light text-lg">{t('res.locationTitle')}</h4>
                  <p className="text-white/50 text-sm mt-1 whitespace-pre-line">{t('res.locationText')}</p>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-emerald-300 text-sm mt-2 hover:text-emerald-200 transition-colors py-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t('res.directions')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="animate-fade-in-up delay-100">
            {submitStatus === 'success' ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-emerald-300 mb-2">{t('f.successTitle')}</h3>
                <p className="text-white/70 mb-6">{t('f.successText')}</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-8 py-3 border border-emerald-300/50 text-emerald-300 text-sm tracking-widest uppercase rounded-full hover:bg-emerald-300/10 transition-all duration-300"
                >
                  {t('f.newReservation')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 backdrop-blur-sm" noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs tracking-wider text-white/50 mb-2">
                      {t('f.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        touched.name && errors.name ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-emerald-300/20'
                      }`}
                      placeholder="João Silva"
                      maxLength={80}
                    />
                    {touched.name && errors.name && (
                      <p role="alert" className="mt-1.5 text-sm text-red-400">{t(errors.name)}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs tracking-wider text-white/50 mb-2">
                      {t('f.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        touched.email && errors.email ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-emerald-300/20'
                      }`}
                      placeholder="joao@email.com"
                    />
                    {touched.email && errors.email && (
                      <p role="alert" className="mt-1.5 text-sm text-red-400">{t(errors.email)}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs tracking-wider text-white/50 mb-2">
                      {t('f.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        touched.phone && errors.phone ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-emerald-300/20'
                      }`}
                      placeholder="+351 9XX XXX XXX"
                      maxLength={20}
                    />
                    {touched.phone && errors.phone && (
                      <p role="alert" className="mt-1.5 text-sm text-red-400">{t(errors.phone)}</p>
                    )}
                  </div>

                  {/* Guests */}
                  <div>
                    <label htmlFor="guests" className="block text-xs tracking-wider text-white/50 mb-2">
                      {t('f.guests')}
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white focus:outline-none focus:ring-2 appearance-none bg-no-repeat bg-right pr-10 transition-all duration-300 ${
                        touched.guests && errors.guests ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-emerald-300/20'
                      }`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff80' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 12px center',
                        backgroundSize: '16px 12px'
                      }}
                    >
                      {guestOptions.map(opt => (
                        <option key={opt} value={opt}>{opt === '9+' ? '9+' : opt} {opt === 1 ? t('f.person') : t('f.people')}</option>
                      ))}
                    </select>
                    {touched.guests && errors.guests && (
                      <p role="alert" className="mt-1.5 text-sm text-red-400">{t(errors.guests)}</p>
                    )}
                  </div>

                  {/* Date */}
                  <div>
                    <span className="block text-xs tracking-wider text-white/50 mb-2">
                      {t('f.date')}
                    </span>
                    <CalendarPicker
                      value={formData.date}
                      min={today}
                      max={maxDate}
                      lang={lang}
                      invalid={touched.date && !!errors.date}
                      onChange={handleDateSelect}
                    />
                    {touched.date && errors.date && (
                      <p role="alert" className="mt-1.5 text-sm text-red-400">{t(errors.date)}</p>
                    )}
                    <p className="mt-1.5 text-xs text-white/40">{t('f.dateHint')}</p>
                  </div>

                  {/* Time */}
                  <div>
                    <label htmlFor="time" className="block text-xs tracking-wider text-white/50 mb-2">
                      {t('f.time')}
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white focus:outline-none focus:ring-2 appearance-none bg-no-repeat bg-right pr-10 transition-all duration-300 ${
                        touched.time && errors.time ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-emerald-300/20'
                      }`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff80' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 12px center',
                        backgroundSize: '16px 12px'
                      }}
                    >
                      <option value="">{t('f.timePlaceholder')}</option>
                      {availableSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    {touched.time && errors.time && (
                      <p role="alert" className="mt-1.5 text-sm text-red-400">{t(errors.time)}</p>
                    )}
                  </div>
                </div>

                {/* Notes - Full width */}
                <div className="mt-6">
                  <label htmlFor="notes" className="block text-xs tracking-wider text-white/50 mb-2">
                    {t('f.notes')}
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                    maxLength={500}
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-300/20 transition-all duration-300 resize-none"
                    placeholder={t('f.notesPlaceholder')}
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="w-full py-4 bg-emerald-300 text-black text-sm tracking-widest uppercase rounded-full font-medium hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {submitStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t('f.submitting')}
                      </>
                    ) : (
                      t('f.submit')
                    )}
                  </button>
                </div>

                {/* Privacy note */}
                <p className="text-center text-xs text-white/50 mt-6">
                  {t('f.privacy1')}{' '}
                  <a href="/legal" className="text-emerald-300 hover:underline">{t('f.privacyLink')}</a>
                  {t('f.privacy2')}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;