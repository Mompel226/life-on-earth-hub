# Life on Earth Hub — the shelf

The landing page for topics 1 and 17–21 of Cambridge IGCSE Biology 0610.

The whole page is water: light from the surface, the deep below. The tree of life is a
circle in it — one drop in the middle, where the first cells formed, and every group alive
today on the rim — and a glass card shows whatever you point at. Point at a group and the
route from the middle to that tip lights in its kingdom's colour, the label pins to the
silhouette, and the card shows the group's picture, where it sits, an example and a line of
reality, and the way into the Classification Lab, which teaches what puts an organism there. Point at
a step in the middle and the card tells that part of the story. Point at a lab and the whole
tree lights, with a line on the outer ripple. Click, and the view flies to the branch. Left
alone, the tree walks itself.

**Live:** https://nlcsbiology.com/life-on-earth-hub/

The other shelves look different on purpose — the human body hub is a specimen on a slab,
this one is a map on water. They share only the type, the ink and the register pattern.

---

## Adding a lab

In this repository, edit **`js/topics.js`**: give the topic a `url` and set `status: 'live'`.
The real entry for the Classification Lab:

```js
{ id:'classification', no:1,  year:'Y9',  side:'l', sys:'tree', anchor:null,
  title:'Characteristics and classification of living organisms', lab:'Classification Lab',
  ring:'1 · Classification · the whole tree', groups:true,
  blurb:'…', detail:'10 stations · 64 questions',
  status:'live', url:'https://nlcsbiology.com/classification-lab/' },
```

`detail` is only a fallback: the size shown comes from the register (`js/data/labs.js`), and
`tools/status.mjs` fails if the two disagree. Outside this repository a new lab also needs its row
in `labs-shared/labs.json` (the lab's own build writes its counts), its entry on the front door
(biology-hub `js/shelves.js`), a row in the labs script's `LABS` and a sitemap entry; then
`node tools/stamp.mjs` here.

- `sys` is what the lab lights on the tree: `'tree'` for every branch, or a group id from
  `js/tree.js` (`'animals'`, `'insects'` …) for a lab about one group.
- `ring` is the line written round the outer ripple while the lab is pointed at.
- `anchor` and `side` exist so the shape matches the body hub's register; leave them.
- `groups: true` goes on the lab about the groups themselves (hub.js `GROUP_LAB`): every
  group's card offers its button.

A live lab appears in the card under **Open now** as a card with an "Open the lab" button;
anything else sits under **Being built**, with its status pill and nothing about order.

## Adding or changing a group

`js/tree.js` here is a COPY: edit **`labs-shared/tree/tree.js`**, then run
`node tools/sync-shared.mjs` here (it copies tree.js, tree-draw.js and the silhouettes in, and
re-inlines them) and rebuild the Classification Lab, which uses the same tree. The groups sit in
the order they go round the rim; `parent` says which branch they hang off, `kind` says whether
they end in a silhouette (`tip`), fan out again (`group`) or are a kingdom. The geometry — angles,
rings, arcs — is worked out by `js/tree-draw.js` (shared too) from that list, so a new tip simply
takes its share of the rim.

A group's photograph is its `img` record: `assets/photos/<id>-900` and `-1400`, JPEG and WebP, centre-cropped
to 3 : 2, with alt, caption, credit and the Commons page; only public domain, CC0 or CC BY, and a row in
`assets/CREDITS.md`. A new silhouette goes in `labs-shared/tree/silhouettes/<id>.svg` (the vector file
PhyloPic serves), gets a row in `labs-shared/tree/silhouettes/manifest.json` and in `assets/CREDITS.md`,
and a `sil` record on its group. Then:

```
node tools/sync-shared.mjs
```

which copies them into `assets/silhouettes/` and runs `tools/inline-silhouettes.py`, which rewrites
the block between the `SILHOUETTES` markers in `index.html`. Only CC0 or
public-domain silhouettes; the credit goes in the colophon by itself, from the register.

## The story

`story` in the tree register (`labs-shared/tree/tree.js`): five steps, each with the exam words first (`text`), reality after
(`real`), the Topic 4 molecule it leads to (`chip`), a picture (`img`: a photograph or one of
David Goodsell's paintings from the RCSB PDB, CC BY 4.0, cropped to the card's shape at 900 and
1400 px) and the papers it rests on (`reads`). Real pictures, not drawings: the Berkeley diagram
the class uses is copyright UCMP and AAAS, for classrooms only, so it is not here.

## Files

```
index.html                  the page; silhouettes inlined between the SILHOUETTES markers
css/hub.css                 the water, the tree, the card, the phone
js/topics.js                the topic register (see Adding a lab)
js/tree.js                  COPY of labs-shared/tree/tree.js: groups, features, story, credits
js/tree-draw.js             COPY of labs-shared/tree/tree-draw.js: works out the geometry, draws the tree
js/hub.js                   wires it: lights the route, flies, tours, the card, deep links, the audit
js/progress.js              GENERATED by tools/stamp.mjs: a copy of labs-shared/progress.js
js/data/labs.js, .json      GENERATED by tools/stamp.mjs from labs-shared/labs.json
assets/silhouettes/         COPIES of labs-shared/tree/silhouettes/: the PhyloPic vectors + manifest.json
assets/photos/              every group's and every story step's photograph, 900 and 1400 px, JPEG and
                            WebP, plus the book cover
assets/CREDITS.md           every image and every source, with licences
tools/stamp.mjs             the deploy step: rewrites every ?v= and version.txt from one value
tools/inline-silhouettes.py re-inlines the silhouettes into index.html
tools/sync-shared.mjs       copies the tree and the silhouettes in from labs-shared/tree/, then re-inlines
docs/link-back.md           the line a lab adds to point back here
.nojekyll                   stops GitHub Pages running the files through Jekyll
```

## Deploying, and proving it

```
node tools/stamp.mjs        # then commit and push
```

`version.txt` on its own is a lie: the `?v=` stamps are the real cache key, and the stamp
tool writes both from one value. After pushing, wait for the Pages build whose `.commit` is
your `HEAD` **and** whose status is `built`, then fetch the live page with `?cb=<stamp>` and
check the served `?v=` against `version.txt`. A status word is not a version.

**`?audit=1`** on the page draws a red box round any two things that overlap and writes the
count in the title. Render it headless at 1440×900 and 1280×720 before every deploy; the
count must read 0. Curved words on different rings are excluded, since their boxes overlap
while the words do not.

## Deep links

`/#mammals`, `/#animals`, `/#story-3`, `/#inheritance` — the page opens on that group, step
or lab, holds it and flies to it, for projecting a prepared state in class. Escape, the
"Whole tree" button or a click on the water lets go.
