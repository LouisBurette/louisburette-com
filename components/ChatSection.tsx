'use client';
import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

type Message = { role: 'user' | 'assistant'; content: string };
type Slot = { startTime: string; schedulingUrl: string };

const CALENDLY = 'https://calendly.com/hello-louisburette/30min';

function stripMarkdown(text: string): string {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^#{1,3}\s+/gm, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s*—\s*/g, ' - ')
    .replace(/\s*--\s*/g, ' - ');
}

const monoLabel: React.CSSProperties = {
  fontFamily: "'Space Mono', monospace",
  fontSize: '10px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
};

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

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    sendToN8n([{ role: 'user', content: '.' }], true);
  }, []);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, showSlots]);

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
      const assistantMsg: Message = { role: 'assistant', content: data.message || t('error') };
      setMessages(isInit ? [assistantMsg] : prev => [...prev, assistantMsg]);
      setChoices(data.choices || []);
      // Fin de conversation : on propose un créneau plutôt qu'un envoi d'email.
      if (data.showSlots || data.isComplete) fetchSlots();
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

  function formatSlot(iso: string) {
    return new Date(iso).toLocaleString(locale === 'fr' ? 'fr-FR' : locale === 'es' ? 'es-ES' : 'en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
    });
  }

  const avatar = (
    <div style={{ width: '30px', height: '30px', border: '3px solid #0A0A0A', backgroundColor: '#5B2BFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '9px', fontWeight: 800, color: '#fff' }}>LB</span>
    </div>
  );

  return (
    <section id="agent-ia" style={{ borderBottom: '4px solid #0A0A0A', background: '#F3F1EC', scrollMarginTop: '62px' }}>
      <div className="section-bar">
        <span className="section-bar-title">{t('label')}</span>
        <span className="section-bar-rule" />
      </div>

      <div className="section-pad">
        <div data-reveal style={{ marginBottom: '36px' }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(32px,4vw,54px)', lineHeight: 0.98, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>{t('title')}</h2>
          <p style={{ fontSize: '16px', color: '#4A463F', marginTop: '12px', maxWidth: '560px', lineHeight: 1.6 }}>{t('subtitle')}</p>
        </div>

        <div style={isFullscreen
          ? { position: 'fixed', inset: 0, zIndex: 500, border: 'none', boxShadow: 'none', display: 'flex', flexDirection: 'column', background: '#F3F1EC' }
          : { maxWidth: '920px', margin: '0 auto', border: '4px solid #0A0A0A', boxShadow: '12px 12px 0 #5B2BFF', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#F3F1EC' }}>

          {/* Title bar */}
          <div style={{ backgroundColor: '#0A0A0A', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <span style={{ width: '9px', height: '9px', backgroundColor: '#EDFF00', display: 'block', flexShrink: 0 }} />
              <span style={{ ...monoLabel, color: '#F3F1EC', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t('assistant')}</span>
            </div>
            <button
              onClick={() => setIsFullscreen(f => !f)}
              aria-label={isFullscreen ? t('collapse') : t('expand')}
              style={{ border: '2px solid #F3F1EC', background: 'transparent', cursor: 'pointer', color: '#F3F1EC', fontFamily: "'Space Mono', monospace", fontSize: '11px', fontWeight: 700, padding: '5px 12px', letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.4, whiteSpace: 'nowrap', flexShrink: 0 }}>
              {isFullscreen ? t('collapse') : t('expand')}
            </button>
          </div>

          {/* Messages */}
          <div ref={messagesContainerRef} className="chat-messages" style={{ height: isFullscreen ? undefined : 'clamp(260px,45vh,340px)', flex: isFullscreen ? 1 : undefined, overflowY: 'auto', padding: 'clamp(16px,3vw,24px)', background: '#F3F1EC', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {messages.map((msg, i) => (
              msg.role === 'assistant' ? (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  {avatar}
                  <div style={{ backgroundColor: '#fff', border: '3px solid #0A0A0A', padding: '12px 16px', maxWidth: '540px' }}>
                    <p style={{ fontSize: '14.5px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{stripMarkdown(msg.content)}</p>
                  </div>
                </div>
              ) : (
                <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ backgroundColor: '#0A0A0A', border: '3px solid #0A0A0A', padding: '12px 16px', maxWidth: '480px' }}>
                    <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#F3F1EC' }}>{msg.content}</p>
                  </div>
                </div>
              )
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                {avatar}
                <div style={{ backgroundColor: '#fff', border: '3px solid #0A0A0A', padding: '12px 16px' }}>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '14px', letterSpacing: '0.2em' }}>···</p>
                </div>
              </div>
            )}

            <div />
          </div>

          {/* Calendly slots — fixed above input */}
          {showSlots && (
            <div style={{ borderTop: '3px solid #0A0A0A', padding: '14px 20px', background: '#F3F1EC', flexShrink: 0 }}>
              <p style={{ ...monoLabel, fontWeight: 700, marginBottom: '10px', color: '#0A0A0A' }}>{t('slots_label')}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {slots.length > 0 ? slots.map((slot, i) => (
                  <a key={i} href={slot.schedulingUrl} target="_blank" rel="noreferrer" className="slot-link"
                    style={{ display: 'block', padding: '11px 14px', border: '3px solid #0A0A0A', backgroundColor: '#fff', color: '#0A0A0A', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
                    {formatSlot(slot.startTime)} →
                  </a>
                )) : (
                  <a href={CALENDLY} target="_blank" rel="noreferrer"
                    style={{ display: 'block', padding: '12px 14px', border: '3px solid #0A0A0A', backgroundColor: '#5B2BFF', color: '#fff', textDecoration: 'none', fontFamily: "'Syne', sans-serif", fontSize: '12px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center' }}>
                    {t('book_call')}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Choices */}
          {choices.length > 0 && (
            <div style={{ padding: '12px 20px', borderTop: '3px solid #0A0A0A', background: '#F3F1EC', display: 'flex', gap: '8px', flexWrap: 'wrap', flexShrink: 0 }}>
              {choices.map((choice, i) => (
                <button key={i} onClick={() => sendMessage(choice)} className="chip"
                  style={{ padding: '7px 14px', border: '3px solid #0A0A0A', backgroundColor: '#fff', fontFamily: "'Space Mono', monospace", fontSize: '11px', fontWeight: 700, cursor: 'pointer', color: '#0A0A0A', letterSpacing: '0.06em' }}>
                  {choice}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chat-input-row" style={{ padding: '14px 20px', borderTop: '4px solid #0A0A0A', background: '#F3F1EC', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', flexShrink: 0 }}>
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder={t('placeholder')}
              style={{ flex: '1 1 180px', minWidth: 0, border: '3px solid #0A0A0A', padding: '13px 14px', fontFamily: "'Archivo', sans-serif", fontSize: '14px', background: '#fff', outline: 'none', color: '#0A0A0A' }} />
            <button onClick={() => sendMessage()} disabled={loading} className="send-btn"
              style={{ padding: '12px 22px', border: '3px solid #0A0A0A', backgroundColor: '#0A0A0A', color: '#EDFF00', fontFamily: "'Syne', sans-serif", fontSize: '12px', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', opacity: loading ? 0.6 : 1 }}>
              {t('send')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
