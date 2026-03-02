import React, { useState, useEffect, useRef, useCallback } from 'react';

type SC = () => React.ReactElement;
const N = 9;

export default function ARGOS() {
  const [s, setS] = useState(0);
  const [k, setK] = useState(0);
  const lk = useRef(false);
  const ty = useRef<number | null>(null);

  const go = useCallback((to: number) => {
    if (lk.current || to < 0 || to >= N || to === s) return;
    lk.current = true;
    setK((v) => v + 1);
    setS(to);
    setTimeout(() => { lk.current = false; }, 550);
  }, [s]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (['ArrowDown','ArrowRight',' ','Enter','PageDown'].includes(e.key)) { e.preventDefault(); go(s + 1); }
      if (['ArrowUp','ArrowLeft','PageUp','Backspace'].includes(e.key)) { e.preventDefault(); go(s - 1); }
      if (e.key === 'Home') { e.preventDefault(); go(0); }
      if (e.key === 'End') { e.preventDefault(); go(N - 1); }
    };
    let wt: number | null = null;
    const w = (e: WheelEvent) => {
      if (wt) return;
      wt = window.setTimeout(() => { wt = null; }, 700);
      if (e.deltaY > 20) go(s + 1);
      if (e.deltaY < -20) go(s - 1);
    };
    window.addEventListener('keydown', h);
    window.addEventListener('wheel', w, { passive: true });
    return () => { window.removeEventListener('keydown', h); window.removeEventListener('wheel', w); };
  }, [s, go]);

  const ts = (e: React.TouchEvent) => { ty.current = e.touches[0].clientY; };
  const te = (e: React.TouchEvent) => {
    if (ty.current === null) return;
    const d = ty.current - e.changedTouches[0].clientY;
    if (Math.abs(d) > 40) go(d > 0 ? s + 1 : s - 1);
    ty.current = null;
  };

  const all: SC[] = [Myth, Spoiler, Feed, Dashboard, AppSlide, Vision, Impact, Reveal, Closing];
  const C = all[s];

  return (
    <div onTouchStart={ts} onTouchEnd={te} style={{ width: '100vw', height: '100dvh', overflow: 'hidden', position: 'relative', background: '#FFFFFF', fontFamily: "'Outfit',sans-serif", color: I, WebkitFontSmoothing: 'antialiased' }}>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html,body{overflow:hidden;height:100dvh;width:100vw;background:#fff}
::selection{background:rgba(184,134,11,.12)}
@keyframes su{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes br{0%,100%{transform:scale(1);opacity:.45}50%{transform:scale(1.06);opacity:.8}}
@keyframes rp{0%{transform:translate(-50%,-50%) scale(1);opacity:.4}100%{transform:translate(-50%,-50%) scale(3);opacity:0}}
@keyframes sp{0%,100%{opacity:.25}50%{opacity:.08}}
@keyframes dp{0%,100%{box-shadow:0 0 0 0 rgba(181,32,32,.4)}70%{box-shadow:0 0 0 8px rgba(181,32,32,0)}}
      `}</style>

      <nav style={{ position: 'fixed', right: 12, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 6, zIndex: 999 }}>
        {Array.from({ length: N }).map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{ width: i === s ? 10 : 6, height: i === s ? 10 : 6, borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0, transition: 'all .3s', background: i === s ? G2 : 'rgba(0,0,0,.08)', boxShadow: i === s ? `0 0 8px ${G2}50` : 'none' }} />
        ))}
      </nav>

      {s > 0 && <button onClick={() => go(s - 1)} style={{ position: 'fixed', top: 8, left: '50%', transform: 'translateX(-50%)', zIndex: 999, background: 'none', border: 'none', color: 'rgba(0,0,0,.1)', fontSize: 13, cursor: 'pointer', padding: 6 }}>▲</button>}
      {s < N - 1 && <button onClick={() => go(s + 1)} style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 999, background: 'none', border: 'none', color: 'rgba(0,0,0,.1)', fontSize: 13, cursor: 'pointer', padding: 6, animation: 'sp 2.5s ease infinite' }}>▼</button>}
      <div style={{ position: 'fixed', bottom: 8, left: '50%', transform: 'translateX(-50%)', zIndex: 999, fontFamily: MO, fontSize: 9, color: 'rgba(0,0,0,.1)', letterSpacing: 3 }}>{String(s + 1).padStart(2, '0')} — {String(N).padStart(2, '0')}</div>

      <div key={k} style={{ width: '100%', height: '100%', animation: 'su .5s cubic-bezier(.22,1,.36,1) both' }}><C /></div>
    </div>
  );
}

/* ── DESIGN SYSTEM ── */
const I = '#111827';
const I2 = '#1F2937';
const I3 = '#4B5563';
const I4 = '#9CA3AF';
const G = '#92750E';
const G2 = '#B8930F';
const BL = '#1E3FA0';
const BL2 = '#2E5DC2';
const GR = '#047857';
const RD = '#B91C1C';
const AM = '#A16207';
const PU = '#6D28D9';
const BG = '#F9FAFB';
const BD = 'rgba(0,0,0,.06)';
const BD2 = 'rgba(0,0,0,.1)';
const SH = '0 1px 3px rgba(0,0,0,.04)';
const SH2 = '0 12px 40px rgba(0,0,0,.07)';
const SF = "'Instrument Serif',Georgia,serif";
const MO = "'JetBrains Mono',monospace";

/* ── SHARED COMPONENTS ── */
const SL: React.FC<{ children: React.ReactNode; c?: boolean }> = ({ children, c }) => (
  <div style={{ width: '100%', height: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(20px,4vw,36px) clamp(20px,5vw,64px)', position: 'relative', overflow: 'hidden', background: '#fff', ...(c ? { alignItems: 'center', textAlign: 'center' as const } : {}) }}>{children}</div>
);

const TAG: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = G2 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 'clamp(8px,1.5vw,14px)', fontFamily: MO, fontSize: 'clamp(10px,1.2vw,12px)', letterSpacing: 4, textTransform: 'uppercase', color, fontWeight: 500 }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block' }} />{children}
  </div>
);

const BOX: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style = {} }) => (
  <div style={{ background: BG, border: `1px solid ${BD}`, borderRadius: 'clamp(8px,1.2vw,14px)', padding: 'clamp(14px,2vw,24px) clamp(12px,1.8vw,20px)', boxShadow: SH, ...style }}>{children}</div>
);

const H2: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style = {} }) => (
  <h2 style={{ fontSize: 'clamp(24px,4.2vw,48px)', fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.1, marginBottom: 'clamp(10px,1.5vw,16px)', color: I, ...style }}>{children}</h2>
);

const P: React.FC<{ children: React.ReactNode; mb?: number | string; style?: React.CSSProperties }> = ({ children, mb = 20, style = {} }) => (
  <p style={{ fontSize: 'clamp(14px,1.6vw,18px)', color: I3, fontWeight: 300, lineHeight: 1.7, marginBottom: mb, ...style }}>{children}</p>
);

/* ══ 0. O MITO ══ */
function Myth() {
  return (
    <SL c>
      <div style={{ fontSize: 'clamp(36px,7vw,72px)', marginBottom: 'clamp(16px,3vw,32px)', animation: 'br 4.5s ease infinite' }}>👁️</div>
      <div style={{ maxWidth: 720 }}>
        <P mb="clamp(12px,2vw,24px)" style={{ fontSize: 'clamp(16px,2.8vw,32px)', color: I2, fontWeight: 300, lineHeight: 1.65 }}>
          Na antiguidade, existia um gigante chamado <span style={{ color: G2, fontWeight: 500 }}>Argos</span>, que tinha <span style={{ color: G2, fontWeight: 500 }}>cem olhos</span> e nunca dormia. Onde ele estava, nada passava despercebido.
        </P>
        <P mb="clamp(12px,2vw,24px)" style={{ fontSize: 'clamp(16px,2.8vw,32px)', color: I3, fontWeight: 300, lineHeight: 1.65 }}>
          Hoje, a nossa cidade é esse gigante. Cada morador com um celular é <span style={{ color: G2, fontWeight: 500 }}>um desses olhos</span>.
        </P>
        <P mb={0} style={{ fontSize: 'clamp(16px,2.8vw,32px)', color: I4, fontWeight: 300, lineHeight: 1.65 }}>
          E a nossa <span style={{ color: G2, fontWeight: 500 }}>Inteligência Artificial</span> é o cérebro que une todos eles, garantindo que a informação certa chegue na hora certa.
        </P>
      </div>
      <div style={{ position: 'absolute', bottom: 'clamp(12px,2vw,28px)', left: '50%', transform: 'translateX(-50%)', fontFamily: MO, fontSize: 'clamp(6px,.8vw,8px)', letterSpacing: 3, color: 'rgba(0,0,0,.06)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>ITCAST — Instituto de Tecnologia, Ciência e Assistência Social</div>
    </SL>
  );
}

/* ══ 1. SPOILER ══ */
function Spoiler() {
  return (
    <SL c>
      <H2 style={{ fontSize: 'clamp(26px,5vw,56px)', lineHeight: 1.15, marginBottom: 'clamp(10px,1.5vw,16px)' }}>
        Um incidente. <span style={{ color: G2 }}>Múltiplos órgãos.</span><br />Ação coordenada.
      </H2>
      <P mb="clamp(20px,3vw,36px)" style={{ maxWidth: 520 }}>Qualquer órgão assume. Dois ou mais atuam juntos. Todos acompanham. O cidadão vê quem está cuidando.</P>
      <div style={{ position: 'relative', width: 'min(560px,88vw)', height: 'clamp(200px,30vw,300px)' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'clamp(60px,10vw,90px)', height: 'clamp(60px,10vw,90px)', borderRadius: '50%', background: `linear-gradient(135deg,${BL},${BL2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', zIndex: 5, boxShadow: `0 6px 24px ${BL}18` }}>
          <span style={{ fontSize: 'clamp(18px,3vw,26px)' }}>🚨</span>
          <span style={{ fontSize: 'clamp(7px,1vw,9px)', fontWeight: 700, color: '#fff', marginTop: 2 }}>Ocorrência</span>
        </div>
        <svg width="100%" height="100%" viewBox="0 0 560 300" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', zIndex: 1 }}>
          {[[280,150,280,12],[280,150,480,55],[280,150,480,245],[280,150,80,55],[280,150,80,245]].map(([x1,y1,x2,y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={BD2} strokeWidth={1} strokeDasharray="4 3" />
          ))}
        </svg>
        {[
          { icon: '🚒', name: 'Bombeiros', s: { left: '50%', top: 0, transform: 'translateX(-50%)' } as React.CSSProperties },
          { icon: '🚔', name: 'Pol. Militar', s: { right: '0%', top: '10%' } as React.CSSProperties },
          { icon: '🛡️', name: 'Defesa Civil', s: { right: '0%', bottom: '4%' } as React.CSSProperties },
          { icon: '🔍', name: 'Pol. Civil', s: { left: '0%', top: '10%' } as React.CSSProperties },
          { icon: '🏛️', name: 'Guarda Civil', s: { left: '0%', bottom: '4%' } as React.CSSProperties },
        ].map((o, i) => (
          <div key={i} style={{ position: 'absolute', ...o.s, width: 'clamp(54px,8vw,76px)', height: 'clamp(48px,7vw,68px)', borderRadius: 'clamp(8px,1.2vw,14px)', background: BG, border: `1px solid ${BD}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: SH }}>
            <span style={{ fontSize: 'clamp(16px,2.5vw,22px)' }}>{o.icon}</span>
            <span style={{ fontSize: 'clamp(7px,1vw,10px)', color: I3, marginTop: 2, fontWeight: 500 }}>{o.name}</span>
          </div>
        ))}
        <div style={{ position: 'absolute', bottom: -14, left: '50%', transform: 'translateX(-50%)', fontSize: 'clamp(8px,1.1vw,11px)', color: I4, fontFamily: MO, letterSpacing: 1, whiteSpace: 'nowrap' }}>+ SAMU, Vigilância, Conselhos, ...</div>
      </div>
    </SL>
  );
}

/* ══ 2. FEED ══ */
function Feed() {
  return (
    <SL>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(24px,4vw,52px)', alignItems: 'center' }}>
        <div>
          <TAG color={PU}>A Rede Social</TAG>
          <H2>Não é só um app.<br /><span style={{ color: PU }}>É a rede social da segurança.</span></H2>
          <P mb={12}>Cada ocorrência vira um post no feed do bairro. Cidadãos comentam. Órgãos respondem publicamente. Quando o Bombeiro posta <em style={{ color: I2, fontStyle: 'normal', fontWeight: 500 }}>"Viatura a caminho, monitorando via Argos"</em>, ele valida a plataforma inteira.</P>
          <P mb={20} style={{ color: I2, fontWeight: 500 }}>O cidadão deixa de ser "alguém que reclama" e se torna <strong style={{ color: G2 }}>um dos olhos de Argos</strong>.</P>
          <div style={{ display: 'flex', gap: 'clamp(12px,2vw,18px)', flexWrap: 'wrap' }}>
            {([['Feed','por bairro'],['Comentários','cidadão + órgão'],['Curtidas','engajamento'],['Status','transparente']] as const).map(([n, d], i) => (
              <div key={i}><div style={{ fontSize: 'clamp(13px,1.4vw,15px)', fontWeight: 700, color: PU }}>{n}</div><div style={{ fontSize: 'clamp(10px,1.1vw,12px)', color: I3 }}>{d}</div></div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 'min(272px, 100%)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { u: 'Maria S.', tp: '🔥 Incêndio', tx: 'Princípio de incêndio em terreno na Rua das Flores. Fumaça visível.', og: '🚒 Bombeiros assumiram', oc: RD, st: 'EM ATENDIMENTO', cm: { f: '🚒 Bombeiros', t: 'Equipe Alpha deslocada. ETA 4 min. Via Argos.' }, lk: 12, co: 3, tm: '5 min' },
              { u: 'Carlos R.', tp: '🚗 Acidente', tx: 'Colisão no cruzamento da Av. Principal. Trânsito parado.', og: '🚔 PM + 🚑 SAMU', oc: BL, st: '2 ÓRGÃOS', lk: 24, co: 7, tm: '18 min' },
            ].map((p, i) => (
              <BOX key={i} style={{ padding: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: BG, border: `1px solid ${BD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: I2 }}>{p.u[0]}</div>
                    <div><div style={{ fontSize: 11, fontWeight: 600, color: I }}>{p.u}</div><div style={{ fontSize: 8, color: I4 }}>{p.tm} atrás</div></div>
                  </div>
                  <span style={{ fontSize: 8, padding: '2px 6px', background: BG, borderRadius: 4, fontWeight: 500, color: I2, border: `1px solid ${BD}` }}>{p.tp}</span>
                </div>
                <p style={{ fontSize: 11, color: I2, lineHeight: 1.5, marginBottom: 7 }}>{p.tx}</p>
                <div style={{ fontSize: 9, padding: '5px 7px', background: `${p.oc}08`, borderRadius: 5, color: p.oc, fontWeight: 600, marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: `1px solid ${p.oc}12` }}>
                  <span>{p.og}</span><span style={{ fontSize: 8, background: `${p.oc}0A`, padding: '2px 5px', borderRadius: 3 }}>{p.st}</span>
                </div>
                {p.cm && <div style={{ background: BG, borderRadius: 5, padding: 6, marginBottom: 6, border: `1px solid ${BD}` }}><div style={{ fontSize: 9, color: I2, lineHeight: 1.4 }}><span style={{ fontWeight: 700, color: p.oc, fontSize: 9 }}>{p.cm.f}:</span> {p.cm.t}</div></div>}
                <div style={{ display: 'flex', gap: 12, fontSize: 9, color: I3 }}><span>❤️ {p.lk}</span><span>💬 {p.co}</span></div>
              </BOX>
            ))}
          </div>
        </div>
      </div>
    </SL>
  );
}

/* ══ 3. DASHBOARD ══ */
function Dashboard() {
  return (
    <SL>
      <TAG>O Cérebro</TAG>
      <H2>Centro de comando com <span style={{ color: G2 }}>mapa de atendimento</span></H2>
      <P mb="clamp(10px,1.5vw,16px)">Cada órgão monitora sua área com polígonos de abrangência, lista de ocorrências e alertas sonoros em tempo real.</P>
      <BOX style={{ padding: 'clamp(8px,1.2vw,12px)', boxShadow: SH2 }}>
        <div style={{ display: 'flex', gap: 5, marginBottom: 10, alignItems: 'center' }}>
          {['#FF5F57','#FFBD2E','#28C840'].map((c, i) => <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
          <div style={{ flex: 1, background: BG, borderRadius: 5, marginLeft: 10, padding: '4px 10px', fontSize: 9, color: I3, fontFamily: MO }}>argos.app/painel — Corpo de Bombeiros</div>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3, padding: '3px 8px', background: `${RD}08`, borderRadius: 4, fontSize: 8, color: RD, fontWeight: 600 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: RD, display: 'inline-block', animation: 'dp 1.5s ease infinite' }} />LIVE
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
              {[{ n: '7', l: 'Ativas', c: RD }, { n: '3', l: 'Assumidas', c: AM }, { n: '12', l: 'Hoje', c: BL }, { n: '2m14s', l: 'Resp. Média', c: GR }].map((x, i) => (
                <div key={i} style={{ background: BG, borderRadius: 8, padding: '7px 8px', textAlign: 'center', border: `1px solid ${BD}` }}>
                  <div style={{ fontFamily: MO, fontSize: 16, fontWeight: 700, color: x.c }}>{x.n}</div>
                  <div style={{ fontSize: 8, color: I3, marginTop: 1 }}>{x.l}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: I, display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>🔔 Ocorrências <span style={{ background: RD, color: '#fff', fontSize: 8, padding: '1px 5px', borderRadius: 6 }}>7</span></div>
            {[
              { t: '🔥 Incêndio', loc: 'R. das Flores, 280', tm: '2 min', st: 'NOVA', c: RD, hot: true },
              { t: '🚗 Acidente', loc: 'Av. Principal × R. 7', tm: '8 min', st: 'ASSUMIDA', c: AM },
              { t: '🎭 Atitude Suspeita', loc: 'Praça Central', tm: '15 min', st: 'ANDAMENTO', c: BL },
              { t: '🚑 Emergência', loc: 'R. do Porto, 45', tm: '22 min', st: 'PM + SAMU', c: AM },
              { t: '📢 Distúrbio', loc: 'Av. Litorânea', tm: '31 min', st: 'RESOLVIDA', c: GR },
            ].map((r, i) => (
              <div key={i} style={{ background: r.hot ? `${r.c}06` : BG, borderRadius: 7, padding: '7px 9px', borderLeft: `3px solid ${r.c}`, border: `1px solid ${r.hot ? `${r.c}12` : BD}`, borderLeftWidth: 3, borderLeftColor: r.c }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 9, fontWeight: 600, color: I }}>{r.t}</span><span style={{ fontSize: 8, color: I4, fontFamily: MO }}>{r.tm}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}><span style={{ fontSize: 8, color: I3 }}>{r.loc}</span><span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 7, fontWeight: 600, background: `${r.c}08`, color: r.c }}>{r.st}</span></div>
              </div>
            ))}
          </div>
          <div style={{ background: 'linear-gradient(145deg,#E3E8F2,#ECF0F8)', borderRadius: 12, position: 'relative', overflow: 'hidden', minHeight: 'clamp(200px,28vw,300px)', border: `1px solid ${BD}` }}>
            <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(6px)', borderRadius: 7, padding: '5px 11px', display: 'flex', gap: 10, fontSize: 8, zIndex: 5, border: `1px solid ${BD}`, boxShadow: SH }}>
              {[{ c: RD, l: 'Nova' }, { c: AM, l: 'Assumida' }, { c: BL, l: 'Andamento' }, { c: GR, l: 'Resolvida' }].map((x, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 3, color: I3 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: x.c, display: 'inline-block' }} />{x.l}</span>
              ))}
            </div>
            <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,.85)', borderRadius: 5, padding: '4px 8px', fontFamily: MO, fontSize: 7, color: BL, border: `1px solid ${BL}18`, zIndex: 5 }}>📍 Abrangência: Zona Sul</div>
            <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute' }}>
              <defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={BL2} stopOpacity={0.05} /><stop offset="100%" stopColor="#6B9CF0" stopOpacity={0.02} /></linearGradient></defs>
              <polygon points="50,30 350,18 395,185 325,260 65,235" fill="url(#pg)" stroke={BL2} strokeWidth={1.3} strokeDasharray="6 3" opacity={0.65} />
            </svg>
            <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', opacity: .06 }}>
              <path d="M 0 140 Q 140 120 280 150 T 560 130" stroke={I} strokeWidth={3} fill="none" />
              <path d="M 230 0 Q 240 110 220 300" stroke={I} strokeWidth={2} fill="none" />
            </svg>
            {[{ x: '17%', y: '24%', c: RD, t: '🔥', p: true }, { x: '44%', y: '50%', c: AM, t: '🚗' }, { x: '62%', y: '22%', c: BL, t: '🎭' }, { x: '34%', y: '68%', c: AM, t: '🚑' }, { x: '78%', y: '50%', c: GR, t: '✅' }].map((m, i) => (
              <div key={i}>
                {m.p && <div style={{ position: 'absolute', left: m.x, top: m.y, width: 32, height: 32, borderRadius: '50%', border: `2px solid ${m.c}`, animation: 'rp 2.5s ease infinite' }} />}
                <div style={{ position: 'absolute', left: m.x, top: m.y, width: 28, height: 28, borderRadius: '50%', background: `${m.c}0C`, border: `2px solid ${m.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, transform: 'translate(-50%,-50%)', zIndex: 2, boxShadow: `0 2px 8px ${m.c}20` }}>{m.t}</div>
              </div>
            ))}
            <div style={{ position: 'absolute', bottom: 6, right: 8, fontSize: 7, color: I4, opacity: .5, fontFamily: MO }}>Mapbox GL + PostGIS</div>
          </div>
        </div>
      </BOX>
    </SL>
  );
}

/* ══ 4. APP ══ */
function AppSlide() {
  return (
    <SL>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px,4vw,52px)', alignItems: 'center' }}>
        <div>
          <TAG color={BL2}>O Olho</TAG>
          <H2>Cada cidadão,<br /><span style={{ color: BL2 }}>um olho de Argos.</span></H2>
          <P mb={20}>Em segundos, qualquer pessoa registra uma ocorrência com foto, descrição e GPS automático. O alerta é instantâneo.</P>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1vw,10px)' }}>
            {([['📷','Câmera integrada para registro visual'],['📍','GPS automático com geocoding'],['🔒','Denúncia anônima com sigilo total'],['🏷️','12 categorias de ocorrência'],['🏘️','Feed do bairro em tempo real'],['💬','Comentários cidadãos + órgãos']] as const).map(([ic, tx], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 'clamp(14px,1.6vw,18px)', width: 24, textAlign: 'center' }}>{ic}</span>
                <span style={{ fontSize: 'clamp(12px,1.4vw,15px)', color: I2 }}>{tx}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 'clamp(200px,30vw,252px)', height: 'clamp(400px,60vw,504px)', borderRadius: 'clamp(20px,3vw,32px)', background: 'linear-gradient(180deg,#EEEEE8,#E4E4DE)', border: `2px solid ${BD2}`, padding: 'clamp(6px,1vw,9px)', boxShadow: SH2 }}>
            <div style={{ width: 'clamp(50px,8vw,68px)', height: 'clamp(14px,2vw,20px)', background: BG, borderRadius: 10, margin: '0 auto 8px', border: `1px solid ${BD}` }} />
            <div style={{ background: '#FFF', borderRadius: 'clamp(14px,2.5vw,22px)', height: 'calc(100% - 33px)', padding: 'clamp(8px,1.2vw,12px)', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 'clamp(5px,.8vw,8px)' }}>
              <div style={{ fontSize: 'clamp(11px,1.3vw,13px)', fontWeight: 700, color: I }}>Nova Ocorrência</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {['🔥 Incêndio','🚗 Acidente','🎭 Suspeita','🚑 Emergência'].map((c, i) => (
                  <span key={i} style={{ padding: '3px 8px', background: i === 0 ? `${BL}08` : BG, border: `1px solid ${i === 0 ? `${BL}15` : BD}`, borderRadius: 6, fontSize: 'clamp(7px,.9vw,9px)', color: i === 0 ? BL : I3, fontWeight: i === 0 ? 600 : 400 }}>{c}</span>
                ))}
              </div>
              <div style={{ background: BG, borderRadius: 7, padding: 7, fontSize: 9, color: I4, border: `1px solid ${BD}`, minHeight: 30 }}>Descreva o que acontece...</div>
              <div style={{ background: BG, borderRadius: 7, height: 'clamp(36px,5vw,56px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px dashed ${BD}` }}><span style={{ fontSize: 9, color: I4 }}>📷 Toque para adicionar foto</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: 6, background: `${GR}06`, borderRadius: 6, border: `1px solid ${GR}12` }}><span style={{ fontSize: 11 }}>📍</span><span style={{ fontSize: 9, color: GR, fontWeight: 500 }}>GPS capturado • Centro</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: 5, background: BG, borderRadius: 6 }}><div style={{ width: 24, height: 13, borderRadius: 7, background: BL2, position: 'relative' }}><div style={{ width: 9, height: 9, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, right: 2 }} /></div><span style={{ fontSize: 9, color: I2 }}>Sigilo ativo</span></div>
              <div style={{ background: `linear-gradient(135deg,${BL},${BL2})`, borderRadius: 8, padding: '8px 0', textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#fff', marginTop: 'auto', boxShadow: `0 4px 12px ${BL}20` }}>Enviar Alerta</div>
            </div>
          </div>
        </div>
      </div>
    </SL>
  );
}

/* ══ 5. VISÃO ══ */
function Vision() {
  return (
    <SL>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px,4vw,52px)', alignItems: 'center' }}>
        <div>
          <TAG color={BL2}>Visão</TAG>
          <H2>De rede social da segurança<br />para <span style={{ color: G2 }}>plataforma de cidade inteligente.</span></H2>
          <P mb={20}>Argos começa como os olhos da cidade e evolui para o cérebro que conecta cidadãos, órgãos e inteligência artificial em uma rede sem precedentes.</P>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.2vw,10px)' }}>
          {[
            { ic: '🤖', t: 'IA para Triagem', d: 'Classificação automática de ocorrências por prioridade e tipo.' },
            { ic: '🗺️', t: 'Heatmap Público', d: 'Mapa anonimizado de incidentes por região para gestores e cidadãos.' },
            { ic: '🏆', t: 'Gamificação', d: "Pontos e badges. 'Olho de Argos do Mês.' Engajamento que escala." },
            { ic: '📊', t: 'Relatórios Políticos', d: 'Dados por região para secretarias e vereadores em tempo real.' },
            { ic: '🔗', t: 'Integração 190/193', d: 'API bidirecional com canais existentes. Zero duplicidade.' },
            { ic: '📡', t: 'IoT e Câmeras', d: 'Sensores e câmeras alimentam Argos automaticamente.' },
          ].map((x, i) => (
            <div key={i} style={{ display: 'flex', gap: 'clamp(8px,1.2vw,14px)', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 'clamp(16px,2vw,22px)', width: 32, textAlign: 'center', flexShrink: 0, marginTop: 2 }}>{x.ic}</div>
              <div>
                <div style={{ fontSize: 'clamp(13px,1.5vw,16px)', fontWeight: 700, color: I, marginBottom: 3 }}>{x.t}</div>
                <div style={{ fontSize: 'clamp(11px,1.3vw,14px)', color: I3, lineHeight: 1.5 }}>{x.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SL>
  );
}

/* ══ 6. IMPACTO ══ */
function Impact() {
  return (
    <SL c>
      <TAG color={GR}>Impacto</TAG>
      <H2 style={{ marginBottom: 'clamp(16px,3vw,32px)' }}>Números que <span style={{ color: G2 }}>transformam uma gestão</span></H2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(45%, 160px), 1fr))', gap: 'clamp(8px,1.2vw,14px)', width: '100%', maxWidth: 820, marginBottom: 'clamp(14px,2.5vw,28px)' }}>
        {[{ n: '-70%', l: 'Tempo de Resposta', d: 'GPS + alertas instantâneos', c: BL2 }, { n: '+300%', l: 'Volume de Registros', d: 'Mais acessível que ligações', c: GR }, { n: '100%', l: 'Rastreabilidade', d: 'Histórico completo auditável', c: G2 }, { n: '24/7', l: 'Disponibilidade', d: 'Canal sempre aberto', c: PU }].map((x, i) => (
          <BOX key={i} style={{ textAlign: 'center', borderTop: `2px solid ${x.c}18` }}>
            <div style={{ fontFamily: MO, fontSize: 'clamp(24px,3.5vw,36px)', fontWeight: 700, color: x.c, marginBottom: 6 }}>{x.n}</div>
            <div style={{ fontSize: 'clamp(11px,1.3vw,14px)', fontWeight: 700, color: I, marginBottom: 3 }}>{x.l}</div>
            <div style={{ fontSize: 'clamp(10px,1.1vw,12px)', color: I3 }}>{x.d}</div>
          </BOX>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(10px,1.5vw,18px)', width: '100%', maxWidth: 820 }}>
        <BOX style={{ textAlign: 'left', padding: 16 }}>
          <div style={{ fontSize: 'clamp(13px,1.4vw,15px)', fontWeight: 700, color: I, marginBottom: 8 }}>🏛️ Para a Gestão Pública</div>
          <div style={{ fontSize: 'clamp(12px,1.3vw,14px)', color: I2, lineHeight: 1.8 }}><span style={{ color: GR }}>✓</span> Dados geolocalizados para decisões estratégicas<br /><span style={{ color: GR }}>✓</span> Prestação de contas transparente e auditável<br /><span style={{ color: GR }}>✓</span> Coordenação multi-órgão sem precedentes<br /><span style={{ color: GR }}>✓</span> Redução de custos operacionais</div>
        </BOX>
        <BOX style={{ textAlign: 'left', padding: 16 }}>
          <div style={{ fontSize: 'clamp(13px,1.4vw,15px)', fontWeight: 700, color: I, marginBottom: 8 }}>👥 Para o Cidadão</div>
          <div style={{ fontSize: 'clamp(12px,1.3vw,14px)', color: I2, lineHeight: 1.8 }}><span style={{ color: GR }}>✓</span> Voz direta e imediata para reportar<br /><span style={{ color: GR }}>✓</span> Acompanhamento transparente das resoluções<br /><span style={{ color: GR }}>✓</span> Rede social que fortalece a comunidade<br /><span style={{ color: GR }}>✓</span> Denúncia anônima protege quem reporta</div>
        </BOX>
      </div>
    </SL>
  );
}

/* ══ 7. REVEAL ══ */
function Reveal() {
  return (
    <SL c>
      <div style={{ marginBottom: 20 }}><span style={{ fontFamily: SF, fontSize: 'clamp(40px,8vw,96px)', fontWeight: 400, letterSpacing: 3, color: I }}>A<span style={{ color: G2 }}>R</span>GOS</span></div>
      <div style={{ width: 48, height: 1, background: `${G2}25`, margin: '0 auto 18px' }} />
      <p style={{ fontFamily: SF, fontSize: 'clamp(16px,2.5vw,24px)', color: G, fontWeight: 400, fontStyle: 'italic', letterSpacing: .3, marginBottom: 24 }}>A inteligência de mil olhos protegendo o que é nosso.</p>
      <P mb={0} style={{ maxWidth: 520 }}>A primeira rede social da segurança pública do Brasil. Cada cidadão é um olho. Cada órgão, um braço. A inteligência artificial, o cérebro. Juntos, uma rede que nunca dorme.</P>
    </SL>
  );
}

/* ══ 8. FECHAMENTO ══ */
function Closing() {
  return (
    <SL c>
      <div style={{ fontSize: 'clamp(32px,6vw,60px)', marginBottom: 'clamp(12px,2vw,24px)', animation: 'br 4.5s ease infinite' }}>👁️</div>
      <p style={{ fontFamily: SF, fontSize: 'clamp(18px,3.8vw,42px)', fontWeight: 400, lineHeight: 1.45, fontStyle: 'italic', color: I3, maxWidth: 680, textAlign: 'center', marginBottom: 'clamp(8px,1.5vw,16px)' }}>
        "Argos tinha <em style={{ fontStyle: 'normal', color: G2, fontWeight: 600 }}>cem olhos</em>. A sua cidade tem <em style={{ fontStyle: 'normal', color: G2, fontWeight: 600 }}>milhares</em>."
      </p>
      <h2 style={{ fontFamily: SF, fontSize: 'clamp(20px,4vw,48px)', fontWeight: 400, lineHeight: 1.2, color: I, marginBottom: 'clamp(20px,3.5vw,40px)' }}>
        Argos nunca dorme.<br /><span style={{ color: G2 }}>Sua cidade também.</span>
      </h2>
      <div style={{ display: 'flex', gap: 'clamp(8px,1.2vw,14px)', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 'clamp(24px,4vw,44px)' }}>
        <a href="https://wa.me/5522999876929?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20demonstra%C3%A7%C3%A3o%20do%20Argos" target="_blank" rel="noopener noreferrer" style={{ padding: 'clamp(10px,1.5vw,16px) clamp(20px,3vw,40px)', background: 'linear-gradient(135deg,#25D366,#128C7E)', border: 'none', borderRadius: 10, color: '#FFFFFF', fontSize: 'clamp(13px,1.5vw,16px)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 24px rgba(37,211,102,.2)', letterSpacing: .3, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          Agendar Demonstração
        </a>
        <a href="mailto:contato@itcast.com.br?subject=Proposta%20Técnica%20-%20Argos" style={{ padding: 'clamp(10px,1.5vw,16px) clamp(20px,3vw,40px)', background: 'transparent', border: `1px solid ${BD2}`, borderRadius: 10, color: I2, fontSize: 'clamp(13px,1.5vw,16px)', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none' }}>Proposta Técnica</a>
      </div>
      <div style={{ display: 'flex', gap: 'clamp(14px,2.5vw,28px)', fontSize: 'clamp(12px,1.5vw,16px)', color: I3, flexWrap: 'wrap', justifyContent: 'center' }}>
        <span>📧 contato@itcast.com.br</span>
        <span>🌐 itcast.com.br</span>
      </div>
      <div style={{ position: 'absolute', bottom: 'clamp(12px,2vw,22px)', left: '50%', transform: 'translateX(-50%)', fontSize: 8, color: 'rgba(0,0,0,.06)', letterSpacing: 2, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>ITCAST</div>
    </SL>
  );
}
