'use client';
import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

type Message = { role: 'user' | 'assistant'; content: string };
type Slot = { startTime: string; schedulingUrl: string };

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^#{1,3}\s+/gm, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s*—\s*/g, ' - ')
    .replace(/\s*--\s*/g, ' - ');
}

export default function ChatSection() {
  const t = useTranslations('chat');
  const locale = useLocale();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);
  const [showSlots, setShowSlots] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    sendToN8n([{ role: 'user', content: '.' }], true);
  }, []);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, showSlots, isComplete]);

  useEffect(() => {
    if (isFullscreen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isFullscreen]);

  async function sendToN8n(msgs: Message[], isInit = false) {
    setLoading(true);
    setChoices([]);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs, lang: locale }),
      });
      const data = await res.json();
      const assistantMsg: Message = { role: 'assistant', content: data.message };
      setMessages(isInit ? [assistantMsg] : prev => [...prev, assistantMsg]);
      setChoices(data.choices || []);
      setIsComplete(data.isComplete || false);
      if (data.showSlots) fetchSlots();
    } catch {
      const errMsg: Message = { role: 'assistant', content: t('error') };
      setMessages(isInit ? [errMsg] : prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  }

  function sendMessage(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    const newMessages: Message[] = [...messages, { role: 'user', content: msg }];
    setMessages(newMessages);
    setInput('');
    setShowSlots(false);
    sendToN8n(newMessages);
  }

  async function fetchSlots() {
    try {
      const res = await fetch('/api/calendly-slots');
      const data = await res.json();
      setSlots(data.slots || []);
      setShowSlots(true);
    } catch { /* silent */ }
  }

  async function submitEmail() {
    if (!emailInput.trim() || emailSent) return;
    try {
      const lastAssistant = [...messages].reverse().find(m => m.role === 'assistant');
      const res = await fetch('/api/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, transcript: messages, lang: locale, summary: lastAssistant?.content || '' }),
      });
      if (!res.ok) throw new Error('Failed');
      setEmailSent(true);
    } catch {
      setEmailError(true);
    }
  }

  function formatSlot(iso: string) {
    return new Date(iso).toLocaleString(locale === 'fr' ? 'fr-FR' : locale === 'es' ? 'es-ES' : 'en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
    });
  }

  return (
    <section id="contact" style={{ padding: '80px 48px', borderBottom: '3px solid #1A1714', background: '#F5EFE5' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.35, fontWeight: 700, marginBottom: '12px' }}>{t('label')}</p>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(36px,4vw,56px)', lineHeight: 1.05 }}>{t('title')}</h2>
        <p style={{ fontSize: '16px', opacity: 0.55, marginTop: '10px', fontWeight: 300, maxWidth: '560px' }}>{t('subtitle')}</p>
      </div>

      <div style={isFullscreen
        ? { position: 'fixed', inset: 0, zIndex: 500, border: 'none', boxShadow: 'none', display: 'flex', flexDirection: 'column', background: '#F5EFE5' }
        : { maxWidth: '920px', margin: '0 auto', border: '3px solid #1A1714', boxShadow: '8px 8px 0 #E8622A', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Title bar */}
        <div style={{ background: '#1A1714', padding: '13px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2D5A27', display: 'block' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(245,239,229,0.6)', letterSpacing: '0.04em' }}>
              {locale === 'fr' ? 'Assistant personnel de Louis' : locale === 'es' ? 'Asistente personal de Louis' : "Louis's personal assistant"}
            </span>
          </div>
          {isFullscreen ? (
            <button onClick={() => setIsFullscreen(false)}
              style={{ background: 'rgba(245,239,229,0.15)', border: '1px solid rgba(245,239,229,0.3)', cursor: 'pointer', color: '#F5EFE5', fontSize: '13px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, padding: '5px 14px', letterSpacing: '0.04em', lineHeight: 1 }}
              aria-label="Fermer">
              ← Retour
            </button>
          ) : (
            <button onClick={() => setIsFullscreen(true)}
              style={{ background: 'rgba(245,239,229,0.15)', border: '1px solid rgba(245,239,229,0.3)', cursor: 'pointer', color: '#F5EFE5', fontSize: '13px', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, padding: '5px 14px', letterSpacing: '0.04em', lineHeight: 1 }}
              aria-label="Plein écran">
              Agrandir ↗
            </button>
          )}
        </div>

        {/* Messages */}
        <div ref={messagesContainerRef} className="chat-messages" style={{ height: isFullscreen ? undefined : '340px', flex: isFullscreen ? 1 : undefined, overflowY: 'auto', padding: '24px', background: '#F5EFE5', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {messages.map((msg, i) => (
            msg.role === 'assistant' ? (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', border: '2px solid #1A1714', background: '#E8622A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '8px', fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>{locale === 'en' ? 'AI' : 'IA'}</span>
                </div>
                <div style={{ background: '#fff', border: '2px solid #1A1714', padding: '11px 15px', maxWidth: '540px', boxShadow: '3px 3px 0 rgba(26,23,20,0.07)' }}>
                  <p style={{ fontSize: '14px', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{stripMarkdown(msg.content)}</p>
                </div>
              </div>
            ) : (
              <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ background: '#1A1714', padding: '11px 15px', maxWidth: '480px' }}>
                  <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#F5EFE5' }}>{msg.content}</p>
                </div>
              </div>
            )
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ width: '28px', height: '28px', border: '2px solid #1A1714', background: '#E8622A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '8px', fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>{locale === 'en' ? 'AI' : 'IA'}</span>
              </div>
              <div style={{ background: '#fff', border: '2px solid #1A1714', padding: '11px 15px', boxShadow: '3px 3px 0 rgba(26,23,20,0.07)' }}>
                <p style={{ fontSize: '14px', opacity: 0.4, letterSpacing: '0.16em' }}>···</p>
              </div>
            </div>
          )}

          {/* Email completion */}
          {isComplete && !emailSent && (
            <div style={{ border: '2px solid #1A1714', padding: '16px', background: '#fff' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>
                {locale === 'fr' ? 'Recevoir un résumé de notre échange par email :' : locale === 'es' ? 'Recibir un resumen por email:' : 'Get a summary of our conversation:'}
              </p>
              <div className="chat-input-row" style={{ display: 'flex', gap: '8px' }}>
                <input type="email" value={emailInput} onChange={e => setEmailInput(e.target.value)}
                  placeholder={t('email_placeholder')}
                  style={{ flex: 1, border: '2px solid #1A1714', padding: '10px 14px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', background: '#fff', outline: 'none', color: '#1A1714' }} />
                <button onClick={submitEmail}
                  style={{ padding: '10px 20px', border: '2px solid #E8622A', background: '#E8622A', color: '#fff', fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase', boxShadow: '3px 3px 0 #1A1714', whiteSpace: 'nowrap' }}>
                  {t('email_submit')}
                </button>
              </div>
            </div>
          )}
          {isComplete && emailSent && (
            <div style={{ padding: '12px 16px', background: 'rgba(45,90,39,0.07)', border: '2px solid #2D5A27', color: '#2D5A27', fontSize: '13px', fontWeight: 600 }}>
              ✓ {t('email_sent')}
            </div>
          )}
          {emailError && !emailSent && (
            <div style={{ padding: '12px 16px', background: 'rgba(220,38,38,0.07)', border: '2px solid #DC2626', color: '#DC2626', fontSize: '13px', fontWeight: 600 }}>
              {locale === 'fr' ? 'Erreur lors de l\'envoi. Veuillez réessayer.' : locale === 'es' ? 'Error al enviar. Por favor, inténtalo de nuevo.' : 'Error sending. Please try again.'}
            </div>
          )}

          <div />
        </div>

        {/* Calendly slots — fixed above input */}
        {showSlots && (
          <div style={{ borderTop: '2px solid #1A1714', padding: '14px 20px', background: '#F5EFE5', flexShrink: 0 }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px', color: '#1A1714', opacity: 0.4 }}>
              {locale === 'fr' ? 'Créneaux disponibles' : locale === 'es' ? 'Horarios disponibles' : 'Available slots'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {slots.length > 0 ? slots.map((slot, i) => (
                <a key={i} href={slot.schedulingUrl} target="_blank" rel="noreferrer"
                  style={{ display: 'block', padding: '10px 14px', border: '2px solid #E8622A', color: '#1A1714', textDecoration: 'none', fontSize: '13px', fontWeight: 600, transition: 'all 0.1s', background: 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#E8622A'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1A1714'; }}>
                  {formatSlot(slot.startTime)} →
                </a>
              )) : (
                <a href="https://calendly.com/hello-louisburette/30min" target="_blank" rel="noreferrer"
                  style={{ display: 'block', padding: '10px 14px', border: '2px solid #E8622A', background: '#E8622A', color: '#fff', textDecoration: 'none', fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center' }}>
                  {locale === 'fr' ? 'Réserver un appel →' : locale === 'es' ? 'Reservar una llamada →' : 'Book a call →'}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Choices or default suggestions */}
        {(choices.length > 0 || !loading) && (
          <div style={{ padding: '10px 20px', borderTop: '2px solid rgba(26,23,20,0.1)', background: '#F5EFE5', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(choices.length > 0 ? choices : []).map((choice, i) => (
              <button key={i} onClick={() => sendMessage(choice)}
                style={{ padding: '6px 14px', border: '2px solid rgba(26,23,20,0.25)', background: 'transparent', fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: 600, cursor: 'pointer', color: '#1A1714', letterSpacing: '0.04em', transition: 'all 0.1s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#1A1714'; e.currentTarget.style.background = '#1A1714'; e.currentTarget.style.color = '#F5EFE5'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,23,20,0.25)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1A1714'; }}>
                {choice}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chat-input-row" style={{ padding: '14px 20px', borderTop: '3px solid #1A1714', background: '#F5EFE5', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder={t('placeholder')}
            style={{ flex: 1, border: '2px solid #1A1714', padding: '10px 14px', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', background: '#fff', outline: 'none', color: '#1A1714' }} />
          <button onClick={() => sendMessage()}
            disabled={loading}
            style={{ padding: '10px 20px', border: '2px solid #E8622A', background: '#E8622A', color: '#fff', fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap', boxShadow: '3px 3px 0 #1A1714', opacity: loading ? 0.6 : 1 }}>
            {t('send')}
          </button>
        </div>
      </div>
    </section>
  );
}
