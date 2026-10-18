// Horários de funcionamento do Lumina
// Cada dia: array de pares [abre, fecha] em minutos desde meia-noite
const schedule = {
  0: [[720, 960]],                  // Domingo: 12:00 – 16:00
  1: [[720, 900], [1140, 1380]],    // Segunda: 12:00 – 15:00 / 19:00 – 23:00
  2: [[720, 900], [1140, 1380]],    // Terça
  3: [[720, 900], [1140, 1380]],    // Quarta
  4: [[720, 900], [1140, 1380]],    // Quinta
  5: [[720, 900], [1140, 1410]],    // Sexta: 12:00 – 15:00 / 19:00 – 23:30
  6: [[720, 900], [1140, 1410]],    // Sábado
};

const dayNamesPt = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const dayNamesEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const formatTime = (minutes) =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;

export function getOpenStatus(now = new Date(), lang = 'pt') {
  const en = lang === 'en';
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const slots = schedule[day] || [];

  // Aberto agora?
  for (const [open, close] of slots) {
    if (minutes >= open && minutes < close) {
      return { open: true, message: en ? `Open until ${formatTime(close)}` : `Aberto até às ${formatTime(close)}` };
    }
  }

  // Ainda abre hoje
  for (const [open] of slots) {
    if (minutes < open) {
      return { open: false, message: en ? `Opens today at ${formatTime(open)}` : `Abre hoje às ${formatTime(open)}` };
    }
  }

  // Próximo dia de abertura
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const next = (schedule[d] || [])[0];
    if (next) {
      const label = en
        ? i === 1 ? 'tomorrow' : `on ${dayNamesEn[d]}`
        : i === 1 ? 'amanhã' : `à ${dayNamesPt[d]}`;
      return {
        open: false,
        message: en
          ? `Closed · Opens ${label} at ${formatTime(next[0])}`
          : `Encerrado · Abre ${label} às ${formatTime(next[0])}`,
      };
    }
  }

  return { open: false, message: en ? 'Closed' : 'Encerrado' };
}
