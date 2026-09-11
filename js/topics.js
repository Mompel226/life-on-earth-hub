/* ============================================================
   Life on Earth Hub — the topic register
   ------------------------------------------------------------
   THIS IS THE ONLY FILE YOU EDIT WHEN A NEW LAB IS FINISHED.
   Give the topic a `url`, change `status` to "live", done.

   id      unique key
   no      Cambridge 0610 topic number, as taught here
   year    year group
   title   syllabus topic name
   lab     name of the app that covers it
   sys     what it lights on the tree: "tree" (every branch) or a group id from js/tree.js
   anchor  unused here — the body hub points at an organ; the tree has no one place. Keep null.
   side    unused here, kept so the shape matches the body hub's register
   ring    the words that appear on the outer ripple while the lab is pointed at
   groups  true on a lab that is about the groups themselves — it is named on every group's card
   blurb   one or two sentences, in plain words
   detail  ONLY A FALLBACK. The stations/questions line is read from the register
           (js/data/labs.js, generated from labs-shared/labs.json) and matched to this
           topic by its url, so it follows the lab when the lab grows. This string is
           used only if that register fails to load. Keep it right anyway —
           `node tools/status.mjs` fails if it disagrees with the register.
   status  "live" | "build" | "planned"
   url     the published lab, or null
   ============================================================ */
window.TOPICS = [
  { id:'classification', no:1,  year:'Y9',  side:'l', sys:'tree', anchor:null,
    title:'Characteristics and classification of living organisms', lab:'Classification Lab',
    ring:'1 · Classification · the whole tree', groups:true,
    blurb:'The seven things every living organism does, the five kingdoms and the groups inside them, and how to make a key that names an organism from what you can see.',
    detail:'10 stations · 64 questions',
    status:'live', url:'https://mompel226.github.io/classification-lab/' },

  { id:'inheritance',   no:17, year:'Y11', side:'l', sys:'tree', anchor:null,
    title:'Inheritance',            lab:'Inheritance Lab',
    ring:'17 · Inheritance · every branch',
    blurb:'Chromosomes, genes and DNA; how a cell divides; and how a cross between two parents tells you what their offspring will be.',
    status:'planned', url:null },

  { id:'variation',     no:18, year:'Y11', side:'l', sys:'tree', anchor:null,
    title:'Variation and selection', lab:'Variation & Selection Lab',
    ring:'18 · Variation and selection · every branch',
    blurb:'Why no two organisms are the same, how natural selection turns variation into adaptation, and how breeders use the same rule on crops and animals.',
    status:'planned', url:null },

  { id:'ecology',       no:19, year:'Y11', side:'r', sys:'tree', anchor:null,
    title:'Organisms and their environment', lab:'Ecology Lab',
    ring:'19 · Organisms and their environment · every branch',
    blurb:'Food chains and webs, how energy passes along them and is lost, the carbon and nitrogen cycles, and why a population grows and then stops.',
    status:'planned', url:null },

  { id:'human-influence', no:20, year:'Y11', side:'r', sys:'tree', anchor:null,
    title:'Human influences on ecosystems', lab:'Human Influences Lab',
    ring:'20 · Human influences · every branch',
    blurb:'Feeding eight billion people, habitat destruction, pollution, and what conservation can still save.',
    status:'planned', url:null },

  { id:'biotech',       no:21, year:'Y11', side:'r', sys:'tree', anchor:null,
    title:'Biotechnology and genetic modification', lab:'Biotechnology Lab',
    ring:'21 · Biotechnology · every branch',
    blurb:'Bacteria and yeast put to work, enzymes in industry, and what it means to move a gene from one organism into another.',
    status:'planned', url:null }
];
