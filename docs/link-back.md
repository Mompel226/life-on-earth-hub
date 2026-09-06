# Linking a lab back to this shelf

The hub links **out** to every live lab on its own — that comes from `url` in
`js/topics.js` and needs nothing at the lab's end.

For a lab behind this shelf to link **back**, add one line to that lab's `index.html`,
inside `.hdr__stats` and before the "How to use" button. It reuses the Digestion Lab's
existing `.hbtn` class, so no CSS changes are needed:

```html
<a class="hbtn" href="https://mompel226.github.io/life-on-earth-hub/"
   title="Life on Earth: the tree of life, and the labs for topics 1 and 17–21">← Life on Earth</a>
```

And in the footer line, where the Digestion Lab says "One of the Biology Labs", point the
words at this shelf and at the front door:

```html
One of the <a href="https://mompel226.github.io/life-on-earth-hub/">Life on Earth</a> labs ·
<a href="https://mompel226.github.io/biology-hub/">Biology Hub</a>
```

The first lab to do this is the **Classification Lab** (Topic 1). This page is the recipe
for it and for every lab after it.

Remember the two rules the lab repositories run on: bump `version.txt` and the
`?v=` stamps in the same commit (`node tools/build.mjs`), and never copy
`stations.master.js` into the repo.

## Why this is written down rather than applied from here

Each lab is a separate repository, often with its own session working on it. Two
agents committing to one repo at the same time is how you get a rejected push
that looks like a permissions failure. So the change is written down here, and
made from whichever session owns that lab.
