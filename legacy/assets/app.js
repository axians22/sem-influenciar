/* Renderização do comparador. Todo texto vindo dos dados entra via textContent. */
'use strict';

const SV = ['--s1','--s2','--s3','--s4','--s5','--s6'];
const col = s => `var(${SV[(s-1) % SV.length]})`;
const NS = 'http://www.w3.org/2000/svg';
const el = (t, a) => { const n = document.createElementNS(NS, t);
  if (a) for (const k in a) n.setAttribute(k, a[k]); return n; };
const d2 = document.createElement.bind(document);
function txt(tag, cls, content){ const n = d2(tag); if (cls) n.className = cls;
  if (content != null) n.textContent = content; return n; }
const fmt = n => n == null ? '—' : String(n).replace('.', ',');
const brl = v => v == null ? 'não localizado'
  : v >= 1 ? 'R$ ' + v.toFixed(2).replace('.', ',').replace(/,00$/, '') + ' mi'
  : 'R$ ' + Math.round(v * 1000) + ' mil';

/* ---------- tooltip ---------- */
const tipEl = document.getElementById('tip');
function tipShow(ev, title, rows, note){
  tipEl.textContent = '';
  tipEl.appendChild(txt('div', 'tip-h', title));
  (rows || []).forEach(r => {
    const d = txt('div', 'tip-r');
    if (r.color){ const i = d2('i'); i.style.background = r.color; d.appendChild(i); }
    d.appendChild(txt('span', null, r.label));
    d.appendChild(txt('b', null, r.value));
    tipEl.appendChild(d);
  });
  if (note) tipEl.appendChild(txt('div', 'tip-n', note));
  tipEl.classList.add('on');
  tipMove(ev);
}
function tipMove(ev){
  const p = ev.touches ? ev.touches[0] : ev;
  const r = tipEl.getBoundingClientRect();
  let x = p.clientX + 14, y = p.clientY - 10;
  if (x + r.width > innerWidth - 8) x = p.clientX - r.width - 14;
  if (y + r.height > innerHeight - 8) y = innerHeight - r.height - 8;
  if (y < 8) y = 8;
  tipEl.style.left = x + 'px'; tipEl.style.top = y + 'px';
}
const tipHide = () => tipEl.classList.remove('on');
document.addEventListener('scroll', tipHide, { passive: true });

/* ---------- blocos ---------- */
function chartBox(parent, title, subtitle){
  const c = txt('div', 'chart');
  c.appendChild(txt('h3', 'chart-h', title));
  if (subtitle) c.appendChild(txt('div', 'chart-s', subtitle));
  parent.appendChild(c);
  return c;
}
function legend(box, items, rect){
  const l = txt('div', 'legend' );
  items.forEach(it => {
    const s = txt('span', 'lg' + (rect ? ' rect' : ''));
    const i = d2('i'); i.style.background = it.color; s.appendChild(i);
    s.appendChild(txt('span', null, it.label));
    l.appendChild(s);
  });
  box.appendChild(l);
}
function tableView(box, label, headers, rows){
  const d = txt('details', 'tbl');
  d.appendChild(txt('summary', null, label));
  const sc = txt('div', 'scroll'); const t = d2('table');
  const tr = d2('tr');
  headers.forEach(h => { const th = txt('th', h.n ? 'n' : null, h.t || h); tr.appendChild(th); });
  const th = d2('thead'); th.appendChild(tr); t.appendChild(th);
  const tb = d2('tbody');
  rows.forEach(r => { const x = d2('tr');
    r.forEach((c, i) => x.appendChild(txt('td', headers[i] && headers[i].n ? 'n' : null, c)));
    tb.appendChild(x); });
  t.appendChild(tb); sc.appendChild(t); d.appendChild(sc); box.appendChild(d);
}
function srcLinks(box, fontes){
  if (!fontes || !fontes.length) return;
  const w = txt('div', 'srcs');
  fontes.forEach(f => { const p = d2('div');
    p.appendChild(txt('span', null, 'Fonte: '));
    const a = d2('a'); a.href = f.u; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = f.t; p.appendChild(a); w.appendChild(p); });
  box.appendChild(w);
}

/* ---------- gráfico de linhas (série temporal) ---------- */
function lineChart(box, cfg){
  const { series, points, yMax, unidade } = cfg;
  const W = 760, H = 340, mL = 38, mR = 112, mT = 12, mB = 54;
  const pw = W - mL - mR, ph = H - mT - mB;
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img' });
  svg.appendChild(el('title', {})).textContent = cfg.alt || unidade;

  const X = i => mL + (points.length === 1 ? pw / 2 : (pw * i) / (points.length - 1));
  const Y = v => mT + ph - (v / yMax) * ph;

  for (let v = 0; v <= yMax; v += 10){
    svg.appendChild(el('line', { class: 'gl', x1: mL, x2: mL + pw, y1: Y(v), y2: Y(v) }));
    const t = el('text', { class: 'tk', x: mL - 7, y: Y(v) + 4, 'text-anchor': 'end' });
    t.textContent = v + '%'; svg.appendChild(t);
  }
  svg.appendChild(el('line', { class: 'ax', x1: mL, x2: mL + pw, y1: Y(0), y2: Y(0) }));

  points.forEach((p, i) => {
    const t = el('text', { class: 'tk', x: X(i), y: Y(0) + 17, 'text-anchor': 'middle' });
    t.textContent = p.curto; svg.appendChild(t);
    const t2 = el('text', { class: 'tk', x: X(i), y: Y(0) + 31, 'text-anchor': 'middle' });
    t2.setAttribute('fill', 'var(--ink-3)'); t2.textContent = p.inst; svg.appendChild(t2);
  });

  series.forEach(s => {
    const segs = []; let cur = [];
    points.forEach((p, i) => {
      const v = p[s.k];
      if (v == null){ if (cur.length) segs.push(cur); cur = []; }
      else cur.push([X(i), Y(v)]);
    });
    if (cur.length) segs.push(cur);
    segs.forEach(sg => {
      if (sg.length > 1){
        svg.appendChild(el('path', { d: 'M' + sg.map(p => p.join(',')).join('L'),
          fill: 'none', stroke: s.color, 'stroke-width': 2,
          'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
      }
      sg.forEach(p => {
        svg.appendChild(el('circle', { cx: p[0], cy: p[1], r: 5.5,
          fill: s.color, stroke: 'var(--surface-1)', 'stroke-width': 2 }));
      });
    });
  });

  /* Rótulos diretos: só onde não colidem.
     Quando as séries convergem, empilhar rótulos os desgruda das linhas e vira
     ruído — nesses casos a legenda e o tooltip carregam a identificação. */
  const fins = [];
  series.forEach(s => {
    let last = -1;
    points.forEach((p, i) => { if (p[s.k] != null) last = i; });
    if (last >= 0) fins.push({ s, i: last, v: points[last][s.k], y: Y(points[last][s.k]) });
  });
  const MIN = 13;
  // agrupa por coluna; dentro de cada coluna resolve a vizinhança vertical
  const porX = {};
  fins.forEach(f => { (porX[f.i] = porX[f.i] || []).push(f); });
  Object.keys(porX).forEach(xi => {
    const g = porX[xi].sort((a, b) => a.y - b.y);
    // valores empatados ou quase: mantém só o de maior valor (rótulo seria idêntico
    // e sobreposto); os demais ficam na legenda e no tooltip
    const vis = [];
    g.forEach(f => {
      const dup = vis.find(o => Math.abs(o.y - f.y) < 4);
      if (dup){ if (f.v > dup.v){ vis[vis.indexOf(dup)] = f; } return; }
      vis.push(f);
    });
    // afasta verticalmente o que ainda está perto, com deslocamento pequeno
    vis.sort((a, b) => a.y - b.y);
    const ys = vis.map(f => f.y);
    for (let k = 1; k < ys.length; k++){
      if (ys[k] - ys[k - 1] < MIN) ys[k] = ys[k - 1] + MIN;
    }
    // recentra o conjunto para não puxar tudo para baixo
    const desloc = (ys[ys.length - 1] - vis[vis.length - 1].y) / 2;
    vis.forEach((f, k) => {
      const yFinal = ys[k] - desloc;
      const desviou = Math.abs(yFinal - f.y) > 2.5;
      if (desviou){
        // conector fino ligando o rótulo deslocado à ponta da linha
        svg.appendChild(el('path', {
          d: `M${X(f.i) + 4},${f.y}L${X(f.i) + 9},${yFinal}`,
          stroke: f.s.color, 'stroke-width': 1, fill: 'none', opacity: 0.6 }));
      }
      const tx = el('text', { class: 'dl', x: X(f.i) + 11, y: yFinal + 4 });
      tx.setAttribute('fill', 'var(--ink-1)');
      tx.textContent = fmt(f.v) + '%';
      svg.appendChild(tx);
    });
  });

  // camada de hover por coluna
  points.forEach((p, i) => {
    const w = points.length > 1 ? pw / (points.length - 1) : pw;
    const r = el('rect', { x: X(i) - w / 2, y: mT, width: w, height: ph,
      fill: 'transparent', style: 'cursor:crosshair' });
    const line = el('line', { class: 'ax', x1: X(i), x2: X(i), y1: mT, y2: Y(0),
      opacity: 0, 'stroke-dasharray': 'none' });
    svg.appendChild(line);
    const rows = () => series.filter(s => p[s.k] != null)
      .sort((a, b) => p[b.k] - p[a.k])
      .map(s => ({ color: s.color, label: s.label, value: fmt(p[s.k]) + '%' }));
    const note = [p.inst + ' · campo ' + p.campo,
      p.n ? 'Amostra de ' + p.n.toLocaleString('pt-BR') : null,
      p.me ? 'Margem de ' + fmt(p.me) + ' pontos' : null,
      p.reg ? 'Registro ' + p.reg : null,
      p.notaLinha || null].filter(Boolean).join(' · ');
    const on = ev => { line.setAttribute('opacity', '1');
      tipShow(ev, p.label, rows(), note); };
    r.addEventListener('pointerenter', on);
    r.addEventListener('pointermove', tipMove);
    r.addEventListener('pointerleave', () => { line.setAttribute('opacity', '0'); tipHide(); });
    svg.appendChild(r);
  });

  box.appendChild(svg);
}


/* barra horizontal: canto reto na base, arredondado na ponta do dado.
   Usa path para evitar o artefato do rx em barras muito estreitas. */
function barPath(x, y, w, h, r){
  const rr = Math.max(0, Math.min(r, w, h / 2));
  if (rr <= 0.5) return `M${x},${y}h${w}v${h}h${-w}z`;
  return `M${x},${y}h${w - rr}a${rr},${rr} 0 0 1 ${rr},${rr}`
    + `v${h - 2 * rr}a${rr},${rr} 0 0 1 ${-rr},${rr}h${-(w - rr)}z`;
}

/* ---------- gráfico de barras horizontais ---------- */
function barChart(box, cfg){
  const rows = cfg.rows, n = rows.length;
  const labelW = cfg.labelW || 186, barH = Math.min(24, cfg.barH || 22), gap = 10;
  const W = 760, mR = cfg.valueW || 56, mT = 4, mB = 26;
  const ph = n * (barH + gap);
  const H = ph + mT + mB;
  const pw = W - labelW - mR;
  const max = cfg.max || Math.max(...rows.map(r => r.v)) * 1.02;
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img' });
  svg.appendChild(el('title', {})).textContent = cfg.alt || cfg.unidade || '';
  const X = v => labelW + (v / max) * pw;

  const ticks = cfg.ticks || 4;
  for (let i = 0; i <= ticks; i++){
    const v = (max / ticks) * i;
    svg.appendChild(el('line', { class: 'gl', x1: X(v), x2: X(v), y1: mT, y2: mT + ph }));
    const t = el('text', { class: 'tk', x: X(v), y: mT + ph + 16, 'text-anchor': 'middle' });
    t.textContent = cfg.tickFmt ? cfg.tickFmt(v) : Math.round(v);
    svg.appendChild(t);
  }
  svg.appendChild(el('line', { class: 'ax', x1: labelW, x2: labelW, y1: mT, y2: mT + ph }));

  rows.forEach((r, i) => {
    const y = mT + i * (barH + gap);
    const lab = el('text', { class: 'bl', x: labelW - 9, y: y + barH / 2 + 4, 'text-anchor': 'end' });
    lab.textContent = r.label; svg.appendChild(lab);
    const w = Math.max(X(r.v) - labelW, 1.5);
    svg.appendChild(el('path', { d: barPath(labelW, y, w, barH, 4),
      fill: r.color || col(1) }));
    const val = el('text', { class: 'dl', x: X(r.v) + 8, y: y + barH / 2 + 4 });
    val.textContent = cfg.valFmt ? cfg.valFmt(r.v) : fmt(r.v);
    svg.appendChild(val);
    const hit = el('rect', { x: labelW, y: y - gap / 2, width: pw, height: barH + gap,
      fill: 'transparent', style: 'cursor:default' });
    hit.addEventListener('pointerenter', ev => tipShow(ev, r.label,
      [{ color: r.color || col(1), label: cfg.unidade || 'Valor',
         value: cfg.valFmt ? cfg.valFmt(r.v) : fmt(r.v) }], r.note));
    hit.addEventListener('pointermove', tipMove);
    hit.addEventListener('pointerleave', tipHide);
    svg.appendChild(hit);
  });
  box.appendChild(svg);
}

/* ---------- gráfico de confronto (2 barras) ---------- */
function duelChart(box, cenarios){
  const wrap = txt('div');
  cenarios.forEach(c => {
    const card = txt('div');
    card.style.cssText = 'padding:13px 0;border-bottom:1px solid var(--grid)';
    const head = txt('div');
    head.style.cssText = 'display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:9px;font-size:.85rem';
    const who = txt('span'); who.style.color = 'var(--ink-2)';
    who.textContent = c.inst + ' · ' + c.campo + (c.reg ? ' · ' + c.reg : '') +
      (c.validos ? ' · votos válidos' : '');
    head.appendChild(who);
    if (c.empate){ const b = txt('span', 'badge b-neutral', 'Empate técnico'); head.appendChild(b); }
    card.appendChild(head);
    const bar = txt('div');
    bar.style.cssText = 'display:flex;height:26px;border-radius:5px;overflow:hidden;gap:2px;background:var(--surface-2)';
    [[c.a, c.av, col(1)], [c.b, c.bv, col(2)]].forEach(([nm, v, cc]) => {
      const seg = txt('div'); seg.style.cssText =
        `width:${v}%;background:${cc};display:grid;place-items:center;color:#fff;font-size:.78rem;font-weight:620`;
      if (v > 12) seg.textContent = fmt(v) + '%';
      seg.addEventListener('pointerenter', ev => tipShow(ev, nm,
        [{ color: cc, label: 'Intenção de voto', value: fmt(v) + '%' }],
        c.inst + ' · campo ' + c.campo));
      seg.addEventListener('pointermove', tipMove);
      seg.addEventListener('pointerleave', tipHide);
      bar.appendChild(seg);
    });
    const resto = 100 - c.av - c.bv - (c.brancoNulo || 0) - (c.indeciso || 0);
    if (c.brancoNulo){
      const seg = txt('div');
      seg.style.cssText = `width:${c.brancoNulo}%;background:var(--axis)`;
      seg.addEventListener('pointerenter', ev => tipShow(ev, 'Branco, nulo ou nenhum',
        [{ color: 'var(--axis)', label: 'Parcela', value: fmt(c.brancoNulo) + '%' }]));
      seg.addEventListener('pointermove', tipMove);
      seg.addEventListener('pointerleave', tipHide);
      bar.appendChild(seg);
    }
    if (resto > 0.5){
      const seg = txt('div');
      seg.style.cssText = `width:${resto}%;background:var(--surface-2)`;
      seg.setAttribute('title', 'Indecisos ou não informado');
      seg.addEventListener('pointerenter', ev => tipShow(ev,
        c.indeciso ? 'Indecisos' : 'Não informado',
        [{ color: 'var(--surface-2)', label: 'Parcela', value: fmt(+resto.toFixed(1)) + '%' }],
        c.indeciso ? null : 'O instituto não divulgou a distribuição restante.'));
      seg.addEventListener('pointermove', tipMove);
      seg.addEventListener('pointerleave', tipHide);
      bar.appendChild(seg);
    }
    card.appendChild(bar);
    const nm = txt('div');
    nm.style.cssText = 'display:flex;justify-content:space-between;margin-top:7px;font-size:.84rem;gap:12px';
    const l = txt('span'); l.textContent = c.a + ' · ' + fmt(c.av) + '%';
    const r = txt('span'); r.textContent = c.b + ' · ' + fmt(c.bv) + '%';
    nm.appendChild(l); nm.appendChild(r); card.appendChild(nm);
    wrap.appendChild(card);
  });
  box.appendChild(wrap);
}

/* ---------- badge de status processual ---------- */
const ICON = {
  ok: 'M20 6 9 17l-5-5',
  warn: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  info: 'M12 16v-4M12 8h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
  crit: 'M12 8v4M12 16h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z'
};
function statusBadge(status, label){
  const map = {
    anulado: ['b-ok', 'ok'], arquivado: ['b-ok', 'ok'], absolvido: ['b-ok', 'ok'],
    investigacao: ['b-neutral', 'info'], citado: ['b-neutral', 'info'],
    terceiro: ['b-neutral', 'info'], tramitacao: ['b-neutral', 'info'],
    denunciado: ['b-warn', 'warn'], reu: ['b-warn', 'warn'],
    condenado1: ['b-crit', 'crit'], condenado2: ['b-crit', 'crit'], transitado: ['b-crit', 'crit']
  };
  const [cls, ic] = map[status] || ['b-neutral', 'info'];
  const b = txt('span', 'badge ' + cls);
  const svg = el('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    'stroke-width': 2.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
    'aria-hidden': 'true' });
  svg.appendChild(el('path', { d: ICON[ic] }));
  b.appendChild(svg);
  b.appendChild(txt('span', null, label));
  return b;
}
function procBlock(p){
  const d = txt('div', 'proc');
  const h = txt('div', 'proc-h');
  h.appendChild(txt('span', 'proc-c', p.caso));
  h.appendChild(statusBadge(p.status, p.statusTexto));
  d.appendChild(h);
  d.appendChild(txt('div', 'proc-d', p.detalhe));
  if (p.fonte){
    const f = txt('div', 'proc-f');
    const a = d2('a'); a.href = p.fonte; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = 'Ver fonte';
    f.appendChild(a); d.appendChild(f);
  }
  return d;
}

/* ---------- ficha de candidato ---------- */
const TEMAS = { economia: 'Economia', seguranca: 'Segurança', saude: 'Saúde',
  educacao: 'Educação', ambiente: 'Meio ambiente', externa: 'Política externa',
  infraestrutura: 'Infraestrutura' };

function candCard(c, tipo){
  const card = txt('article', 'cand');
  const head = txt('div', 'cand-h');
  head.setAttribute('role', 'button');
  head.setAttribute('tabindex', '0');
  head.setAttribute('aria-expanded', 'false');

  const nb = txt('div', 'numbox', c.num != null ? String(c.num) : '—');
  head.appendChild(nb);
  const id = txt('div', 'cand-id');
  id.appendChild(txt('div', 'cand-n', c.nome || c.urna));
  const sub = [c.partido, c.vice ? 'Vice: ' + c.vice : null,
    c.suplentes ? 'Suplentes: ' + c.suplentes : null].filter(Boolean).join(' · ');
  id.appendChild(txt('div', 'cand-p', sub));
  head.appendChild(id);
  const chev = el('svg', { class: 'chev', viewBox: '0 0 24 24', width: 18, height: 18,
    fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'aria-hidden': 'true' });
  chev.appendChild(el('path', { d: 'm6 9 6 6 6-6' }));
  head.appendChild(chev);
  card.appendChild(head);

  const body = txt('div', 'cand-b');

  if (c.alerta){
    const n = txt('div', 'note crit');
    n.appendChild(txt('b', null, 'Atenção. '));
    n.appendChild(txt('span', null, c.alerta));
    if (c.alertaFonte){ n.appendChild(d2('br'));
      const a = d2('a'); a.href = c.alertaFonte; a.target = '_blank'; a.rel = 'noopener';
      a.textContent = 'Ver fonte'; n.appendChild(a); }
    body.appendChild(n);
  }

  const row = txt('div', 'row');
  const pills = [];
  if (c.situacao) pills.push(c.situacao);
  if (c.idade) pills.push(c.idade + ' anos');
  if (c.coligacao) pills.push(c.coligacao);
  if (c.destaque) pills.push(c.destaque);
  if (c.receita != null) pills.push('Receita: ' + brl(c.receita / 1e6));
  pills.forEach(p => row.appendChild(txt('span', 'pill', p)));
  body.appendChild(row);

  if (c.trajetoria){
    const g = txt('div', 'fieldg');
    g.appendChild(txt('h4', null, 'Trajetória'));
    g.appendChild(txt('p', null, c.trajetoria)).style.margin = '0';
    body.appendChild(g);
  }
  if (c.contexto){
    const n = txt('div', 'note'); n.textContent = c.contexto; body.appendChild(n);
  }
  if (c.receitaNota){
    const g = txt('div', 'fieldg');
    g.appendChild(txt('h4', null, 'Financiamento'));
    const p = txt('p', null,
      (c.receita != null ? brl(c.receita / 1e6) + '. ' : '') + c.receitaNota);
    p.style.margin = '0'; p.style.fontSize = '.9rem'; g.appendChild(p);
    body.appendChild(g);
  }

  if (c.propostas && typeof c.propostas === 'object'){
    const g = txt('div', 'fieldg');
    g.appendChild(txt('h4', null, 'Propostas' + (c.plano ? ' · ' + c.plano : '')));
    const dl = txt('dl', 'props');
    Object.keys(TEMAS).forEach(k => {
      if (!c.propostas[k]) return;
      const w = d2('div');
      w.appendChild(txt('dt', null, TEMAS[k]));
      w.appendChild(txt('dd', null, c.propostas[k]));
      dl.appendChild(w);
    });
    g.appendChild(dl); body.appendChild(g);
  } else if (typeof c.propostas === 'string'){
    const g = txt('div', 'fieldg');
    g.appendChild(txt('h4', null, 'Propostas'));
    const p = txt('p', null, c.propostas); p.style.cssText = 'margin:0;font-size:.9rem';
    g.appendChild(p); body.appendChild(g);
  }
  if (c.propostasNota){
    const p = txt('p', 'none', c.propostasNota);
    p.style.marginTop = '8px'; body.appendChild(p);
  }

  const g = txt('div', 'fieldg');
  g.appendChild(txt('h4', null, 'Histórico judicial e escândalos'));
  if (c.processos && c.processos.length) c.processos.forEach(p => g.appendChild(procBlock(p)));
  else g.appendChild(txt('p', 'none', 'Nenhum registro relevante encontrado nas fontes consultadas.'));
  if (c.processosNota) g.appendChild(txt('p', 'none', c.processosNota));
  body.appendChild(g);

  if (c.fontes && c.fontes.length){
    const f = txt('div', 'fieldg');
    f.appendChild(txt('h4', null, 'Fontes'));
    srcLinks(f, c.fontes); body.appendChild(f);
  }

  card.appendChild(body);
  const toggle = () => { const o = card.classList.toggle('open');
    head.setAttribute('aria-expanded', o ? 'true' : 'false'); };
  head.addEventListener('click', toggle);
  head.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(); } });
  return card;
}

/* =================== RENDER =================== */

/* contagem até o 1º turno */
(function(){
  const cd = document.getElementById('cd');
  const alvo = new Date('2026-10-04T08:00:00-03:00');
  function up(){
    const diff = alvo - new Date();
    cd.textContent = '';
    if (diff <= 0){
      cd.appendChild(txt('span', null, 'Votação do 1º turno em andamento ou encerrada · 2º turno em 25 de outubro'));
      return;
    }
    const h = Math.floor(diff / 3.6e6), m = Math.floor(diff / 6e4) % 60;
    cd.appendChild(txt('span', null, 'Primeiro turno em'));
    cd.appendChild(txt('b', null, h + 'h ' + String(m).padStart(2, '0') + 'min'));
    cd.appendChild(txt('span', null, '· domingo, 4 de outubro, 8h às 17h'));
  }
  up(); setInterval(up, 30000);
})();

/* KPIs */
(function(){
  const k = document.getElementById('kpis');
  const d = DATAFOLHA_FINAL;
  const data = [
    { k: 'Lula nos votos válidos', v: '45%', d: 'Datafolha, 1º de outubro' },
    { k: 'Flávio Bolsonaro nos válidos', v: '40%', d: 'Diferença de 5 pontos' },
    { k: 'Margem de erro', v: '± 2 pts', d: 'Amostra de 2.506 entrevistas' },
    { k: 'Eleitores decididos', v: d.decididos + '%', d: '19% ainda podem mudar o voto' }
  ];
  data.forEach(x => {
    const c = txt('div', 'kpi');
    c.appendChild(txt('div', 'k', x.k));
    c.appendChild(txt('div', 'v', x.v));
    c.appendChild(txt('div', 'd', x.d));
    k.appendChild(c);
  });
})();

/* pesquisas presidente — linha */
(function(){
  const P = PESQ_PRESIDENTE;
  const box = chartBox(document.getElementById('ch-pres'),
    'Presidente · 1º turno, votos totais',
    'Pesquisas divulgadas em setembro e outubro de 2026. Inclui brancos, nulos e indecisos.');
  const series = P.candidatos.map(c => ({ ...c, color: col(c.slot) }));
  legend(box, series);
  const points = P.pesquisas.map(p => ({ ...p,
    label: p.inst + ' · ' + p.campo,
    curto: p.campo.split('–').pop().replace('/set', '/9').replace('/out', '/10'),
    inst: p.inst.split('/')[0] }));
  lineChart(box, { series, points, yMax: 50, unidade: P.unidade,
    alt: 'Evolução da intenção de voto para presidente entre setembro e outubro de 2026.' });
  const n = txt('div', 'note'); n.textContent = P.nota; box.appendChild(n);
  tableView(box, 'Ver todos os números em tabela',
    [{ t: 'Instituto' }, { t: 'Campo' }, { t: 'Amostra', n: 1 }, { t: 'Margem', n: 1 },
     { t: 'Registro TSE' }, ...series.map(s => ({ t: s.label, n: 1 }))],
    P.pesquisas.map(p => [p.inst, p.campo, p.n ? p.n.toLocaleString('pt-BR') : '—',
      p.me ? '± ' + fmt(p.me) : '—', p.reg || '—',
      ...series.map(s => p[s.k] == null ? '—' : fmt(p[s.k]) + '%')]));
  srcLinks(box, P.fontes);
})();

/* Datafolha detalhado — barras */
(function(){
  const d = DATAFOLHA_FINAL;
  const box = chartBox(document.getElementById('ch-datafolha'),
    'A pesquisa mais recente, em detalhe',
    d.inst + ' divulgado em ' + d.divulgacao + '. Campo de ' + d.campo +
    ', ' + d.n.toLocaleString('pt-BR') + ' entrevistas em ' + d.municipios +
    ' municípios, margem de ± ' + d.me + ' pontos e ' + d.confianca +
    '% de confiança. Registro no TSE ' + d.reg + '. Contratada por ' + d.contratante + '.');
  const rows = d.totais.filter(r => r.tipo !== 'outro').map((r, i) => ({
    label: r.nome, v: r.v, color: i < 6 ? col(i + 1) : 'var(--axis)',
    note: r.ant != null ? 'Na pesquisa anterior: ' + fmt(r.ant) + '%' : null }));
  d.totais.filter(r => r.tipo === 'outro').forEach(r => rows.push({
    label: r.nome, v: r.v, color: 'var(--axis)' }));
  barChart(box, { rows, max: 50, unidade: 'Intenção de voto', labelW: 186,
    valFmt: v => fmt(v) + '%', tickFmt: v => Math.round(v) + '%',
    alt: 'Intenção de voto de cada candidato na pesquisa Datafolha de 1º de outubro.' });
  const n = txt('div', 'note'); n.textContent = d.notaDatas; box.appendChild(n);
  tableView(box, 'Ver votos totais e válidos em tabela',
    [{ t: 'Candidato' }, { t: 'Votos totais', n: 1 }, { t: 'Pesquisa anterior', n: 1 },
     { t: 'Votos válidos', n: 1 }],
    d.totais.map(r => { const vv = d.validos.find(x => x.nome === r.nome);
      return [r.nome, fmt(r.v) + '%', r.ant != null ? fmt(r.ant) + '%' : '—',
        vv ? fmt(vv.v) + '%' : '—']; }));
  srcLinks(box, [{ t: 'Relatório do Datafolha', u: d.fonte }]);
})();

/* 2º turno */
(function(){
  const box = chartBox(document.getElementById('ch-2turno'),
    'Simulações de 2º turno',
    'Cenários hipotéticos medidos pelos institutos. Não são previsões.');
  legend(box, [
    { color: col(1), label: 'Primeiro nome do confronto' },
    { color: col(2), label: 'Segundo nome' },
    { color: 'var(--axis)', label: 'Branco, nulo ou nenhum' }
  ], true);
  duelChart(box, SEGUNDO_TURNO.cenarios);
  const n = txt('div', 'note'); n.textContent = SEGUNDO_TURNO.nota; box.appendChild(n);
  tableView(box, 'Ver cenários em tabela',
    [{ t: 'Instituto' }, { t: 'Campo' }, { t: 'Cenário' }, { t: 'Resultado' }, { t: 'Registro TSE' }],
    SEGUNDO_TURNO.cenarios.map(c => [c.inst, c.campo, c.a + ' x ' + c.b,
      fmt(c.av) + '% a ' + fmt(c.bv) + '%' + (c.empate ? ' (empate técnico)' : ''),
      c.reg || '—']));
})();

/* rejeição */
(function(){
  const d = DATAFOLHA_FINAL;
  const box = chartBox(document.getElementById('ch-rejeicao'),
    'Rejeição',
    'Percentual que afirma não votar no candidato de jeito nenhum. Datafolha, 1º de outubro.');
  barChart(box, {
    rows: d.rejeicao.map(r => ({ label: r.nome, v: r.v, color: col(1) })),
    max: 50, unidade: 'Rejeição', labelW: 186, valFmt: v => fmt(v) + '%',
    tickFmt: v => Math.round(v) + '%',
    alt: 'Índice de rejeição de cada candidato à Presidência.' });
  tableView(box, 'Ver rejeição em tabela', [{ t: 'Candidato' }, { t: 'Rejeição', n: 1 }],
    d.rejeicao.map(r => [r.nome, fmt(r.v) + '%']));
})();

/* votos válidos — tabela separada */
(function(){
  const box = chartBox(document.getElementById('validos-tbl'),
    'Pesquisas em votos válidos',
    PESQ_VALIDOS.nota);
  tableView(box, 'Ver pesquisas em votos válidos',
    [{ t: 'Instituto' }, { t: 'Campo' }, { t: 'Amostra', n: 1 }, { t: 'Margem', n: 1 },
     { t: 'Registro TSE' }, { t: 'Lula', n: 1 }, { t: 'Flávio Bolsonaro', n: 1 }],
    PESQ_VALIDOS.linhas.map(l => [l.inst, l.campo, l.n.toLocaleString('pt-BR'),
      '± ' + fmt(l.me), l.reg || '—',
      l.lula == null ? '—' : fmt(l.lula) + '%', fmt(l.flavio) + '%']));
  const open = box.querySelector('details'); if (open) open.open = true;
})();

/* listas de candidatos */
(function(){
  const ordem = [13, 22, 70, 55, 14, 30, 80, 35, 27, 21, 16, 29, 28];
  const presOrd = [...PRESIDENTE].sort((a, b) => {
    const ia = ordem.indexOf(a.num), ib = ordem.indexOf(b.num);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });

  // números dos 5 mais bem colocados em cada cargo, segundo TOP_PESQUISAS
  function topNums(id){
    if (typeof TOP_PESQUISAS === 'undefined') return null;
    const c = TOP_PESQUISAS.cargos.find(x => x.id === id);
    return c ? { nums: c.lista.map(x => x.nr), inst: c.inst, me: c.me } : null;
  }

  function montaLista(mountId, filtroId, dados, tipo, cargoId, chaveNum){
    const alvo = document.getElementById(mountId);
    const fz = document.getElementById(filtroId);
    if (!alvo) return;
    const top = topNums(cargoId);
    let soTop = false;

    function pinta(){
      alvo.textContent = '';
      const vis = soTop && top
        ? dados.filter(c => top.nums.indexOf(String(c[chaveNum])) >= 0)
        : dados;
      vis.forEach(c => alvo.appendChild(candCard(c, tipo)));
      if (soTop && top){
        const n = txt('div', 'note');
        n.appendChild(txt('b', null, 'Filtro ativo. '));
        n.appendChild(txt('span', null,
          'Mostrando os ' + vis.length + ' mais bem colocados na pesquisa ' + top.inst +
          ', de ' + dados.length + ' candidaturas. A margem de erro é de ± ' +
          fmt(top.me) + ' pontos, então a ordem entre candidatos próximos não é ' +
          'significativa. Pesquisa não prevê resultado.'));
        alvo.appendChild(n);
      }
    }

    if (fz && top){
      const b1 = txt('button', 'fbtn on', 'Todos (' + dados.length + ')');
      b1.type = 'button';
      const b2 = txt('button', 'fbtn', 'Mais bem colocados (' + top.nums.length + ')');
      b2.type = 'button';
      b1.addEventListener('click', () => {
        soTop = false; b1.className = 'fbtn on'; b2.className = 'fbtn'; pinta();
      });
      b2.addEventListener('click', () => {
        soTop = true; b2.className = 'fbtn on'; b1.className = 'fbtn'; pinta();
      });
      fz.appendChild(b1); fz.appendChild(b2);
      fz.appendChild(txt('span', 'fnota', 'segundo a pesquisa ' + top.inst));
    }
    pinta();
  }

  montaLista('list-pres', 'filtro-pres', presOrd, 'presidente', 'presidente', 'num');
  montaLista('list-gov', 'filtro-gov', GOV_GOIAS, 'governador', 'governador', 'num');
  montaLista('list-sen', 'filtro-sen', SENADO_GOIAS, 'senador', 'senador', 'num');
})();

/* Goiás — gráficos */
function goiasChart(mount, P, titulo, yMax){
  const box = chartBox(document.getElementById(mount), titulo, P.unidade +
    (P.nota ? ' ' + P.nota : ''));
  const series = P.candidatos.map(c => ({ ...c, color: col(c.slot) }));
  legend(box, series);
  const points = P.pesquisas.map(p => ({ ...p,
    label: p.inst + ' · ' + p.campo,
    curto: p.campo.split('–').pop().replace('/set', '/9').replace('/out', '/10'),
    inst: p.inst.split('/')[0],
    notaLinha: p.discrepante ? 'Pesquisa discrepante das demais.' : null }));
  lineChart(box, { series, points, yMax, unidade: P.unidade, alt: titulo });
  if (P.alerta){ const n = txt('div', 'note'); n.appendChild(txt('b', null, 'Divergência. '));
    n.appendChild(txt('span', null, P.alerta)); box.appendChild(n); }
  tableView(box, 'Ver todos os números em tabela',
    [{ t: 'Instituto' }, { t: 'Campo' }, { t: 'Amostra', n: 1 }, { t: 'Margem', n: 1 },
     { t: 'Registro TSE' }, ...series.map(s => ({ t: s.label, n: 1 }))],
    P.pesquisas.map(p => [p.inst, p.campo, p.n.toLocaleString('pt-BR'), '± ' + fmt(p.me),
      p.reg || '—', ...series.map(s => p[s.k] == null ? '—' : fmt(p[s.k]) + '%')]));
  srcLinks(box, [{ t: 'Compilado de pesquisas de Goiás', u: P.fonte }]);
}
goiasChart('ch-gov-go', PESQ_GOV_GOIAS, 'Governo de Goiás · intenção de voto', 50);
goiasChart('ch-sen-go', PESQ_SEN_GOIAS, 'Senado por Goiás · intenção de voto', 50);

/* partidos */
(function(){
  const P = PARTIDOS_CAMARA;
  const box = chartBox(document.getElementById('ch-camara'), P.titulo,
    P.subtitulo + '. Total de ' + P.total + ' deputados.');
  barChart(box, {
    rows: P.linhas.map(r => ({ label: r.sigla, v: r.v, color: col(1),
      note: r.nome + (r.federacao ? ' · federação' : '') })),
    unidade: 'Deputados', labelW: 128, ticks: 5,
    alt: 'Número de deputados federais por partido e federação.' });
  const n = txt('div', 'note'); n.textContent = P.notaEspectro;
  box.appendChild(n);
  tableView(box, 'Ver bancada com nome e espectro',
    [{ t: 'Sigla' }, { t: 'Nome' }, { t: 'Deputados', n: 1 }, { t: 'Espectro' }],
    P.linhas.map(r => [r.sigla, r.nome, r.v, r.espectro]));
  srcLinks(box, [{ t: 'Câmara dos Deputados', u: P.fonte },
    { t: 'Classificação ideológica (UBS Brasil)', u: P.fonteEspectro }]);
})();

[['ch-senado', PARTIDOS_SENADO, 'Senadores'], ['ch-govs', PARTIDOS_GOVERNADORES, 'Governadores']]
.forEach(([mount, P, un]) => {
  const box = chartBox(document.getElementById(mount), P.titulo, P.subtitulo);
  barChart(box, {
    rows: P.linhas.map(r => ({ label: r.sigla, v: r.v, color: col(1), note: r.nota })),
    unidade: un, labelW: 118, ticks: 4, valueW: 44,
    alt: P.titulo });
  if (P.nota){ const n = txt('div', 'note'); n.textContent = P.nota; box.appendChild(n); }
  tableView(box, 'Ver em tabela', [{ t: 'Partido' }, { t: un, n: 1 }],
    P.linhas.map(r => [r.sigla + (r.nota ? ' (' + r.nota + ')' : ''), r.v]));
  srcLinks(box, [{ t: 'Fonte', u: P.fonte }]);
});

/* federações */
(function(){
  const F = FEDERACOES;
  const box = txt('div', 'card');
  box.appendChild(txt('h3', null, F.titulo));
  const p = txt('p', null, F.nota);
  p.style.cssText = 'color:var(--ink-2);font-size:.9rem;margin:8px 0 0';
  box.appendChild(p);
  const sc = txt('div', 'scroll'); const t = d2('table');
  const tr = d2('tr');
  ['Federação', 'Partidos', 'Deferimento'].forEach(h => tr.appendChild(txt('th', null, h)));
  const th = d2('thead'); th.appendChild(tr); t.appendChild(th);
  const tb = d2('tbody');
  F.linhas.forEach(r => { const x = d2('tr');
    [r.nome, r.partidos, r.deferimento].forEach(c => x.appendChild(txt('td', null, c)));
    tb.appendChild(x); });
  t.appendChild(tb); sc.appendChild(t); box.appendChild(sc);
  srcLinks(box, [{ t: 'TSE · federações registradas', u: F.fonte }]);
  document.getElementById('federacoes').appendChild(box);
})();

/* financiamento */
(function(){
  const F = FINANCIAMENTO;
  const box = chartBox(document.getElementById('ch-fin'), F.titulo,
    'Em milhões de reais. Escala logarítmica, porque os valores vão de R$ 6 mil a R$ 77 milhões.');
  const rows = F.linhas.map(r => ({ label: r.nome, v: r.v, color: col(1) }));
  // escala log para acomodar 4 ordens de magnitude
  const lg = v => Math.log10(v * 1000 + 1);
  const maxL = lg(100);
  const box2 = box;
  const W = 760, labelW = 196, mR = 72, barH = 20, gap = 10, mT = 4, mB = 26;
  const ph = rows.length * (barH + gap), H = ph + mT + mB, pw = W - labelW - mR;
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img' });
  svg.appendChild(el('title', {})).textContent = 'Receita de campanha declarada por candidato.';
  const X = v => labelW + (lg(v) / maxL) * pw;
  [0.001, 0.01, 0.1, 1, 10, 100].forEach(v => {
    svg.appendChild(el('line', { class: 'gl', x1: X(v), x2: X(v), y1: mT, y2: mT + ph }));
    const t = el('text', { class: 'tk', x: X(v), y: mT + ph + 16, 'text-anchor': 'middle' });
    t.textContent = v >= 1 ? v + ' mi' : (v * 1000) + ' mil';
    svg.appendChild(t);
  });
  svg.appendChild(el('line', { class: 'ax', x1: labelW, x2: labelW, y1: mT, y2: mT + ph }));
  rows.forEach((r, i) => {
    const y = mT + i * (barH + gap);
    const lab = el('text', { class: 'bl', x: labelW - 9, y: y + barH / 2 + 4, 'text-anchor': 'end' });
    lab.textContent = r.label; svg.appendChild(lab);
    const w = Math.max(X(r.v) - labelW, 1.5);
    svg.appendChild(el('path', { d: barPath(labelW, y, w, barH, 4), fill: col(1) }));
    const val = el('text', { class: 'dl', x: X(r.v) + 8, y: y + barH / 2 + 4 });
    val.textContent = brl(r.v); svg.appendChild(val);
    const hit = el('rect', { x: labelW, y: y - gap / 2, width: pw, height: barH + gap, fill: 'transparent' });
    hit.addEventListener('pointerenter', ev => tipShow(ev, r.label,
      [{ color: col(1), label: 'Receita declarada', value: brl(r.v) }]));
    hit.addEventListener('pointermove', tipMove);
    hit.addEventListener('pointerleave', tipHide);
    svg.appendChild(hit);
  });
  box2.appendChild(svg);
  const n = txt('div', 'note'); n.textContent = F.nota; box2.appendChild(n);
  tableView(box2, 'Ver valores em tabela',
    [{ t: 'Candidato' }, { t: 'Receita declarada', n: 1 }],
    F.linhas.map(r => [r.nome, brl(r.v)]));
})();

/* legenda de status */
(function(){
  const box = document.getElementById('legenda');
  const grid = txt('div'); grid.style.cssText = 'display:grid;gap:8px';
  const vistos = new Set();
  Object.keys(STATUS_LEGENDA).forEach(k => {
    const s = STATUS_LEGENDA[k];
    if (vistos.has(s.rotulo)) return; vistos.add(s.rotulo);
    const r = txt('div'); r.style.cssText = 'display:flex;gap:10px;align-items:baseline;flex-wrap:wrap';
    r.appendChild(statusBadge(k, s.rotulo));
    const d = txt('span', null, s.desc);
    d.style.cssText = 'color:var(--ink-2);font-size:.86rem'; r.appendChild(d);
    grid.appendChild(r);
  });
  box.appendChild(grid);
})();

/* limitações + fontes gerais */
(function(){
  const box = document.getElementById('limites');
  const itens = [
    'O portal DivulgaCandContas do TSE bloqueia acesso automatizado, então os valores de financiamento vêm de veículos que citam o TSE. Têm corte entre 24 de setembro e 1º de outubro e não são finais.',
    'A receita de Marconi Perillo foi omitida: a única fonte disponível traz despesas maiores que a receita, inconsistência provável de transcrição.',
    'Vários candidatos de menor expressão não tiveram propostas detalhadas localizadas. Onde isso ocorre, o site diz "não localizado" em vez de deixar o campo vazio.',
    'Para Oséias Varão e Ernesto Roller a busca por processos não foi aprofundada, portanto a ausência de registros é menos conclusiva que nos demais.',
    'A classificação ideológica dos partidos é interpretativa, não um dado oficial. A fonte acadêmica mais rigorosa disponível publica a tabela completa apenas como imagem, então usamos a classificação do UBS Brasil.',
    'As pesquisas de Goiás, com exceção de Quaest e Real Time Big Data, não tiveram número de registro no TSE localizado.'
  ];
  box.appendChild(txt('b', null, 'O que este site não conseguiu verificar'));
  const ul = d2('ul'); ul.style.cssText = 'margin:8px 0 0;padding-left:20px';
  itens.forEach(i => { const li = d2('li'); li.textContent = i;
    li.style.marginBottom = '6px'; ul.appendChild(li); });
  box.appendChild(ul);

  srcLinks(document.getElementById('fontes-geral'), [
    { t: 'TSE · dados abertos de candidaturas 2026', u: 'https://dadosabertos.tse.jus.br/dataset/candidatos-2026' },
    { t: 'TSE · calendário eleitoral', u: META.fonteCalendario },
    { t: 'TSE · federações partidárias', u: 'https://www.tse.jus.br/partidos/federacoes-registradas-no-tse' },
    { t: 'Câmara dos Deputados · bancadas', u: 'https://www.camara.leg.br/Internet/Deputado/bancada.asp' },
    { t: 'Datafolha', u: 'https://datafolha.folha.uol.com.br/' },
    { t: 'TSE · prestação de contas eleitorais 2026', u: 'https://dadosabertos.tse.jus.br/dataset/prestacao-de-contas-eleitorais-2026' },
    { t: 'Agência Brasil · eleições 2026', u: 'https://agenciabrasil.ebc.com.br/politica' }
  ]);
})();

/* ---------- quem financiou (dados oficiais do TSE) ---------- */
(function(){
  if (typeof DOAD === 'undefined') return;
  const money = v => 'R$ ' + v.toLocaleString('pt-BR',
    { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const curto = v => v >= 1e6 ? 'R$ ' + (v / 1e6).toFixed(2).replace('.', ',') + ' mi'
    : v >= 1e3 ? 'R$ ' + (v / 1e3).toFixed(0).replace('.', ',') + ' mil'
    : 'R$ ' + v.toFixed(2).replace('.', ',');
  const TIPO = {
    partido: { rot: 'partido', slot: 1 }, pf: { rot: 'pessoa física', slot: 2 },
    pj: { rot: 'empresa', slot: 3 }, coletivo: { rot: 'financiamento coletivo', slot: 4 },
    proprio: { rot: 'recursos próprios', slot: 5 }, outro: { rot: 'outros', slot: 6 }
  };
  const titulo = c => (c.cand || '').split(' ').map(w =>
    w.length > 2 ? w.charAt(0) + w.slice(1).toLowerCase() : w.toLowerCase()).join(' ');

  function fichaCand(c){
    const card = txt('div', 'don');
    const h = txt('div', 'don-h');
    const nm = titulo(c) + ' (' + c.partido + ')' + (c.nr ? ' · ' + c.nr : '');
    h.appendChild(txt('h3', null, nm));
    const t = txt('span', 'don-tot');
    t.textContent = curto(c.tot) + ' de ' + c.ndoad +
      (c.ndoad === 1 ? ' doador' : ' doadores');
    h.appendChild(t);
    card.appendChild(h);

    // composição por origem do dinheiro
    if (c.tot > 0 && c.origens && Object.keys(c.origens).length){
      const comp = txt('div');
      comp.style.cssText = 'display:flex;height:8px;border-radius:4px;overflow:hidden;gap:2px;margin:10px 0 7px';
      const leg = txt('div', 'legend');
      leg.style.marginBottom = '2px';
      Object.keys(c.origens).forEach(k => {
        const v = c.origens[k], pct = (v / c.tot) * 100;
        if (pct < 0.05) return;
        const info = TIPO[k] || TIPO.outro;
        const seg = txt('div');
        seg.style.cssText = `width:${pct}%;background:${col(info.slot)}`;
        seg.addEventListener('pointerenter', ev => tipShow(ev, info.rot,
          [{ color: col(info.slot), label: 'Valor', value: money(v) },
           { label: 'Do total', value: pct.toFixed(1).replace('.', ',') + '%' }]));
        seg.addEventListener('pointermove', tipMove);
        seg.addEventListener('pointerleave', tipHide);
        comp.appendChild(seg);
        const lg = txt('span', 'lg');
        const i = d2('i'); i.style.background = col(info.slot); lg.appendChild(i);
        lg.appendChild(txt('span', null, info.rot + ' ' + pct.toFixed(0) + '%'));
        leg.appendChild(lg);
      });
      card.appendChild(comp);
      card.appendChild(leg);
    }

    if (!(c.tot > 0)){
      const z = txt('div', 'none');
      z.style.marginTop = '10px';
      z.textContent = 'Nenhuma receita declarada ao TSE até a geração do arquivo.';
      card.appendChild(z);
      return card;
    }

    // maiores doadores
    const lista = txt('div', 'don-col');
    lista.style.marginTop = '12px';
    lista.appendChild(txt('h4', null, 'Maiores doadores'));
    const maior = Math.max(...c.doadores.map(x => x.v), 1);
    c.doadores.forEach(x => {
      const info = TIPO[x.tipo] || TIPO.outro;
      const r = txt('div', 'don-row');
      const r1 = txt('div', 'don-r1');
      const n = txt('span', 'don-nm', x.nome);
      n.appendChild(txt('span', 'tag', info.rot));
      r1.appendChild(n);
      r1.appendChild(txt('span', 'don-v', curto(x.v)));
      r.appendChild(r1);
      const sub = [x.doc, x.cnae].filter(Boolean).join(' · ');
      r.appendChild(txt('div', 'don-doc', sub));
      const b = txt('div', 'don-bar');
      const i = d2('i');
      i.style.cssText = `width:${Math.max((x.v / maior) * 100, 0.8)}%;background:${col(info.slot)}`;
      b.appendChild(i);
      r.appendChild(b);
      r.addEventListener('pointerenter', ev => tipShow(ev, x.nome,
        [{ color: col(info.slot), label: info.rot, value: money(x.v) },
         { label: 'Do total declarado', value: (c.tot > 0 ? ((x.v / c.tot) * 100).toFixed(2).replace('.', ',') : '0') + '%' }],
        sub));
      r.addEventListener('pointermove', tipMove);
      r.addEventListener('pointerleave', tipHide);
      lista.appendChild(r);
    });
    card.appendChild(lista);
    if (c.ndoad > c.doadores.length){
      const n = txt('div', 'don-doc');
      n.style.marginTop = '8px';
      n.textContent = 'Mostrando os ' + c.doadores.length + ' maiores de ' + c.ndoad +
        ' doadores declarados.';
      card.appendChild(n);
    }
    tableView(card, 'Ver doadores em tabela',
      [{ t: 'Doador' }, { t: 'Documento' }, { t: 'Tipo' }, { t: 'Valor', n: 1 }],
      c.doadores.map(x => [x.nome, x.doc, (TIPO[x.tipo] || TIPO.outro).rot, money(x.v)]));
    return card;
  }

  /* doadores que financiam mais de uma campanha */
  const cz = document.getElementById('doad-cruzados');
  if (cz && DOAD.cruzados && DOAD.cruzados.length){
    const h = txt('h3', null, 'Doadores presentes em mais de uma campanha');
    h.style.cssText = 'font-size:1.05rem;margin:0 0 4px';
    cz.appendChild(h);
    const sub = txt('p', null,
      'Quem colocou dinheiro em candidaturas diferentes, às vezes de partidos adversários. ' +
      'Apenas doações somando R$ 200 mil ou mais.');
    sub.style.cssText = 'color:var(--ink-2);font-size:.88rem;margin:0 0 14px';
    cz.appendChild(sub);
    DOAD.cruzados.forEach(c => {
      const d = txt('div', 'cruz');
      const n = txt('div', 'cruz-n', c.nome);
      n.appendChild(txt('span', 'tag', (TIPO[c.tipo] || TIPO.outro).rot));
      d.appendChild(n);
      d.appendChild(txt('div', 'don-doc', c.doc + ' · total ' + curto(c.tot)));
      const l = txt('div', 'cruz-l');
      c.para.forEach(p => {
        const i = txt('span', 'cruz-i');
        i.appendChild(txt('span', null, p.cand + ' (' + p.partido + ', ' + p.cargo + ') · '));
        i.appendChild(txt('b', null, curto(p.v)));
        l.appendChild(i);
      });
      d.appendChild(l);
      cz.appendChild(d);
    });
  }

  /* listas por cargo */
  const alvo = document.getElementById('doad-lista');
  if (!alvo) return;
  const grupos = [
    ['Presidência da República', DOAD.presidente],
    ['Governo de Goiás', DOAD.goias && DOAD.goias['Governador']],
    ['Senado por Goiás', DOAD.goias && DOAD.goias['Senador']],
    ['Deputado federal por Goiás · 15 maiores arrecadações',
      DOAD.goias && DOAD.goias['Deputado Federal']]
  ];
  grupos.forEach(([nome, lista]) => {
    if (!lista || !lista.length) return;
    const h = txt('h3', null, nome);
    h.style.cssText = 'font-size:1.05rem;margin:30px 0 12px';
    alvo.appendChild(h);
    lista.forEach(c => alvo.appendChild(fichaCand(c)));
  });

  const n = txt('div', 'note');
  n.appendChild(txt('b', null, 'Fonte. '));
  n.appendChild(txt('span', null,
    DOAD.fonte + '. Arquivo gerado pelo TSE em ' + DOAD.geradoEm +
    ' e processado sem intermediários. ' + DOAD.nota +
    ' CPF aparece parcialmente mascarado; CNPJ é informação pública e aparece completo.'));
  alvo.appendChild(n);
  srcLinks(alvo, [{ t: 'TSE · prestação de contas eleitorais 2026', u: DOAD.fonteUrl }]);
})();

/* ---------- mais bem colocados nas pesquisas ---------- */
(function(){
  if (typeof TOP_PESQUISAS === 'undefined') return;
  const alvo = document.getElementById('top-lista');
  if (!alvo) return;
  const VAGAS = { presidente: null, governador: null, senador: 2, depfed: 17, depest: 41 };

  TOP_PESQUISAS.cargos.forEach(c => {
    const card = txt('div', 'top-c');
    const h = txt('div', 'top-h');
    h.appendChild(txt('h3', null, c.rotulo));
    const m = txt('span', 'top-meta');
    m.textContent = [c.inst, c.campo,
      c.n ? c.n.toLocaleString('pt-BR') + ' entrevistas' : null,
      c.me ? 'margem de ± ' + fmt(c.me) + ' pontos' : null,
      c.reg ? 'registro ' + c.reg : null].filter(Boolean).join(' · ');
    h.appendChild(m);
    card.appendChild(h);
    const b = txt('div', 'top-meta');
    b.style.marginBottom = '14px';
    b.textContent = 'Percentuais em ' + c.base + '.' +
      (c.espontanea ? ' Pesquisa espontânea: o entrevistado cita de memória, sem lista de nomes.' : '');
    card.appendChild(b);

    const maior = Math.max(...c.lista.map(x => x.v), 1);
    c.lista.forEach((x, i) => {
      const r = txt('div', 'top-row');
      r.appendChild(txt('span', 'top-pos', String(i + 1)));
      const nm = txt('div', 'top-nm');
      const n1 = txt('div', 'n1', x.nome);
      // empate técnico com o anterior: diferença menor que a soma das margens
      const ant = c.lista[i - 1];
      if (ant && Math.abs(ant.v - x.v) <= c.me * 2){
        const e = txt('span', 'emp', 'empate técnico');
        e.setAttribute('title', 'A diferença com ' + ant.nome +
          ' é menor que a margem de erro: os números não permitem dizer quem está à frente.');
        n1.appendChild(e);
      }
      nm.appendChild(n1);
      nm.appendChild(txt('div', 'n2', x.partido + (x.nr && x.nr !== '—' ? ' · número ' + x.nr : '')));
      r.appendChild(nm);
      const bar = txt('div', 'top-bar');
      const fill = d2('i');
      fill.style.cssText = `width:${(x.v / maior) * 100}%;background:${col(i + 1)}`;
      bar.appendChild(fill);
      r.appendChild(bar);
      r.appendChild(txt('span', 'top-v', fmt(x.v) + '%'));
      r.addEventListener('pointerenter', ev => tipShow(ev, x.nome,
        [{ color: col(i + 1), label: 'Intenção de voto', value: fmt(x.v) + '%' },
         { label: 'Margem de erro', value: '± ' + fmt(c.me) + ' pontos' }],
        c.inst + ' · ' + c.campo));
      r.addEventListener('pointermove', tipMove);
      r.addEventListener('pointerleave', tipHide);
      card.appendChild(r);
    });

    const vagas = VAGAS[c.id];
    if (vagas){
      const v = txt('div', 'top-vagas');
      v.textContent = vagas === 2
        ? 'Goiás elege 2 senadores. Os três primeiros estão em empate técnico entre si, então os números não dizem quais dois se elegem.'
        : 'Goiás elege ' + vagas + ' deputados ' + (c.id === 'depest' ? 'estaduais' : 'federais') +
          '. No voto proporcional, quem se elege depende também do total de votos do partido ou federação, que só se conhece na apuração.';
      card.appendChild(v);
    }
    if (c.nota){
      const n = txt('div', 'top-vagas');
      n.textContent = c.nota;
      card.appendChild(n);
    }
    if (c.limitacao){
      const n = txt('div', 'note crit');
      n.appendChild(txt('b', null, 'Limitação importante. '));
      n.appendChild(txt('span', null, c.limitacao));
      card.appendChild(n);
    }
    srcLinks(card, [{ t: 'Fonte da pesquisa', u: c.fonte }]);
    alvo.appendChild(card);
  });

  const av = txt('div', 'note');
  av.appendChild(txt('b', null, 'Como ler. '));
  av.appendChild(txt('span', null, TOP_PESQUISAS.aviso));
  alvo.appendChild(av);
})();

/* ---------- colinha de voto ---------- */
(function(){
  if (typeof URNA === 'undefined' || typeof ORDEM_URNA === 'undefined') return;
  const form = document.getElementById('colinha-form');
  const saida = document.getElementById('colinha-saida');
  if (!form || !saida) return;

  const CHAVE = 'colinha2026';
  let esc = {};
  try { esc = JSON.parse(localStorage.getItem(CHAVE) || '{}') || {}; } catch (e) { esc = {}; }
  const salva = () => { try { localStorage.setItem(CHAVE, JSON.stringify(esc)); } catch (e) {} };

  const listaDe = id =>
      id === 'presidente' ? URNA.presidente
    : id === 'governador' ? URNA.governador
    : (id === 'senador1' || id === 'senador2') ? URNA.senador
    : id === 'depfed' ? URNA.depfederal
    : id === 'depest' ? (typeof DEPEST_GO !== 'undefined' ? DEPEST_GO.lista : [])
    : [];
  const acha = (id, nr) => listaDe(id).find(c => c.nr === nr) || null;
  // alguns números de deputado federal constam para dois candidatos do mesmo
  // partido no arquivo do TSE, provável substituição de candidatura. Nesses casos
  // o site avisa em vez de escolher por conta própria.
  const todosCom = (id, nr) => listaDe(id).filter(c => c.nr === nr);

  /* campo de busca, para cargos com muitos candidatos */
  function campoBusca(cargo){
    const linha = txt('div', 'col-livre');
    const inp = d2('input');
    inp.type = 'text';
    inp.placeholder = 'nome ou número';
    inp.style.width = '260px';
    inp.setAttribute('list', 'dl-' + cargo.id);
    inp.setAttribute('aria-label', 'Buscar candidato a ' + cargo.rotulo);
    const dl = d2('datalist');
    dl.id = 'dl-' + cargo.id;
    listaDe(cargo.id).forEach(c => {
      const o = d2('option');
      o.value = c.nr + ' · ' + c.urna + ' (' + c.partido + ')';
      dl.appendChild(o);
    });
    const fb = txt('span', 'col-dig');
    const atual = esc[cargo.id] ? acha(cargo.id, esc[cargo.id]) : null;
    if (atual){
      inp.value = atual.nr + ' · ' + atual.urna + ' (' + atual.partido + ')';
      fb.textContent = '✓ ' + atual.urna + ' · ' + atual.partido;
    }
    const sinc = () => {
      const m = (inp.value.match(/\d+/) || [])[0] || '';
      const todos = m ? todosCom(cargo.id, m) : [];
      const c = acha(cargo.id, m);
      if (todos.length > 1){
        esc[cargo.id] = m;
        fb.textContent = '⚠ o número ' + m + ' consta para ' + todos.length +
          ' candidatos: ' + todos.map(x => x.urna).join(' e ') +
          '. Confira na urna.';
        fb.style.color = 'var(--crit)';
      } else if (c){
        esc[cargo.id] = c.nr;
        fb.textContent = '✓ ' + c.urna + ' · ' + c.partido;
        fb.style.color = '';
      } else if (inp.value.trim() === ''){
        delete esc[cargo.id];
        fb.textContent = '';
        fb.style.color = '';
      } else {
        delete esc[cargo.id];
        fb.textContent = 'não encontrado no registro do TSE';
        fb.style.color = '';
      }
      salva(); desenhaCola();
    };
    inp.addEventListener('input', sinc);
    inp.addEventListener('change', sinc);
    linha.appendChild(inp); linha.appendChild(dl); linha.appendChild(fb);
    return linha;
  }

  /* campo numérico puro, para cargo sem lista no site */
  function campoNumero(cargo){
    const linha = txt('div', 'col-livre');
    const inp = d2('input');
    inp.type = 'text';
    inp.inputMode = 'numeric';
    inp.maxLength = cargo.digitos;
    inp.placeholder = '0'.repeat(cargo.digitos);
    inp.setAttribute('aria-label', 'Número para ' + cargo.rotulo);
    inp.value = esc[cargo.id] || '';
    inp.addEventListener('input', () => {
      inp.value = inp.value.replace(/\D/g, '').slice(0, cargo.digitos);
      if (inp.value) esc[cargo.id] = inp.value; else delete esc[cargo.id];
      salva(); desenhaCola();
    });
    linha.appendChild(inp);
    return linha;
  }

  /* botões de seleção, para listas curtas */
  function opcoes(cargo){
    const opts = txt('div', 'col-opts');
    listaDe(cargo.id).forEach(c => {
      const lab = d2('label');
      lab.className = 'col-opt' + (esc[cargo.id] === c.nr ? ' sel' : '');
      const rb = d2('input');
      rb.type = 'radio';
      rb.name = 'col-' + cargo.id;
      rb.value = c.nr;
      rb.checked = esc[cargo.id] === c.nr;
      rb.addEventListener('change', () => {
        esc[cargo.id] = c.nr;
        // as duas vagas de senador precisam ser candidatos diferentes
        if (cargo.id === 'senador1' && esc.senador2 === c.nr) delete esc.senador2;
        if (cargo.id === 'senador2' && esc.senador1 === c.nr) delete esc.senador1;
        salva(); monta();
      });
      lab.appendChild(rb);
      lab.appendChild(txt('b', null, c.nr));
      lab.appendChild(txt('span', null, c.urna + ' · ' + c.partido));
      if (c.alerta){
        const t = txt('span', 'tag', 'atenção');
        t.setAttribute('title', c.alerta);
        lab.appendChild(t);
      }
      opts.appendChild(lab);
    });
    return opts;
  }

  function monta(){
    form.textContent = '';
    const w = txt('div', 'col-wrap');
    ORDEM_URNA.forEach((cargo, i) => {
      const bloco = txt('div', 'col-cargo');
      const h = txt('div', 'col-h');
      h.appendChild(txt('span', 'col-ord', String(i + 1)));
      h.appendChild(txt('span', 'col-rot', cargo.rotulo));
      h.appendChild(txt('span', 'col-dig', cargo.digitos + ' dígitos'));
      bloco.appendChild(h);
      if (cargo.dica) bloco.appendChild(txt('p', 'col-dica', cargo.dica));

      const lista = listaDe(cargo.id);
      if (cargo.livre || !lista.length) bloco.appendChild(campoNumero(cargo));
      else if (lista.length > 20) bloco.appendChild(campoBusca(cargo));
      else {
        bloco.appendChild(opcoes(cargo));
        const sel = esc[cargo.id] ? acha(cargo.id, esc[cargo.id]) : null;
        if (sel && sel.alerta){
          const n = txt('div', 'note crit');
          n.style.margin = '12px 0 0';
          n.appendChild(txt('b', null, 'Atenção. '));
          n.appendChild(txt('span', null, sel.alerta +
            '. Um voto neste número pode ser anulado.'));
          bloco.appendChild(n);
        }
      }
      w.appendChild(bloco);
    });

    const ac = txt('div', 'col-acoes');
    const b1 = txt('button', 'btn', 'Imprimir colinha');
    b1.type = 'button';
    b1.addEventListener('click', () => window.print());
    const b2 = txt('button', 'btn btn-2', 'Limpar escolhas');
    b2.type = 'button';
    b2.addEventListener('click', () => { esc = {}; salva(); monta(); });
    ac.appendChild(b1); ac.appendChild(b2);
    w.appendChild(ac);

    const nf = txt('div', 'note');
    nf.appendChild(txt('b', null, 'Fonte dos números. '));
    nf.appendChild(txt('span', null, URNA.fonte +
      '. Confira sempre o número e a foto na urna antes de confirmar o voto.'));
    w.appendChild(nf);

    form.appendChild(w);
    desenhaCola();
  }

  function desenhaCola(){
    saida.textContent = '';
    const cola = txt('div', 'cola');
    const h = txt('div', 'cola-h');
    h.appendChild(txt('div', 'cola-t', 'Minha colinha de voto'));
    h.appendChild(txt('div', 'cola-s',
      '1º turno · 4 de outubro de 2026 · Goiás · mesma ordem da urna'));
    cola.appendChild(h);

    let n = 0;
    ORDEM_URNA.forEach((cargo, i) => {
      const item = txt('div', 'cola-item');
      const c = txt('div', 'cola-cargo');
      c.appendChild(txt('div', 'c1', (i + 1) + '. ' + cargo.rotulo));
      const nr = esc[cargo.id];
      const cand = nr ? acha(cargo.id, nr) : null;
      const amb = nr ? todosCom(cargo.id, nr) : [];
      if (amb.length > 1){
        c.appendChild(txt('div', 'c2', amb.map(x => x.urna).join(' ou ')));
        const a = txt('div', 'c1');
        a.style.color = 'var(--crit)';
        a.textContent = 'atenção: este número consta para mais de um candidato';
        c.appendChild(a);
      }
      else if (cand) c.appendChild(txt('div', 'c2', cand.urna + ' · ' + cand.partido));
      else if (nr) c.appendChild(txt('div', 'c2', 'número ' + nr));
      else c.appendChild(txt('div', 'c2 cola-vazio', 'não escolhido'));
      item.appendChild(c);
      const num = txt('div', 'cola-num', nr || '–'.repeat(cargo.digitos));
      if (!nr) num.style.color = 'var(--ink-3)';
      item.appendChild(num);
      cola.appendChild(item);
      if (nr) n++;
    });

    const rod = txt('div', 'cola-rod');
    rod.appendChild(txt('div', null,
      'Números conforme o registro oficial de candidaturas do TSE. ' +
      'Confira cada um na urna antes de confirmar.'));
    rod.appendChild(txt('div', null,
      n + ' de ' + ORDEM_URNA.length + ' cargos preenchidos'));
    cola.appendChild(rod);
    saida.appendChild(cola);
  }

  monta();
})();

/* tema */
(function(){
  const b = document.getElementById('theme');
  let cur = null;
  try { cur = localStorage.getItem('tema'); } catch (e) {}
  if (cur) document.documentElement.setAttribute('data-theme', cur);
  b.addEventListener('click', () => {
    const atual = document.documentElement.getAttribute('data-theme');
    let escuro;
    if (atual === 'dark') escuro = true;
    else if (atual === 'light') escuro = false;
    else escuro = !!(window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
    const next = escuro ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('tema', next); } catch (e) {}
  });
})();

/* nav ativa */
(function(){
  if (typeof IntersectionObserver !== 'function') return;
  const pares = [];
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.charAt(0) !== '#' || href.length < 2) return;
    let sec = null;
    try { sec = document.querySelector(href); } catch (e) { return; }
    if (sec) pares.push({ a, sec });
  });
  if (!pares.length) return;
  const obs = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      pares.forEach(p => p.a.classList.toggle('on', p.sec === e.target));
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  pares.forEach(p => obs.observe(p.sec));
})();
