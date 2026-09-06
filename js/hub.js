/* ============================================================
   Life on Earth Hub — the shelf
   Reads window.TREE (the groups and the story) and window.TOPICS
   (the labs), draws the tree of life on the water, and makes it
   answer the pointer. Adding a lab means editing topics.js only;
   adding a group means editing tree.js only.
   ============================================================ */
(function () {
  'use strict';

  var T = window.TREE || { groups: [], story: [] };
  var L = window.TOPICS || [];
  var svg     = document.getElementById('tree');
  var map     = document.getElementById('map');
  var tag     = document.getElementById('tag');
  var said    = document.getElementById('said');
  var card    = document.getElementById('card');
  var whole   = document.getElementById('whole');
  var toastEl = document.getElementById('toast');
  var NS = 'http://www.w3.org/2000/svg', XL = 'http://www.w3.org/1999/xlink';
  var still  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow = window.matchMedia('(max-width: 900px)');

  var IDLE = '<span class="said__name">One drop, every kingdom</span>' +
             '<span class="said__note">Point at a branch, or start in the middle</span>';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c];
    });
  }
  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (parent) parent.appendChild(e);
    return e;
  }
  function f(v) { return Math.round(v * 10) / 10; }
  function col(k) { return 'var(--c-' + k + ')'; }

  /* ---------- 1. the shape of the tree ----------
     Angles are degrees clockwise from north. The rim runs from -10° round to
     280°, so the north-west stays open for the masthead; the tips share it out
     evenly, and every branch above them sits at the mean of its children. The
     rings are where things split: kingdoms on the first, their groups on the
     second, classes on the third, and every living group on the rim. */
  var R = { ring:110, king:170, cls:225, tip:300, lbl:340, far:386, story:62, num:86 };
  var FULL = { x:-420, y:-420, w:840, h:840 };
  var RIM = { from:-10, to:280 };
  var G = {}, KIDS = {}, TIPS = [];
  T.groups.forEach(function (g) {
    G[g.id] = g;
    if (g.kind === 'tip') TIPS.push(g.id);
    (KIDS[g.parent] = KIDS[g.parent] || []).push(g.id);
  });
  var V = T.viruses;
  if (V) G.viruses = V;
  var stepA = (RIM.to - RIM.from) / Math.max(1, TIPS.length - 1);
  TIPS.forEach(function (id, i) { G[id].a = RIM.from + i * stepA; });
  function angle(id) {
    var g = G[id];
    if (g.a == null) g.a = KIDS[id].reduce(function (s, k) { return s + angle(k); }, 0) / KIDS[id].length;
    return g.a;
  }
  (KIDS.root || []).forEach(angle);
  function tipsUnder(id) {
    if (id === 'viruses') return ['viruses'];
    return G[id].kind === 'tip' ? [id] : (KIDS[id] || []).reduce(function (a, k) { return a.concat(tipsUnder(k)); }, []);
  }
  function rSplit(id) { return id === 'root' ? R.ring : (G[id].parent === 'root' ? R.king : R.cls); }
  function kingdomOf(id) {
    if (id === 'viruses') return 'viruses';
    while (G[id] && G[id].parent !== 'root') id = G[id].parent;
    return id;
  }
  function pathOf(id) {
    var names = [], p = G[id] && G[id].parent;
    while (p && p !== 'root') { names.unshift(G[p].label); p = G[p].parent; }
    return names;
  }
  function P(a, r) { var t = a * Math.PI / 180; return [r * Math.sin(t), -r * Math.cos(t)]; }
  function arc(r, a0, a1, sweep) {
    var p0 = P(a0, r), p1 = P(a1, r), d = ((a1 - a0) % 360 + 360) % 360;
    var large = sweep === 0 ? ((360 - d) > 180 ? 1 : 0) : (d > 180 ? 1 : 0);
    return 'M' + f(p0[0]) + ' ' + f(p0[1]) + ' A' + f(r) + ' ' + f(r) + ' 0 ' + large + ' ' + (sweep === 0 ? 0 : 1) + ' ' + f(p1[0]) + ' ' + f(p1[1]);
  }
  function line(a, r0, r1) {
    var p0 = P(a, r0), p1 = P(a, r1);
    return 'M' + f(p0[0]) + ' ' + f(p0[1]) + ' L' + f(p1[0]) + ' ' + f(p1[1]);
  }

  /* ---------- 2. drawing it ---------- */
  var defs = svg.querySelector('defs');
  var ripples = el('g', { 'class':'ripples' }, svg);
  [R.far, R.tip, R.cls, R.king, R.ring, R.story].forEach(function (r, i) {
    el('circle', { 'class':'ripple' + (i === 0 ? ' ripple--far' : ''), r:r }, ripples);
  });
  /* the far ripple carries a line of words while a lab is pointed at */
  el('path', { id:'rp-all', d:arc(R.far, -40, 40, 1), fill:'none' }, defs);
  var ringAll = el('text', { 'class':'kl kl--all', id:'ringAll' }, ripples);
  var ringAllPath = el('textPath', { href:'#rp-all', startOffset:'50%', 'text-anchor':'middle' }, ringAll);
  ringAllPath.setAttributeNS(XL, 'xlink:href', '#rp-all');

  el('circle', { 'class':'origin', r:100 }, svg);

  var treeG = el('g', { 'class':'tree' }, svg);
  function addPath(d, ks, k, cls) {
    el('path', { 'class': cls || 'b', d:d, 'data-tips':ks.join(' '), 'data-k':k }, treeG);
  }
  /* an arc is split at the junction and at every child, so a lit route runs
     from the middle to one tip and no further */
  function segs(r, junction, children, k) {
    var kids = children.slice().sort(function (a, b) { return angle(a) - angle(b); });
    var angs = [junction].concat(kids.map(angle)).sort(function (a, b) { return a - b; });
    for (var i = 0; i + 1 < angs.length; i++) {
      var a0 = angs[i], a1 = angs[i + 1];
      if (a1 - a0 < 1e-6) continue;
      var mid = (a0 + a1) / 2, beyond;
      if (mid < junction) beyond = kids.filter(function (c) { return angle(c) <= a0 + 1e-6; });
      else                beyond = kids.filter(function (c) { return angle(c) >= a1 - 1e-6; });
      var ks = beyond.reduce(function (a, c) { return a.concat(tipsUnder(c)); }, []);
      if (ks.length) addPath(arc(r, a0, a1, 1), ks, k);
    }
  }
  function drawNode(id, rFrom) {
    var g = G[id], k = kingdomOf(id);
    if (g.kind === 'tip') { addPath(line(angle(id), rFrom, R.tip - 24), [id], k); return; }
    var rs = rSplit(id);
    addPath(line(angle(id), rFrom, rs), tipsUnder(id), k);
    segs(rs, angle(id), KIDS[id], k);
    KIDS[id].forEach(function (c) { drawNode(c, rs); });
  }
  addPath(line(180, 16, R.ring), TIPS, 'tree', 'b b--trunk');
  segs(R.ring, 180, KIDS.root || [], 'tree');
  (KIDS.root || []).forEach(function (c) { drawNode(c, R.ring); });

  /* names along the rings, for the branches that fan out again */
  var labels = el('g', { 'class':'labels' }, svg);
  T.groups.forEach(function (g) {
    if (!g.ring) return;
    var r = (rSplit(g.parent) + rSplit(g.id)) / 2, a = angle(g.id) + (g.shift || 0), half = 42;
    var deg = ((a % 360) + 360) % 360, bottom = deg > 90 && deg < 270;
    /* on the lower half the path runs the other way, so the words stay upright */
    var d = bottom ? arc(r + 5, a + half, a - half, 0) : arc(r - 5, a - half, a + half, 1);
    el('path', { id:'rp-' + g.id, d:d, fill:'none' }, defs);
    var t = el('text', { 'class':'kl', 'data-id':g.id, tabindex:0, role:'button', 'aria-label':g.label }, labels);
    var tp = el('textPath', { href:'#rp-' + g.id, startOffset:'50%', 'text-anchor':'middle' }, t);
    tp.setAttributeNS(XL, 'xlink:href', '#rp-' + g.id);
    tp.textContent = g.ring;
    wireGroup(t, g.id);
  });

  /* the silhouettes, one per tip, sized so each carries about the same weight */
  var tipsG = el('g', { 'class':'tips' }, svg);
  function symbolBox(file) {
    var s = document.getElementById('s-' + file);
    if (!s) return [1, 1];
    var vb = s.viewBox.baseVal;
    return [vb.width || 1, vb.height || 1];
  }
  function tipSize(file, target, cap) {
    var wh = symbolBox(file), q = Math.min(wh[0], wh[1]) / Math.max(wh[0], wh[1]);
    return Math.min(cap || 78, (target || 40) / Math.sqrt(q));
  }
  function use(file, x, y, size) {
    var u = el('use', { 'class':'sil', x:f(x - size / 2), y:f(y - size / 2), width:f(size), height:f(size), href:'#s-' + file });
    u.setAttributeNS(XL, 'xlink:href', '#s-' + file);
    return u;
  }
  TIPS.forEach(function (id) {
    var g = G[id], a = angle(id), p = P(a, R.tip), q = P(a, R.lbl), size = tipSize(g.sil.file);
    var grp = el('g', { 'class':'tip', 'data-tip':id, 'data-k':kingdomOf(id), tabindex:0, role:'button', 'aria-label':g.label }, tipsG);
    /* the target is wider than the silhouette: a thumb needs about 44 px, and on a phone the tree is small */
    el('circle', { 'class':'hot', cx:f(p[0]), cy:f(p[1]), r:f(size / 2 + 16) }, grp);
    grp.appendChild(use(g.sil.file, p[0], p[1], size));
    var t = el('text', { 'class':'tl', x:f(q[0]), y:f(q[1]), 'text-anchor': Math.sin(a * Math.PI / 180) >= 0 ? 'start' : 'end' }, grp);
    t.textContent = g.label;
    wireGroup(grp, id);
  });
  if (V) {
    var vp = P(V.angle, V.r);
    var vg = el('g', { 'class':'tip tip--virus', 'data-tip':'viruses', 'data-k':'viruses', tabindex:0, role:'button', 'aria-label':V.label }, tipsG);
    el('circle', { 'class':'vring', cx:f(vp[0]), cy:f(vp[1]), r:26 }, vg);
    el('circle', { 'class':'hot', cx:f(vp[0]), cy:f(vp[1]), r:34 }, vg);
    vg.appendChild(use(V.sil.file, vp[0], vp[1], 30));
    var vt = el('text', { 'class':'tl', x:f(vp[0]), y:f(vp[1] + 44), 'text-anchor':'middle' }, vg);
    vt.textContent = V.label;
    var vs = el('text', { 'class':'tl tl--sub', x:f(vp[0]), y:f(vp[1] + 59), 'text-anchor':'middle' }, vg);
    vs.textContent = V.sub;
    wireGroup(vg, 'viruses');
  }

  /* the origin: the five steps round the drop */
  var storyG = el('g', { 'class':'story' }, svg);
  var STORY_ANG = [216, 288, 0, 72, 144];
  var STORY = {};
  T.story.forEach(function (s, i) {
    STORY[s.n] = s;
    var a = STORY_ANG[i % STORY_ANG.length], p = P(a, R.story), n = P(a, R.num);
    var g = el('g', { 'class':'st', 'data-step':s.n, tabindex:0, role:'button', 'aria-label':'Step ' + s.n + ' · ' + s.title,
                      transform:'translate(' + f(p[0]) + ' ' + f(p[1]) + ')' }, storyG);
    el('circle', { 'class':'st__disc', r:14 }, g);
    var ico = el('g', { 'class':'st__ico' }, g);
    ico.innerHTML = s.icon;
    var t = el('text', { 'class':'st__n', x:f(n[0] - p[0]), y:f(n[1] - p[1]), 'text-anchor':'middle', 'dominant-baseline':'middle' }, g);
    t.textContent = s.n;
    wireStory(g, s.n);
  });
  el('circle', { 'class':'core', r:4.5 }, storyG);

  /* marine snow, drifting up through the water */
  var snow = document.getElementById('snow');
  if (snow) {
    for (var layer = 0; layer < 2; layer++) {
      var lg = el('g', {}, snow);
      for (var i = 0; i < 45; i++) {
        el('circle', { cx:f(Math.random() * 1000 - 500), cy:f(Math.random() * 2000 - 500),
                       r:f(.7 + Math.random() * 1.2), opacity:f(.12 + Math.random() * .28) }, lg);
      }
    }
  }

  /* ---------- 3. lighting ---------- */
  var current = null;   /* what is lit right now: { kind, id } */
  var held = null;      /* what a click or a tap has pinned, until Escape or the whole tree */
  var cardState = null;

  function clearMarks() {
    svg.classList.remove('lit');
    svg.querySelectorAll('.is-on').forEach(function (e) { e.classList.remove('is-on'); });
    ringAll.classList.remove('is-on');
    tag.classList.remove('on');
    [svg, said, card].forEach(function (e) { e.style.removeProperty('--c'); });
    document.querySelectorAll('.is-hot').forEach(function (e) { e.classList.remove('is-hot'); });
  }
  /* the little label that sits on what is lit */
  function pin(elm, text, c) {
    if (!elm) { tag.classList.remove('on'); return; }
    var o = elm.getBoundingClientRect(), fr = map.getBoundingClientRect();
    tag.style.setProperty('--c', c);
    tag.querySelector('.tag__pill').textContent = text;
    tag.style.left = (o.left + o.width / 2 - fr.left) + 'px';
    tag.style.top  = (o.top - fr.top - 8) + 'px';
    tag.classList.add('on');
  }
  function say(name, note, c) {
    if (c) said.style.setProperty('--c', c); else said.style.removeProperty('--c');
    said.innerHTML = '<span class="said__name">' + esc(name) + '</span><span class="said__note">' + esc(note) + '</span>';
  }
  function labsFor(id) {
    return L.filter(function (t) { return t.sys === 'tree' || t.sys === id || tipsUnder(t.sys === 'tree' ? 'root' : t.sys).indexOf(id) >= 0; });
  }
  function labLine(id) {
    var ls = L.filter(function (t) { return t.sys === id || (t.sys === 'tree' && t.groups); });
    if (!ls.length) return '';
    return '<p class="lab">' + ls.map(function (t) {
      return t.status === 'live' && t.url ? '<a href="' + esc(t.url) + '">' + esc(t.lab) + ' →</a>' : esc(t.lab) + ' · ' + (t.status === 'build' ? 'being built' : 'planned');
    }).join(' · ') + '</p>';
  }
  function backLink() { return held ? '<button type="button" class="back" data-back>The whole tree</button>' : ''; }

  function lightGroup(id, withCard) {
    var g = G[id]; if (!g) return;
    clearMarks(); svg.classList.add('lit');
    var k = kingdomOf(id), c = col(k), ts = tipsUnder(id);
    svg.style.setProperty('--c', c);
    svg.querySelectorAll('.b').forEach(function (p) {
      var pt = p.getAttribute('data-tips').split(' ');
      if (ts.some(function (t) { return pt.indexOf(t) >= 0; })) p.classList.add('is-on');
    });
    ts.forEach(function (t) {
      var e = svg.querySelector('.tip[data-tip="' + t + '"]');
      if (e) { e.classList.add('is-on'); e.querySelector('.sil').classList.add('is-on'); }
    });
    svg.querySelectorAll('.kl[data-id]').forEach(function (t) {
      var rid = t.getAttribute('data-id');
      if (rid === id || tipsUnder(rid).every(function (x) { return ts.indexOf(x) >= 0; })) t.classList.add('is-on');
    });
    var anchor = svg.querySelector('.tip[data-tip="' + id + '"] .sil') || svg.querySelector('.kl[data-id="' + id + '"]');
    pin(anchor, g.label, c);
    var path = id === 'viruses' ? V.path : (pathOf(id).join(' · ') || 'Kingdom');
    say(g.label, path, c);
    current = { kind:'group', id:id };
    if (withCard === false) return;
    card.style.setProperty('--c', c);
    card.innerHTML = backLink() +
      '<span class="eyebrow">' + esc(path) + '</span><h2>' + esc(g.label) + '</h2>' +
      (g.img ? picture(g.img) : '') +
      '<div class="band"><span class="eyebrow">What puts an organism here</span></div>' +
      '<ul class="feats">' + (g.feats || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      (g.eg ? '<p class="eg"><b>For example</b>' + esc(g.eg) + '</p>' : '') +
      (g.real ? '<p class="real">' + esc(g.real) + '</p>' : '') +
      labLine(id);
    cardState = 'group:' + id;
    wireCard();
  }

  function picture(img) {
    var ws = img.widths || [900, 1400], b = img.base;
    var set = function (ext) { return ws.map(function (w) { return b + '-' + w + '.' + ext + ' ' + w + 'w'; }).join(', '); };
    return '<figure class="fig"><picture>' +
      '<source type="image/webp" srcset="' + set('webp') + '" sizes="360px">' +
      '<img src="' + b + '-' + ws[0] + '.jpg" srcset="' + set('jpg') + '" sizes="360px" alt="' + esc(img.alt) + '" loading="lazy" decoding="async">' +
      '</picture><figcaption>' + (img.caption ? esc(img.caption) + ' · ' : '') + '<a href="' + esc(img.url) + '" target="_blank" rel="noopener">' + esc(img.credit) + '</a></figcaption></figure>';
  }
  function evidenceBlock(ev, note) {
    function list(label, items, cls) {
      return '<ul class="ev__list ev__list--' + cls + '"><li class="ev__lab">' + label + '</li>' + items.map(function (i) {
        return '<li>' + esc(i.t) + ' <a href="' + esc(i.url) + '" target="_blank" rel="noopener">' + esc(i.s) + '</a></li>';
      }).join('') + '</ul>';
    }
    return '<div class="band"><span class="eyebrow">Where the evidence stands</span></div>' + ev.map(function (side) {
      return '<div class="ev"><h3 class="ev__h">' + esc(side.side) + '</h3>' + list('For', side['for'] || [], 'for') + list('Against', side.against || [], 'against') + '</div>';
    }).join('') + (note ? '<p class="real">' + esc(note) + '</p>' : '');
  }
  function bookCard() {
    var b = T.book; if (!b) return '';
    var cover = b.cover
      ? '<span class="book__cover book__cover--img"><picture><source type="image/webp" srcset="' + b.cover + '.webp"><img src="' + b.cover + '.jpg" alt="The cover of ' + esc(b.title) + '" loading="lazy" decoding="async"></picture></span>'
      : '<span class="book__cover"><span>' + esc(b.title) + '</span><small>' + esc(b.author) + '</small></span>';
    return '<a class="book" href="' + esc(b.url) + '" target="_blank" rel="noopener">' + cover +
      '<span class="book__txt"><span class="book__eyebrow">Go deeper · a book</span><b>' + esc(b.title) + '</b>' +
      '<span class="book__by">' + esc(b.author) + ' · ' + esc(b.year) + (b.coverCredit ? ' · ' + esc(b.coverCredit) : '') + '</span>' + esc(b.text) + '</span></a>';
  }
  function figFor(s) {
    if (s.img) return picture(s.img);
    return s.fig ? '<div class="fig">' + s.fig + '</div>' : '';
  }
  function lightStory(n, withCard) {
    var s = STORY[n]; if (!s) return;
    clearMarks(); svg.classList.add('lit');
    var c = col('story'); svg.style.setProperty('--c', c);
    var e = svg.querySelector('.st[data-step="' + n + '"]'); e.classList.add('is-on');
    pin(e, n + ' · ' + s.title, c);
    say(s.title, 'Where you come from · step ' + n + ' of ' + T.story.length, c);
    document.querySelectorAll('[data-step="' + n + '"]').forEach(function (b) { b.classList.add('is-hot'); });
    current = { kind:'story', id:n };
    if (withCard === false) return;
    card.style.setProperty('--c', c);
    card.innerHTML = backLink() +
      '<span class="eyebrow">Where you come from · ' + n + ' of ' + T.story.length + '</span><h2>' + esc(s.title) + '</h2>' +
      figFor(s) +
      '<p class="story__text">' + esc(s.text) + '</p>' +
      (s.real ? '<p class="real">' + esc(s.real) + '</p>' : '') +
      (s.evidence ? evidenceBlock(s.evidence, s.evidenceNote) : '') +
      '<span class="chip"><b>Meet</b>' + esc(s.chip) + '</span>' +
      (s.reads && s.reads.length ? '<ul class="reads">' + s.reads.map(function (r) { return '<li>Read: <a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + esc(r.t) + '</a></li>'; }).join('') + '</ul>' : '') +
      (s.book ? bookCard() : '');
    cardState = 'story:' + n;
    wireCard();
  }

  function lightTopic(id, withCard) {
    var t = L.filter(function (x) { return x.id === id; })[0]; if (!t) return;
    clearMarks(); svg.classList.add('lit');
    var c = col('tree'); svg.style.setProperty('--c', c);
    if (t.sys === 'tree' || !G[t.sys]) {
      svg.querySelectorAll('.b,.sil,.kl[data-id]').forEach(function (e) { e.classList.add('is-on'); });
      svg.querySelectorAll('.tip').forEach(function (e) { e.classList.add('is-on'); });
    } else {
      lightGroup(t.sys, false); svg.style.setProperty('--c', c);
    }
    ringAllPath.textContent = t.ring || '';
    if (t.ring) ringAll.classList.add('is-on');
    say(t.lab, 'Topic ' + t.no + ' · ' + t.title, c);
    document.querySelectorAll('[data-lab="' + t.id + '"]').forEach(function (b) { b.classList.add('is-hot'); });
    current = { kind:'topic', id:id };
    if (withCard === false) return;
    card.style.setProperty('--c', c);
    card.innerHTML = backLink() +
      '<span class="eyebrow">Topic ' + t.no + ' · ' + esc(t.year) + '</span><h2>' + esc(t.lab) + '</h2>' +
      '<p class="path">' + esc(t.title) + '</p>' +
      '<p class="topic__blurb">' + esc(t.blurb) + '</p>' +
      (t.status === 'live' && t.url
        ? '<a class="hero__go" href="' + esc(t.url) + '" style="margin-top:14px">Open the lab</a>' + (t.detail ? '<span class="hero__stat">' + esc(t.detail) + '</span>' : '')
        : '<p class="topic__status' + (t.status === 'planned' ? ' topic__status--planned' : '') + '">' + (t.status === 'build' ? 'Being built' : 'Planned') + '</p>');
    cardState = 'topic:' + id;
    wireCard();
  }

  function show(kind, id, withCard) {
    if (kind === 'group') lightGroup(id, withCard);
    else if (kind === 'story') lightStory(id, withCard);
    else lightTopic(id, withCard);
  }
  function idle() {
    clearMarks(); current = null;
    said.innerHTML = IDLE;
    if (cardState !== 'idle') renderIdleCard();
  }
  /* leaving something: back to what is pinned, or to rest */
  function leave() { if (held) show(held.kind, held.id, true); else idle(); }

  /* ---------- 4. the card at rest: the story, then the labs ---------- */
  function renderIdleCard() {
    var live   = L.filter(function (t) { return t.status === 'live' && t.url; });
    var queued = L.filter(function (t) { return !(t.status === 'live' && t.url); });
    var h = '<span class="eyebrow">Start here</span><h2 class="card__h">Where you come from</h2>' +
      '<ul class="steps">' + T.story.map(function (s) {
        return '<li><button type="button" data-step="' + s.n + '"><span class="n">' + s.n + '</span>' +
               '<span class="w"><span class="t">' + esc(s.title) + '</span><span class="s">' + esc(s.chip) + '</span></span></button></li>';
      }).join('') + '</ul>' + (T.book ? bookCard() : '');
    if (live.length) {
      h += '<div class="band"><span class="eyebrow">Open now</span></div>' + live.map(function (t) {
        return '<a class="hero" href="' + esc(t.url) + '" data-lab="' + t.id + '">' +
          '<span class="hero__no">Topic ' + t.no + ' · ' + esc(t.year) + '</span>' +
          '<span class="hero__name">' + esc(t.lab) + '</span><span class="hero__sub">' + esc(t.title) + '</span>' +
          '<span class="hero__go">Open the lab</span>' + (t.detail ? '<span class="hero__stat">' + esc(t.detail) + '</span>' : '') + '</a>';
      }).join('');
    }
    if (queued.length) {
      h += '<div class="band"><span class="eyebrow">Being built</span><span class="count">' + queued.length + ' on the way</span></div>' +
        '<ul class="labs">' + queued.map(function (t) {
          return '<li><button type="button" data-lab="' + t.id + '"><span class="no">' + t.no + '</span>' +
                 '<span class="l">' + esc(t.lab) + '<small>' + esc(t.title) + '</small></span>' +
                 '<span class="pill' + (t.status === 'build' ? ' pill--build' : '') + '">' + (t.status === 'build' ? 'Being built' : 'Planned') + '</span></button></li>';
        }).join('') + '</ul>';
    }
    card.innerHTML = h;
    cardState = 'idle';
    wireCard();
  }
  function wireCard() {
    card.querySelectorAll('[data-step]').forEach(function (b) {
      var n = +b.getAttribute('data-step');
      b.addEventListener('mouseenter', function () { stopTour(); show('story', n, false); });
      b.addEventListener('mouseleave', function () { leave(); restTour(); });
      b.addEventListener('click', function () { toggleHold('story', n); });
    });
    card.querySelectorAll('[data-lab]').forEach(function (b) {
      var id = b.getAttribute('data-lab');
      var t = L.filter(function (x) { return x.id === id; })[0];
      b.addEventListener('mouseenter', function () { stopTour(); show('topic', id, false); });
      b.addEventListener('mouseleave', function () { leave(); restTour(); });
      if (b.tagName !== 'A') b.addEventListener('click', function () {
        if (t && t.status === 'live' && t.url) window.location.href = t.url;
        else toast((t ? t.lab : 'That lab') + ' has not been built yet.');
      });
    });
    card.querySelectorAll('[data-back]').forEach(function (b) { b.addEventListener('click', release); });
  }

  /* ---------- 5. pointing, clicking, tapping ---------- */
  function wireGroup(e, id) {
    ['mouseenter', 'focus'].forEach(function (ev) { e.addEventListener(ev, function () { stopTour(); show('group', id, true); }); });
    ['mouseleave', 'blur'].forEach(function (ev) { e.addEventListener(ev, function () { leave(); restTour(); }); });
    e.addEventListener('click', function (ev) { ev.stopPropagation(); toggleHold('group', id); });
    e.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); toggleHold('group', id); }
    });
  }
  function wireStory(e, n) {
    ['mouseenter', 'focus'].forEach(function (ev) { e.addEventListener(ev, function () { stopTour(); show('story', n, true); }); });
    ['mouseleave', 'blur'].forEach(function (ev) { e.addEventListener(ev, function () { leave(); restTour(); }); });
    e.addEventListener('click', function (ev) { ev.stopPropagation(); toggleHold('story', n); });
    e.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); toggleHold('story', n); }
    });
  }
  function toggleHold(kind, id) {
    if (held && held.kind === kind && String(held.id) === String(id)) { release(); return; }
    hold(kind, id);
  }
  function hold(kind, id) {
    stopTour();
    held = { kind:kind, id:id };
    document.body.classList.add('is-held');
    whole.hidden = false;
    show(kind, id, true);
    if (kind === 'topic') { flyTo(FULL); return; }
    flyTo(boxOfLit(kind === 'story' ? 340 : 250), function () { show(kind, id, true); });
    if (narrow.matches) card.scrollIntoView({ block:'nearest', behavior: still ? 'auto' : 'smooth' });
  }
  function release() {
    held = null;
    document.body.classList.remove('is-held');
    whole.hidden = true;
    idle();
    flyTo(FULL);
    restTour();
  }
  whole.addEventListener('click', release);
  svg.addEventListener('click', function (ev) {
    /* the water itself: let go of whatever is pinned */
    if (held && !ev.target.closest('.tip,.st,.kl')) release();
  });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && held) release(); });
  window.addEventListener('resize', function () { if (current) show(current.kind, current.id, false); });

  /* ---------- 6. the flight ----------
     Click a branch and the view flies to it: the box round everything that is
     lit, measured at rest — never mid-flight, when nothing is where it says. */
  var view = { x:FULL.x, y:FULL.y, w:FULL.w, h:FULL.h }, anim = null;
  function setView(v) { svg.setAttribute('viewBox', f(v.x) + ' ' + f(v.y) + ' ' + f(v.w) + ' ' + f(v.h)); }
  function flyTo(to, done) {
    to = to || FULL;
    var zoomed = to.w < FULL.w - 1;
    map.classList.toggle('is-zoomed', zoomed);
    if (still) { view = { x:to.x, y:to.y, w:to.w, h:to.h }; setView(view); if (done) done(); return; }
    if (anim) cancelAnimationFrame(anim);
    var from = { x:view.x, y:view.y, w:view.w, h:view.h }, t0 = null, D = 700;
    map.classList.add('is-flying');
    function tick(now) {
      if (t0 === null) t0 = now;
      var k = Math.min(1, (now - t0) / D), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      view = { x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e,
               w: from.w + (to.w - from.w) * e, h: from.h + (to.h - from.h) * e };
      setView(view);
      if (k < 1) anim = requestAnimationFrame(tick);
      else { anim = null; map.classList.remove('is-flying'); if (done) done(); }
    }
    anim = requestAnimationFrame(tick);
  }
  function grow(b, x, y, X, Y) {
    return b ? { x:Math.min(b.x, x), y:Math.min(b.y, y), X:Math.max(b.X, X), Y:Math.max(b.Y, Y) } : { x:x, y:y, X:X, Y:Y };
  }
  function boxOfLit(minSize) {
    var b = null;
    svg.querySelectorAll('.b.is-on, .kl.is-on, .tip.is-on .tl').forEach(function (e) {
      var r; try { r = e.getBBox(); } catch (err) { return; }
      if (r.width || r.height) b = grow(b, r.x, r.y, r.x + r.width, r.y + r.height);
    });
    svg.querySelectorAll('.tip.is-on .hot').forEach(function (c) {
      var cx = +c.getAttribute('cx'), cy = +c.getAttribute('cy'), r = +c.getAttribute('r');
      b = grow(b, cx - r, cy - r, cx + r, cy + r);
    });
    svg.querySelectorAll('.st.is-on').forEach(function (g) {
      var m = /translate\(([-\d.]+) ([-\d.]+)\)/.exec(g.getAttribute('transform') || '');
      if (m) b = grow(b, +m[1] - 40, +m[2] - 40, +m[1] + 40, +m[2] + 40);
    });
    if (!b) return FULL;
    var pad = 36, w = b.X - b.x + pad * 2, h = b.Y - b.y + pad * 2, s = Math.max(w, h, minSize || 250);
    if (s >= FULL.w * .85) return FULL;
    var cx = (b.x + b.X) / 2, cy = (b.y + b.Y) / 2;
    return { x:cx - s / 2, y:cy - s / 2, w:s, h:s };
  }

  /* ---------- 7. the idle tour ----------
     Left alone, the tree walks itself: the five steps from the vent, then every
     group round the rim. Any touch stops it; it picks up again after a pause. */
  var TOUR = T.story.map(function (s) { return { kind:'story', id:s.n }; })
    .concat(TIPS.map(function (id) { return { kind:'group', id:id }; }))
    .concat(V ? [{ kind:'group', id:'viruses' }] : []);
  var tour = null, resume = null, ti = 0, TOUR_MS = 5800;
  function startTour() { if (still || tour || held || !TOUR.length) return; stepTour(); tour = setInterval(stepTour, TOUR_MS); }
  function stepTour() { var s = TOUR[ti % TOUR.length]; ti++; show(s.kind, s.id, true); }
  function stopTour() { clearInterval(tour); tour = null; clearTimeout(resume); }
  function restTour() {
    clearTimeout(resume);
    if (still || held) return;
    resume = setTimeout(function () {
      if (!document.querySelector('.tip:hover,.st:hover,.kl:hover,.card:hover')) startTour();
    }, 16000);
  }
  ['pointerdown', 'pointermove', 'keydown', 'wheel', 'touchstart'].forEach(function (ev) {
    window.addEventListener(ev, function () {
      if (tour) {
        stopTour();
        if (!document.querySelector('.tip:hover,.st:hover,.kl:hover,.card:hover')) leave();
        restTour();
      } else if (!held) { clearTimeout(resume); resume = setTimeout(startTour, 16000); }
    }, { passive:true });
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { clearInterval(tour); tour = null; }
    else if (!held) { clearTimeout(resume); resume = setTimeout(startTour, 3000); }
  });

  /* ---------- 8. a link straight to something ----------
     /#mammals, /#animals, /#story-3 or /#inheritance opens the page on it and
     holds it, for projecting a prepared state in class. */
  function openHash() {
    var h = (location.hash || '').replace(/^#/, '');
    if (!h) return false;
    var m = /^story-(\d+)$/.exec(h);
    if (m && STORY[+m[1]]) { hold('story', +m[1]); return true; }
    if (G[h]) { hold('group', h); return true; }
    if (L.some(function (t) { return t.id === h; })) { hold('topic', h); return true; }
    return false;
  }
  window.addEventListener('hashchange', function () { if (!openHash()) release(); });

  /* ---------- 9. credits, toast ---------- */
  var cr = document.getElementById('creditsList');
  if (cr) {
    var sils = T.groups.filter(function (g) { return g.sil; }).concat(V ? [V] : []);
    cr.innerHTML = 'Silhouettes from <a href="https://www.phylopic.org" target="_blank" rel="noopener">PhyloPic</a>, CC0 or public domain where marked: ' +
      sils.map(function (g) { return '<a href="' + esc(g.sil.url) + '" target="_blank" rel="noopener">' + esc(g.label.toLowerCase()) + '</a> by ' + esc(g.sil.by) + (/public/i.test(g.sil.licence) ? ' (PD)' : ''); }).join(' · ') +
      '. Pictures on the story: ' + T.story.filter(function (x) { return x.img; }).map(function (x) { return '<a href="' + esc(x.img.url) + '" target="_blank" rel="noopener">' + esc(x.title.toLowerCase()) + '</a>, ' + esc(x.img.credit); }).join(' · ') +
      '. Photographs on the groups: ' + T.groups.filter(function (g) { return g.img; }).concat(V && V.img ? [V] : []).map(function (g) { return '<a href="' + esc(g.img.url) + '" target="_blank" rel="noopener">' + esc(g.label.toLowerCase()) + '</a>, ' + esc(g.img.credit); }).join(' · ') +
      (T.book && T.book.cover ? '. ' + esc(T.book.coverCredit || 'Book cover: the publisher') + ', shown to identify the book' : '') +
      '. The story follows the alkaline-vent hypothesis; each step links to what it rests on, and the full list with licences is in <a href="https://github.com/Mompel226/life-on-earth-hub/blob/main/assets/CREDITS.md" target="_blank" rel="noopener">assets/CREDITS.md</a>.';
  }
  var timer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg; toastEl.classList.add('on');
    clearTimeout(timer); timer = setTimeout(function () { toastEl.classList.remove('on'); }, 2600);
  }

  /* ---------- 10. start ---------- */
  idle();
  if (!openHash()) setTimeout(startTour, 4000);

  /* ?audit=1 — draws a red box round any two things on the page that overlap,
     and writes the count into the title. Used before every deploy. */
  if (/[?&]audit/.test(location.search)) {
    var els = [].slice.call(document.querySelectorAll('text.tl, text.kl, use.sil, .st, .masthead, .card, .said, .foot, .tag.on, .whole:not([hidden])'));
    var rects = els.map(function (e) { var r = e.getBoundingClientRect(); return { e:e, l:r.left, t:r.top, r:r.right, b:r.bottom }; })
                   .filter(function (r) { return r.r - r.l > 0 && r.b - r.t > 0; });
    var ov = document.createElement('div'); ov.className = 'audit'; var n = 0, pairs = [];
    for (var a = 0; a < rects.length; a++) for (var z = a + 1; z < rects.length; z++) {
      var A = rects[a], Z = rects[z];
      if (A.e.contains(Z.e) || Z.e.contains(A.e)) continue;
      if (A.e.classList.contains('kl') && Z.e.classList.contains('kl')) continue;   /* curved words on different rings: boxes, not collisions */
      if (A.l < Z.r - 1 && Z.l < A.r - 1 && A.t < Z.b - 1 && Z.t < A.b - 1) {
        n++; pairs.push((A.e.textContent || A.e.className.baseVal || A.e.className).toString().trim().slice(0, 16) + ' × ' + (Z.e.textContent || Z.e.className.baseVal || Z.e.className).toString().trim().slice(0, 16));
        [A, Z].forEach(function (r) { var d = document.createElement('div'); d.style.left = r.l + 'px'; d.style.top = r.t + 'px'; d.style.width = (r.r - r.l) + 'px'; d.style.height = (r.b - r.t) + 'px'; ov.appendChild(d); });
      }
    }
    var lab = document.createElement('b'); lab.textContent = 'audit: ' + n + ' overlapping pairs · ' + pairs.slice(0, 6).join(' ; '); ov.appendChild(lab);
    document.body.appendChild(ov); document.title = 'AUDIT ' + n + ' :: ' + pairs.join(' ;; ');
  }
})();
