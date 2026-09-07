<div align="center">

<h1>🌍 &nbsp;Life on Earth Hub</h1>

**The tree of life for Cambridge IGCSE Biology 0610 — topics 1 and 17–21.**

One drop in the middle, where the first cells formed; every kingdom alive today on the rim.
Point at a branch and it lights, with what puts an organism there in the syllabus's words.
Start in the middle and it tells you where you come from.

<br>

[![Open the site](https://img.shields.io/badge/▶_Open_the_site-0969DA?style=for-the-badge&logoColor=white)](https://mompel226.github.io/life-on-earth-hub/)

![IGCSE Biology 0610](https://img.shields.io/badge/IGCSE_Biology-0610-3D7A54)
![No sign-up](https://img.shields.io/badge/students-no_sign--up_needed-6FA287)
![Silhouettes CC0](https://img.shields.io/badge/silhouettes-PhyloPic_CC0-7c4dc0)

by **Dr Daniel Mompel Riera** · NLCS Jeju

</div>

---

## 🧭 Where this sits

This is one **shelf** of the [Biology Hub](https://mompel226.github.io/biology-hub/), the front
door to every Biology app at NLCS Jeju. A student goes front door → this shelf → a lab. The
other shelves are the [Human Body Hub](https://mompel226.github.io/human-body-hub/) (topics 7,
9–16, live) and Foundations and Plants, being built as their own repositories. This one covers
Topic 1, characteristics and classification, and topics 17–21: inheritance, variation and
selection, organisms and their environment, human influences on ecosystems, biotechnology.
The link at the top of the page goes back up.

Behind this shelf: the **Classification Lab** (Topic 1) is live, and a group clicked on the tree opens
it on that group — the hub introduces, the lab teaches. Five more labs are planned. Every lab links back here with one line — `docs/link-back.md` is the recipe.

> [!TIP]
> **Want your students' scores in a spreadsheet of your own?**
> It is set up once, for every lab at the same time, and it is explained in the main hub:
> **[Would you like to see how your students are doing?](https://github.com/Mompel226/biology-hub#-would-you-like-to-see-how-your-students-are-doing)**

## 🧑‍🎓 For your students — there is nothing to set up

> [!TIP]
> **Send them the link and you are done.**
> [mompel226.github.io/life-on-earth-hub](https://mompel226.github.io/life-on-earth-hub/)
>
> No account, no sign-up, no install. It works on a phone, a Chromebook or a school PC.

| # | Topic | Lab | |
|:--:|-------|-----|:--:|
| 1 | Characteristics and classification of living organisms | [Classification Lab](https://mompel226.github.io/classification-lab/) | 🟢 live |
| 17 | Inheritance | Inheritance Lab | ⚪ planned |
| 18 | Variation and selection | Variation & Selection Lab | ⚪ planned |
| 19 | Organisms and their environment | Ecology Lab | ⚪ planned |
| 20 | Human influences on ecosystems | Human Influences Lab | ⚪ planned |
| 21 | Biotechnology and genetic modification | Biotechnology Lab | ⚪ planned |

## 🌳 What is on the map

The tree is the content of Topic 1, drawn as the syllabus lists it and no further: five
kingdoms — animals, plants, fungi, prokaryotes, protoctists; under animals, the vertebrates
(mammals, birds, reptiles, amphibians, fish) and the arthropods (myriapods, insects,
arachnids, crustaceans); under plants, ferns and flowering plants (monocotyledons and
dicotyledons). Viruses float off the tree, with the reason why. Every group carries its
distinguishing features in the exam's words, then reality in a line beneath.

In the middle, five steps tell where you come from — the vent, the building blocks, the bag,
the copier, the first cell — with the exam's words first, the evidence after, and the paper
each step rests on. It follows the alkaline-vent hypothesis and says so; the rival ideas get
their line too.

**Deep links** for projecting in class: `/#mammals`, `/#animals`, `/#story-3`, `/#inheritance`.

## 🛠 How it works

Static files, no build step beyond a cache stamp, no framework. GitHub Pages serves it as it is.

- **`js/topics.js` — the topic register.** The only file you edit when a lab goes live.
- **`js/tree.js` — the tree register.** Groups, features, the story, the credits. Add a group
  and the geometry follows.
- `js/hub.js` draws the tree, lights the route to whatever you point at, flies to it when you
  click, tours by itself, and fills the card.
- `css/hub.css` — the water, the tree, the card, the phone.

Everything else is in [`docs/BUILD-NOTES.md`](docs/BUILD-NOTES.md).

## 🖼 Images and sources

Every silhouette is from [PhyloPic](https://www.phylopic.org), CC0 or public domain, and
credited by name in the colophon on the page. Every group carries a photograph from Wikimedia
Commons, public domain, CC0 or CC BY; the story's pictures are Ifremer's Lost City vent field, three
textbook illustrations and a painting by David Goodsell from the RCSB Protein Data Bank. The
story's sources are on each step of the page and listed, with every licence, in
[`assets/CREDITS.md`](assets/CREDITS.md).

## 🚀 Deploying

```bash
node tools/stamp.mjs
```

That rewrites every `?v=` in `index.html` **and** `version.txt` from one value. Never hand-edit
`version.txt`. Then commit and push; GitHub Pages does the rest. `?audit=1` on the page counts
overlapping labels — it should say 0 at 1440 and 1280 wide before a deploy.
