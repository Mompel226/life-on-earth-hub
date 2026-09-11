/* ============================================================
   Life on Earth Hub — the shelf
   The tree itself is drawn and lit by js/tree-draw.js, which this page shares
   with the Classification Lab. This file is the hub's own behaviour: the
   card, the story, the labs, the tour, the deep links. The hub is a map and
   an introduction: the theory lives in the lab, and a group on the tree
   opens the lab on that group. Adding a lab means editing topics.js only.
   ============================================================ */
(function () {
  'use strict';

  var T = window.TREE || { groups: [], story: [] };
  var L = window.TOPICS || [];

  /* ---------- the lab register, and this browser's own progress ----------
     WHICH labs exist and how big they are lives in js/data/labs.js, generated from
     labs-shared/labs.json by tools/stamp.mjs. HOW to read a lab's record lives in
     js/progress.js, shared with every hub. So a count is never typed here: it is read from
     the register and matched to a topic by its url, and it follows a lab when that lab grows.
     The string in topics.js is only a fallback — `node tools/status.mjs` fails if the two
     disagree.

     This hub carries no marks address and must not: it is ONE repository, linked from both
     the NLCS and the open edition of the front door. It shows only what this browser
     remembers. Signing in, and bringing handed-in work back, belongs to the front door,
     where each school sets its own address in js/local.js. */
  var REG = window.LABS_REGISTER || {}, REG_LABS = REG.labs || [], PROG = window.LabProgress;

  function labFor(t) {
    var u = String(t.url || '').replace(/\/$/, '');
    for (var i = 0; i < REG_LABS.length; i++)
      if (String(REG_LABS[i].url || '').replace(/\/$/, '') === u) return REG_LABS[i];
    return null;
  }
  function statOf(t) {                      /* "10 stations · 64 questions", from the register */
    var l = labFor(t);
    if (l && l.stations && l.questions) return l.stations + ' stations · ' + l.questions + ' questions';
    return t.detail || '';
  }
  function progOf(t) {                      /* '' until this browser has opened the lab */
    var l = labFor(t); if (!l || !PROG) return '';
    var p = PROG.local(l);
    if (!p.started && !p.handedIn) return '';
    return '<span class="hero__prog" title="' + p.done + ' of ' + p.total + ' questions answered correctly">' +
      '<span class="pbar"><span class="pbar__fill" style="width:' + PROG.pct(p) + '%"></span></span>' +
      '<b>' + PROG.pct(p) + '%</b><small>' + p.done + ' of ' + p.total +
      (p.handedIn ? ' · handed in' : '') + '</small></span>';
  }
  var svg     = document.getElementById('tree');
  var map     = document.getElementById('map');
  var tag     = document.getElementById('tag');
  var said    = document.getElementById('said');
  var card    = document.getElementById('card');
  var whole   = document.getElementById('whole');
  var toastEl = document.getElementById('toast');
  var still  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow = window.matchMedia('(max-width: 900px)');

  var IDLE = '<span class="said__name">One drop, every kingdom</span>' +
             '<span class="said__note">Point at a branch, or start in the middle</span>';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c];
    });
  }

  /* the lab that teaches the groups themselves — a group on the tree opens it there */
  var GROUP_LAB = L.filter(function (t) { return t.groups; })[0] || null;
  function labLive() { return !!(GROUP_LAB && GROUP_LAB.status === 'live' && GROUP_LAB.url); }
  function labHref(id) { return labLive() ? GROUP_LAB.url + '#' + id : null; }

  /* ---------- 1. the tree ---------- */
  var tree = window.TreeDraw(svg, T, {
    map: map, tag: tag,
    onEnter: function (kind, id) { stopTour(); show(kind, id, true); },
    onLeave: function () { leave(); restTour(); },
    onClick: function (kind, id) {
      /* a group opens the lab on that group once the lab exists; until then, and for the
         story, a click holds the view the way it always did */
      if (kind === 'group' && labHref(id)) { window.location.href = labHref(id); return; }
      toggleHold(kind, id);
    }
  });
  var G = tree.G, STORY = tree.STORY, V = T.viruses;
  var snow = document.getElementById('snow');
  if (snow) window.TreeDraw.snow(snow);

  /* ---------- 2. what is lit, and what the card says ---------- */
  var current = null, held = null, cardState = null;

  function say(name, note, c) {
    if (c) said.style.setProperty('--c', c); else said.style.removeProperty('--c');
    said.innerHTML = '<span class="said__name">' + esc(name) + '</span><span class="said__note">' + esc(note) + '</span>';
  }
  function picture(img) {
    var ws = img.widths || [900, 1400], b = img.base;
    var set = function (ext) { return ws.map(function (w) { return b + '-' + w + '.' + ext + ' ' + w + 'w'; }).join(', '); };
    return '<figure class="fig"><picture>' +
      '<source type="image/webp" srcset="' + set('webp') + '" sizes="360px">' +
      '<img src="' + b + '-' + ws[0] + '.jpg" srcset="' + set('jpg') + '" sizes="360px" alt="' + esc(img.alt) + '" loading="lazy" decoding="async">' +
      '</picture><figcaption>' + (img.caption ? esc(img.caption) + ' · ' : '') + '<a href="' + esc(img.url) + '" target="_blank" rel="noopener">' + esc(img.credit) + '</a></figcaption></figure>';
  }
  function backLink() { return held ? '<button type="button" class="back" data-back>The whole tree</button>' : ''; }
  function labButton(id) {
    if (!GROUP_LAB) return '';
    if (labHref(id)) return '<a class="golab" href="' + esc(labHref(id)) + '">Learn it in the ' + esc(GROUP_LAB.lab) + '<small>the features, the questions, the marks</small></a>';
    return '<p class="lab">' + esc(GROUP_LAB.lab) + ' · ' + (GROUP_LAB.status === 'build' ? 'being built' : 'planned') + '</p>';
  }

  /* The hub introduces a group: its picture, where it sits, an example or two. What puts an
     organism there — the theory — is the lab's, so the card sends the student on. */
  function lightGroup(id, withCard) {
    var g = G[id]; if (!g) return;
    var r = tree.light(id); if (!r) return;
    var path = id === 'viruses' ? V.path : (tree.pathOf(id).join(' · ') || 'Kingdom');
    say(g.label, path, r.colour);
    current = { kind:'group', id:id };
    if (withCard === false) return;
    card.style.setProperty('--c', r.colour);
    card.innerHTML = backLink() +
      '<span class="eyebrow">' + esc(path) + '</span><h2>' + esc(g.label) + '</h2>' +
      (g.img ? picture(g.img) : '') +
      (g.eg ? '<p class="eg"><b>For example</b>' + esc(g.eg) + '</p>' : '') +
      (g.real ? '<p class="real">' + esc(g.real) + '</p>' : '') +
      labButton(id);
    cardState = 'group:' + id;
    wireCard();
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
  function lightStory(n, withCard) {
    var r = tree.lightStory(n); if (!r) return;
    var s = r.step;
    say(s.title, 'Where you come from · step ' + n + ' of ' + T.story.length, r.colour);
    document.querySelectorAll('[data-step="' + n + '"]').forEach(function (b) { b.classList.add('is-hot'); });
    current = { kind:'story', id:n };
    if (withCard === false) return;
    card.style.setProperty('--c', r.colour);
    card.innerHTML = backLink() +
      '<span class="eyebrow">Where you come from · ' + n + ' of ' + T.story.length + '</span><h2>' + esc(s.title) + '</h2>' +
      (s.img ? picture(s.img) : '') +
      '<p class="story__text">' + esc(s.text) + '</p>' +
      (s.real ? '<p class="real">' + esc(s.real) + '</p>' : '') +
      (s.evidence ? evidenceBlock(s.evidence, s.evidenceNote) : '') +
      '<span class="chip"><b>Meet</b>' + esc(s.chip) + '</span>' +
      (s.reads && s.reads.length ? '<ul class="reads">' + s.reads.map(function (r2) { return '<li>Read: <a href="' + esc(r2.url) + '" target="_blank" rel="noopener">' + esc(r2.t) + '</a></li>'; }).join('') + '</ul>' : '') +
      (s.book ? bookCard() : '');
    cardState = 'story:' + n;
    wireCard();
  }
  function lightTopic(id, withCard) {
    var t = L.filter(function (x) { return x.id === id; })[0]; if (!t) return;
    var r = (t.sys === 'tree' || !G[t.sys]) ? tree.lightAll(t.ring || '') : tree.light(t.sys, true);
    say(t.lab, 'Topic ' + t.no + ' · ' + t.title, r.colour);
    document.querySelectorAll('[data-lab="' + t.id + '"]').forEach(function (b) { b.classList.add('is-hot'); });
    current = { kind:'topic', id:id };
    if (withCard === false) return;
    card.style.setProperty('--c', r.colour);
    card.innerHTML = backLink() +
      '<span class="eyebrow">Topic ' + t.no + ' · ' + esc(t.year) + '</span><h2>' + esc(t.lab) + '</h2>' +
      '<p class="path">' + esc(t.title) + '</p>' +
      '<p class="topic__blurb">' + esc(t.blurb) + '</p>' +
      (t.status === 'live' && t.url
        ? '<a class="hero__go" href="' + esc(t.url) + '" style="margin-top:14px">Open the lab</a>' + (statOf(t) ? '<span class="hero__stat">' + esc(statOf(t)) + '</span>' : '') + progOf(t)
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
    tree.clear(); current = null;
    [said, card].forEach(function (e) { e.style.removeProperty('--c'); });
    document.querySelectorAll('.is-hot').forEach(function (e) { e.classList.remove('is-hot'); });
    said.innerHTML = IDLE;
    if (cardState !== 'idle') renderIdleCard();
  }
  function leave() { if (held) show(held.kind, held.id, true); else idle(); }

  /* ---------- 3. the card at rest ---------- */
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
          '<span class="hero__go">Open the lab</span>' + (statOf(t) ? '<span class="hero__stat">' + esc(statOf(t)) + '</span>' : '') + progOf(t) + '</a>';
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

  /* ---------- 4. holding, flying, letting go ---------- */
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
    if (kind === 'topic') { tree.flyTo(tree.FULL); return; }
    tree.flyTo(tree.boxOfLit(kind === 'story' ? 340 : 250), function () { show(kind, id, true); });
    if (narrow.matches) card.scrollIntoView({ block:'nearest', behavior: still ? 'auto' : 'smooth' });
  }
  function release() {
    held = null;
    document.body.classList.remove('is-held');
    whole.hidden = true;
    idle();
    tree.flyTo(tree.FULL);
    restTour();
  }
  whole.addEventListener('click', release);
  svg.addEventListener('click', function (ev) { if (held && !ev.target.closest('.tip,.st,.kl')) release(); });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && held) release(); });
  window.addEventListener('resize', function () { if (current) show(current.kind, current.id, false); });

  /* ---------- 5. the idle tour ---------- */
  var TOUR = T.story.map(function (s) { return { kind:'story', id:s.n }; })
    .concat(tree.TIPS.map(function (id) { return { kind:'group', id:id }; }))
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

  /* ---------- 6. a link straight to something ---------- */
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

  /* ---------- 7. credits, toast ---------- */
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

  /* ---------- 8. start ---------- */
  idle();
  if (!openHash()) setTimeout(startTour, 4000);

  /* ?audit=1 — a red box round any two things on the page that overlap, and the count in the title */
  if (/[?&]audit/.test(location.search)) {
    var els = [].slice.call(document.querySelectorAll('text.tl, text.kl, use.sil, .st, .masthead, .card, .said, .foot, .tag.on, .whole:not([hidden])'));
    var rects = els.map(function (e) { var r = e.getBoundingClientRect(); return { e:e, l:r.left, t:r.top, r:r.right, b:r.bottom }; })
                   .filter(function (r) { return r.r - r.l > 0 && r.b - r.t > 0; });
    var ov = document.createElement('div'); ov.className = 'audit'; var n = 0, pairs = [];
    for (var a = 0; a < rects.length; a++) for (var z = a + 1; z < rects.length; z++) {
      var A = rects[a], Z = rects[z];
      if (A.e.contains(Z.e) || Z.e.contains(A.e)) continue;
      if (A.e.classList.contains('kl') && Z.e.classList.contains('kl')) continue;
      if (A.l < Z.r - 1 && Z.l < A.r - 1 && A.t < Z.b - 1 && Z.t < A.b - 1) {
        n++; pairs.push((A.e.textContent || A.e.className.baseVal || A.e.className).toString().trim().slice(0, 16) + ' × ' + (Z.e.textContent || Z.e.className.baseVal || Z.e.className).toString().trim().slice(0, 16));
        [A, Z].forEach(function (r) { var d = document.createElement('div'); d.style.left = r.l + 'px'; d.style.top = r.t + 'px'; d.style.width = (r.r - r.l) + 'px'; d.style.height = (r.b - r.t) + 'px'; ov.appendChild(d); });
      }
    }
    var lab = document.createElement('b'); lab.textContent = 'audit: ' + n + ' overlapping pairs · ' + pairs.slice(0, 6).join(' ; '); ov.appendChild(lab);
    document.body.appendChild(ov); document.title = 'AUDIT ' + n + ' :: ' + pairs.join(' ;; ');
  }
})();
