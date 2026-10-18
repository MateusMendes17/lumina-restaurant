// Analytics minimal e privacy-friendly (primeira parte).
// Configurar o endpoint em index.html: window.__ANALYTICS_ENDPOINT__ = 'https://...'
// Sem endpoint definido, todas as chamadas são no-op.

export function track(event, payload = {}) {
  const endpoint =
    (typeof window !== 'undefined' && window.__ANALYTICS_ENDPOINT__) || null;
  if (!endpoint) return;

  const body = JSON.stringify({
    event,
    path: typeof window !== 'undefined' ? window.location.pathname : '',
    ts: Date.now(),
    ...payload,
  });

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, body);
    } else {
      fetch(endpoint, { method: 'POST', body, keepalive: true });
    }
  } catch {
    // silencioso — analytics nunca deve quebrar a experiência
  }
}
