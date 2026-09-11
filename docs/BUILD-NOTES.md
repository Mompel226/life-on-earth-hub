# Life on Earth Hub — the shelf

The landing page for topics 1 and 17–21 of Cambridge IGCSE Biology 0610.

The whole page is water: light from the surface, the deep below. The tree of life is a
circle in it — one drop in the middle, where the first cells formed, and every group alive
today on the rim — and a glass card shows whatever you point at. Point at a group and the
route from the middle to that tip lights in its kingdom's colour, the label pins to the
silhouette, and the card gives what puts an organism there in the syllabus's words. Point at
a step in the middle and the card tells that part of the story. Point at a lab and the whole
tree lights, with a line on the outer ripple. Click, and the view flies to the branch. Left
alone, the tree walks itself.

**Live:** https://nlcsbiology.com/life-on-earth-hub/

The other shelves look different on purpose — the human body hub is a specimen on a slab,
this one is a map on water. They share only the type, the ink and the register pattern.

---

## Adding a lab

Edit **`js/topics.js`**. Nothing else. Give the topic a `url` and set `status: 'live'`:

```js
{ id:'classification', no:1, year:'Y9', side:'l', sys:'tree', anchor:null,
  title:'Characteristics and classification of living organisms', lab:'Classification Lab',
  ring:'1 · Classification · the whole tree',
  blurb:'…', detail:'12 stations · 90 questions',
  status:'live', url:'https://nlcsbiology.com/classification-lab/' },
```

- `sys` is what the lab lights on the tree: `'tree'` for every branch, or a group id from
  `js/tree.js` (`'animals'`, `'insects'` …) for a lab about one group.
- `ring` is the line written round the outer ripple while the lab is pointed at.
- `anchor` and `side` exist so the shape matches the body hub's register; leave them.

A live lab appears in the card under **Open now** as a card with an "Open the lab" button;
anything else sits under **Being built**, with its status pill and nothing about order.

## Adding or changing a group

Edit **`js/tree.js`**. The groups sit in the order they go round the rim; `parent` says which
branch they hang off, `kind` says whether they end in a silhouette (`tip`), fan out again
(`group`) or are a kingdom. The geometry — angles, rings, arcs — is worked out by `js/hub.js`
from that list, so a new tip simply takes its share of the rim.

A group's photograph is its `img` record: `assets/photos/<id>-900` and `-1400`, JPEG and WebP, centre-cropped
to 3 : 2, with alt, caption, credit and the Commons page; only public domain, CC0 or CC BY, and a row in
`assets/CREDITS.md`. A new silhouette goes in `assets/silhouettes/<id>.svg` (the vector file PhyloPic serves),
gets a row in `assets/silhouettes/manifest.json` and in `assets/CREDITS.md`, and a `sil`
record on its group. Then:

```
python3 tools/inline-silhouettes.py
```

which rewrites the block between the `SILHOUETTES` markers in `index.html`. Only CC0 or
public-domain silhouettes; the credit goes in the colophon by itself, from the register.

## The story

`story` in `js/tree.js`: five steps, each with the exam words first (`text`), reality after
(`real`), the Topic 4 molecule it leads to (`chip`), a picture (`img`: a photograph or one of
David Goodsell's paintings from the RCSB PDB, CC BY 4.0, cropped to the card's shape at 900 and
1400 px) and the papers it rests on (`reads`). Real pictures, not drawings: the Berkeley diagram
the class uses is copyright UCMP and AAAS, for classrooms only, so it is not here.

## Files

```
index.html                  the page; silhouettes inlined between the SILHOUETTES markers
css/hub.css                 the water, the tree, the card, the phone
js/topics.js                THE TOPIC REGISTER — the file you edit when a lab opens
js/tree.js                  the tree register: groups, features, story, credits
js/hub.js                   draws the tree, lights it, flies, tours, the card, the audit
assets/silhouettes/         the sixteen PhyloPic vectors + manifest.json
assets/photos/              the five story pictures, 900 and 1400 px, JPEG and WebP
assets/CREDITS.md           every image and every source, with licences
tools/stamp.mjs             the deploy step: rewrites every ?v= and version.txt from one value
tools/inline-silhouettes.py re-inlines the silhouettes into index.html
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
