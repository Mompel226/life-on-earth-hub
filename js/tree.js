/* ============================================================
   Life on Earth Hub — the tree register
   ------------------------------------------------------------
   The tree is the content of Topic 1, so drawing it teaches it.
   Everything the map shows comes from here: the groups and their
   features in the syllabus's words, the story of the first cells,
   and the credit for every silhouette.

   groups   in the order they sit round the rim. Each one:
     id        unique key
     kind      "kingdom" | "group" | "tip"  — only tips carry a silhouette
     parent    "root" for a kingdom, otherwise the id of the branch above
     label     what the student reads
     ring      a name written along the ring, for branches that fan out again
     shift     nudge that ring label along the ring, in degrees (optional)
     feats     what puts an organism here — the exam's words, one per line
     eg        examples
     real      the reality after the exam answer, if it differs (optional)
     sil       the silhouette: file in assets/silhouettes/, the organism, who drew it, licence, page
   viruses  off the tree, on purpose
   story    the five steps from the vent to the first cell
   photo    the one photograph
   ============================================================ */
window.TREE = {

  groups: [
    /* ---- Animals ---- */
    { id:'animals', kind:'kingdom', parent:'root', label:'Animals', ring:'Animals',
      feats:['Many cells, each with a nucleus and no cell wall.',
             'Feed on other organisms.',
             'Most move from place to place, and have nerves.'],
      eg:'everything on the two branches above, and also snails, worms, starfish and jellyfish',
      real:'Animals and fungi are closer to each other than either is to plants. The syllabus asks only about vertebrates and arthropods, but a snail is just as much an animal.' },

    { id:'vertebrates', kind:'group', parent:'animals', label:'Vertebrates', ring:'Vertebrates',
      feats:['A backbone, and an internal skeleton of bone or cartilage.'],
      eg:'mammals, birds, reptiles, amphibians, fish' },

    { id:'mammals', kind:'tip', parent:'vertebrates', label:'Mammals',
      feats:['Hair or fur.', 'Lungs.', 'Internal fertilisation; young born live and fed on milk.', 'Constant body temperature.'],
      eg:'elephant, dolphin, bat, human',
      real:'A few lay eggs: the platypus and the echidnas.',
      sil:{ file:'mammals', name:'Elephas maximus, Asian elephant', by:'Andy Wilson', licence:'CC0 1.0', url:'https://www.phylopic.org/images/db278f3b-d8c1-47e9-afce-0478980f5875' } },

    { id:'birds', kind:'tip', parent:'vertebrates', label:'Birds',
      feats:['Feathers; the front limbs are wings.', 'A beak, no teeth.', 'Lungs.', 'Hard-shelled eggs.', 'Constant body temperature.'],
      eg:'pigeon, eagle, penguin, ostrich',
      sil:{ file:'birds', name:'Columba livia, rock pigeon', by:'Andy Wilson', licence:'CC0 1.0', url:'https://www.phylopic.org/images/cbe76bdb-5a89-4577-8472-6af7c2052d70' } },

    { id:'reptiles', kind:'tip', parent:'vertebrates', label:'Reptiles',
      feats:['Dry scales.', 'Lungs.', 'Internal fertilisation; eggs with a leathery, waterproof shell, laid on land.', 'Body temperature follows the surroundings.'],
      eg:'lizard, snake, tortoise, crocodile',
      sil:{ file:'reptiles', name:'Iguana iguana, green iguana', by:'Jack Mayer Wood', licence:'CC0 1.0', url:'https://www.phylopic.org/images/5dec03d9-66a2-4033-b1a9-6dbb3485199f' } },

    { id:'amphibians', kind:'tip', parent:'vertebrates', label:'Amphibians',
      feats:['Smooth, moist skin.', 'Lungs on land; the skin, and gills when young, in water.', 'External fertilisation; soft eggs laid in water.', 'Body temperature follows the surroundings.'],
      eg:'frog, toad, newt',
      sil:{ file:'amphibians', name:'Rana temporaria, common frog', by:'Beth Reinke', licence:'CC0 1.0', url:'https://www.phylopic.org/images/e73c5c1c-7727-4687-bf0b-3957343edfc3' } },

    { id:'fish', kind:'tip', parent:'vertebrates', label:'Fish',
      feats:['Wet scales; fins.', 'Gills.', 'External fertilisation; soft eggs laid in water.', 'A lateral line that senses movement in the water.'],
      eg:'perch, salmon, shark, goldfish',
      sil:{ file:'fish', name:'Perca fluviatilis, perch', by:'Ando', licence:'Public Domain Mark 1.0', url:'https://www.phylopic.org/images/bbc78f09-18e1-4e4d-9e77-c6f9daee33c1' } },

    { id:'arthropods', kind:'group', parent:'animals', label:'Arthropods', ring:'Arthropods',
      feats:['Jointed legs.', 'A body in segments.', 'A hard outer skeleton, the exoskeleton.'],
      eg:'myriapods, insects, arachnids, crustaceans' },

    { id:'myriapods', kind:'tip', parent:'arthropods', label:'Myriapods',
      feats:['Many segments, each with jointed legs.', 'One pair of legs on each segment in centipedes; two pairs in millipedes.', 'One pair of antennae.', 'No wings.'],
      eg:'centipede, millipede',
      sil:{ file:'myriapods', name:'Lithobius forficatus, brown centipede', by:'Tatiana Miroliubova', licence:'CC0 1.0', url:'https://www.phylopic.org/images/b09c0ec3-c56f-4ab9-a4e2-6b36e53f86d8' } },

    { id:'insects', kind:'tip', parent:'arthropods', label:'Insects',
      feats:['Three body parts: head, thorax, abdomen.', 'Three pairs of legs; usually two pairs of wings.', 'One pair of antennae.', 'Compound eyes.'],
      eg:'bee, butterfly, ant, beetle',
      sil:{ file:'insects', name:'Apis mellifera, honeybee', by:'Lubna Maherally', licence:'CC0 1.0', url:'https://www.phylopic.org/images/f551f54e-1e17-4b0e-985c-74d34a53cb63' } },

    { id:'arachnids', kind:'tip', parent:'arthropods', label:'Arachnids',
      feats:['Two body parts: cephalothorax and abdomen.', 'Four pairs of legs.', 'No antennae; no wings.', 'Simple eyes.'],
      eg:'spider, scorpion, tick',
      sil:{ file:'arachnids', name:'Araneus diadematus, garden spider', by:'Amy Beauvois', licence:'CC0 1.0', url:'https://www.phylopic.org/images/2f7145fc-002c-40e8-9b35-16f95b05f0e3' } },

    { id:'crustaceans', kind:'tip', parent:'arthropods', label:'Crustaceans',
      feats:['Two body parts.', 'More than four pairs of legs.', 'Two pairs of antennae.', 'Gills; most live in water.'],
      eg:'crab, lobster, shrimp, woodlouse',
      sil:{ file:'crustaceans', name:'Carcinus maenas, shore crab', by:'Caleb M. Gordon', licence:'CC0 1.0', url:'https://www.phylopic.org/images/a34e9df9-d549-4ba2-a648-7785a84206e5' } },

    /* ---- Plants ---- */
    { id:'plants', kind:'kingdom', parent:'root', label:'Plants', ring:'Plants', shift:-8,
      feats:['Many cells, each with a nucleus, a cell wall made of cellulose, and chloroplasts.',
             'Make their own food by photosynthesis.',
             'Stay in one place.'],
      eg:'ferns and flowering plants, and also mosses and conifers',
      real:'Mosses and conifers are plants too; the syllabus names only ferns and flowering plants.' },

    { id:'ferns', kind:'tip', parent:'plants', label:'Ferns',
      feats:['Leaves called fronds.', 'No flowers; reproduce by spores, made on the underside of the fronds.', 'Xylem and phloem.'],
      eg:'bracken, male fern, tree ferns',
      sil:{ file:'ferns', name:'Polypodium vulgare, common polypody', by:'Guillaume Dera', licence:'CC0 1.0', url:'https://www.phylopic.org/images/ee243ea1-c311-4fa2-b730-928b80117515' } },

    { id:'flowering', kind:'group', parent:'plants', label:'Flowering plants', ring:'Flowering plants', shift:6,
      feats:['Reproduce by flowers; the seeds form inside an ovary.'],
      eg:'monocotyledons and dicotyledons' },

    { id:'monocots', kind:'tip', parent:'flowering', label:'Monocotyledons',
      feats:['One cotyledon in the seed.', 'Long, strap-like leaves with parallel veins.', 'Flower parts in threes.'],
      eg:'rice, maize, grasses, lilies, orchids',
      sil:{ file:'monocots', name:'Oryza sativa, rice', by:'Mason McNair', licence:'CC0 1.0', url:'https://www.phylopic.org/images/bdae8ff7-6c00-4af9-8464-a44b3e6c65f9' } },

    { id:'dicots', kind:'tip', parent:'flowering', label:'Dicotyledons',
      feats:['Two cotyledons in the seed.', 'Broad leaves with a network of veins.', 'Flower parts in fours or fives.'],
      eg:'sunflower, bean, rose, most trees',
      sil:{ file:'dicots', name:'Helianthus annuus, sunflower', by:'Mason McNair', licence:'CC0 1.0', url:'https://www.phylopic.org/images/40b91c6c-4ef8-4a5a-9b90-85fb50d74c5b' } },

    /* ---- the three kingdoms that are one branch each ---- */
    { id:'fungi', kind:'tip', parent:'root', label:'Fungi',
      feats:['A nucleus; a cell wall not made of cellulose.', 'No chloroplasts, so no photosynthesis.',
             'Feed by digesting food outside the body with enzymes and absorbing it: saprophytes or parasites.',
             'Most are threads called hyphae; yeast is a single cell.'],
      eg:'mushroom, mould, yeast',
      real:'The wall is made of chitin, the same material as an insect skeleton.',
      sil:{ file:'fungi', name:'Amanita muscaria, fly agaric', by:'Mason McNair', licence:'CC0 1.0', url:'https://www.phylopic.org/images/237a0fb1-7b73-43ec-b0a5-eff95e7237df' } },

    { id:'protoctists', kind:'tip', parent:'root', label:'Protoctists',
      feats:['One cell, or a few; a nucleus.', 'Some have chloroplasts and feed like plants: the algae.', 'Some feed like animals: Amoeba.'],
      eg:'Amoeba, Paramecium, Plasmodium, seaweeds',
      real:'Everything with a nucleus that is not a plant, an animal or a fungus. It is a drawer for what is left over, not one family.',
      sil:{ file:'protoctists', name:'Amoeba proteus', by:'Carlo De Rito', licence:'CC0 1.0', url:'https://www.phylopic.org/images/4227f7b5-b1e5-4af6-99cc-af68795f5855' } },

    { id:'prokaryotes', kind:'tip', parent:'root', label:'Prokaryotes',
      feats:['One cell; no nucleus.', 'The DNA lies free in the cytoplasm as a circle, often with plasmids.', 'A cell wall not made of cellulose.', 'No mitochondria.'],
      eg:'Escherichia coli, Salmonella, the cyanobacteria',
      real:'Bacteria, and the archaea, which look like bacteria but are a separate line as old as they are. The branch nearest the middle: the first cells were prokaryotes.',
      sil:{ file:'prokaryotes', name:'Escherichia coli', by:'Arcadia Science', licence:'CC0 1.0', url:'https://www.phylopic.org/images/27d35deb-98bb-4833-8121-8750f35cd09b' } }
  ],

  /* off the tree, on purpose */
  viruses: { id:'viruses', kind:'tip', label:'Viruses', sub:'not on the tree', path:'In no kingdom', angle:344, r:190,
    feats:['A protein coat around genetic material, DNA or RNA.', 'No cell.', 'Reproduce only inside a host cell.'],
    eg:'influenza, HIV, the tobacco mosaic virus',
    real:'On their own they show none of the seven characteristics, so they are not counted as living. That is why they float here, off the tree.',
    sil:{ file:'viruses', name:'Influenza A virus', by:'Ian Shin', licence:'CC0 1.0', url:'https://www.phylopic.org/images/3813d3bb-8bad-469c-99b6-fcea358b1d49' } },

  /* the five steps from the vent to the first cell. Exam words first, reality after. */
  story: [
    { n:1, title:'The vent', chip:'Water · the medium for life',
      icon:'<path d="M-5 8 L-2 -7 L2 -7 L5 8 Z"/><path d="M0 -9 c0 -3 2 -4 2 -7 M-3 -10 c0 -2 1 -3 1 -5"/>',
      text:'Four billion years ago the sea floor leaks warm water through rock full of tiny holes. It is warm, not boiling; alkaline, not acidic; and full of hydrogen. Nothing is alive yet.',
      real:'Lost City, in the Atlantic, is the living example: white chimneys 800 metres down, still venting today.',
      fig:'photo',
      reads:[ { t:'Lost City, the vent field itself', url:'https://en.wikipedia.org/wiki/Lost_City_Hydrothermal_Field' },
              { t:'The hydrothermal vent hypothesis, Understanding Evolution', url:'https://evolution.berkeley.edu/the-origin-of-life/the-hydrothermal-vent-hypothesis/' } ] },

    { n:2, title:'The building blocks', chip:'Amino acids, sugars, fatty acids · Topic 4',
      icon:'<circle cx="-5" cy="3" r="3"/><circle cx="5" cy="3" r="3"/><circle cx="0" cy="-5" r="3"/><path d="M-3 1 L-1 -3 M3 1 L1 -3"/>',
      text:'Carbon dioxide in the seawater meets hydrogen from the rock. Metal minerals in the walls speed the reaction, the job enzymes do in you. Small carbon molecules form: the pieces of the carbohydrates, fats and proteins you meet in Topic 4.',
      real:'In 2025 a laboratory made the first of these molecules from CO₂ and H₂ on iron–sulfur minerals, with no enzymes at all.',
      fig:'<svg viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono,monospace" font-size="9" fill="#9FB6C4"><rect width="320" height="130" fill="#071A24"/><g fill="#5B6E76" stroke="#8FA3AB" stroke-width="1"><path d="M40 70 l18 -10 l18 10 l-18 10z"/><path d="M58 60 v20 l18 10 v-20z" fill="#485A62"/><path d="M40 70 v20 l18 10 v-20z" fill="#3D4E56"/></g><text x="30" y="114">metal mineral · a catalyst</text><g fill="none" stroke="#8AD8FF" stroke-width="1.4"><circle cx="150" cy="36" r="6"/><circle cx="138" cy="36" r="4"/><circle cx="162" cy="36" r="4"/></g><text x="136" y="58" fill="#8AD8FF">CO₂</text><g fill="none" stroke="#F6C77A" stroke-width="1.4"><circle cx="150" cy="86" r="4"/><circle cx="160" cy="86" r="4"/></g><text x="146" y="106" fill="#F6C77A">H₂</text><path d="M178 60 h36" stroke="#DCEAF0" stroke-width="1.2"/><path d="M212 56 l6 4 l-6 4" fill="none" stroke="#DCEAF0" stroke-width="1.2"/><g fill="none" stroke="#FFD48A" stroke-width="1.4"><path d="M236 44 l10 -6 l10 6 l-10 6z"/><path d="M262 70 l8 -8 l8 8"/><path d="M234 84 h28"/><circle cx="292" cy="56" r="5"/></g><text x="216" y="114" fill="#FFD48A">small carbon molecules</text></svg>',
      reads:[ { t:'CO₂ to formate and acetate on iron–sulfur minerals, 2025', url:'https://phys.org/news/2025-10-underwater-thermal-vents-molecular-precursors.html' } ] },

    { n:3, title:'The bag', chip:'Fats · Topic 4',
      icon:'<circle cx="0" cy="0" r="8"/><circle cx="0" cy="0" r="4.5" stroke-dasharray="1.6 1.6"/>',
      text:'A fatty acid has a head that likes water and a tail that does not. In water they line up and close into a bubble. That bubble is a membrane, and inside it chemistry stays together.',
      real:'Shown in the laboratory in hot, alkaline, salty water in 2019. The membranes in every cell today use the same trick, with two tails on each molecule.',
      fig:'<svg viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono,monospace" font-size="9" fill="#9FB6C4"><rect width="320" height="130" fill="#071A24"/><g id="fa"><circle cx="0" cy="0" r="4" fill="#8AD8FF"/><path d="M0 4 q3 6 0 12 q-3 6 0 12" stroke="#F6C77A" stroke-width="1.6" fill="none"/></g><use href="#fa" x="34" y="30"/><use href="#fa" x="52" y="30"/><use href="#fa" x="70" y="30"/><text x="24" y="86">head · tail</text><g transform="translate(220 64)"><circle r="42" fill="none" stroke="#F6C77A" stroke-width="1" opacity=".5"/><g fill="#8AD8FF"><circle cx="0" cy="-44" r="3"/><circle cx="31" cy="-31" r="3"/><circle cx="44" cy="0" r="3"/><circle cx="31" cy="31" r="3"/><circle cx="0" cy="44" r="3"/><circle cx="-31" cy="31" r="3"/><circle cx="-44" cy="0" r="3"/><circle cx="-31" cy="-31" r="3"/><circle cx="0" cy="-24" r="3"/><circle cx="17" cy="-17" r="3"/><circle cx="24" cy="0" r="3"/><circle cx="17" cy="17" r="3"/><circle cx="0" cy="24" r="3"/><circle cx="-17" cy="17" r="3"/><circle cx="-24" cy="0" r="3"/><circle cx="-17" cy="-17" r="3"/></g><circle r="34" fill="none" stroke="#F6C77A" stroke-width="7" opacity=".55"/><text x="-30" y="4" fill="#FFD48A">chemistry in</text></g><text x="150" y="122">a membrane closes into a bubble</text></svg>',
      reads:[ { t:'Vesicles form under vent conditions, Jordan et al. 2019', url:'https://www.nature.com/articles/s41559-019-1015-y' } ] },

    { n:4, title:'The copier', chip:'DNA · Topic 4, Supplement',
      icon:'<path d="M-8 -6 C -4 -6, -4 6, 0 6 S 4 -6, 8 -6"/><path d="M-8 6 C -4 6, -4 -6, 0 -6 S 4 6, 8 6"/>',
      text:'Something has to copy itself. The best candidate is RNA, which both stores information and speeds up reactions. Later DNA takes over the storing: two strands, A with T and C with G, the same code in every living thing.',
      real:'Nobody has yet made an RNA that copies itself unaided. The closest, published in 2026, copies its partner strand and then itself in two separate steps.',
      fig:'<svg viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono,monospace" font-size="9" fill="#9FB6C4"><rect width="320" height="130" fill="#071A24"/><path d="M20 40 C 50 20, 70 60, 100 40 S 150 20, 180 40" fill="none" stroke="#FFD48A" stroke-width="2"/><g stroke="#8AD8FF" stroke-width="2"><path d="M40 33 v-14 M70 46 v14 M100 40 v-14 M130 32 v-14 M160 44 v14"/></g><text x="20" y="80" fill="#FFD48A">RNA · one strand · copies itself</text><g transform="translate(210 0)"><path d="M10 100 C 30 80, 50 120, 70 100 S 110 80, 100 100" fill="none" stroke="#DCEAF0" stroke-width="1.6"/><path d="M10 120 C 30 140, 50 100, 70 120 S 110 140, 100 120" fill="none" stroke="#DCEAF0" stroke-width="1.6"/><g stroke="#8EE6A2" stroke-width="1.6"><path d="M25 96 v24 M40 90 v40 M55 100 v20 M70 100 v20 M85 92 v36"/></g></g><text x="216" y="70" fill="#DCEAF0">DNA · two strands</text><text x="216" y="82" fill="#8EE6A2">A–T · C–G</text></svg>',
      reads:[ { t:'A ribozyme that copies and evolves, Salk Institute 2024', url:'https://www.salk.edu/news-release/modeling-the-origins-of-life-new-evidence-for-an-rna-world/' },
              { t:'QT45, the closest yet to self-copying RNA, 2026', url:'https://www.sciencealert.com/this-rna-almost-self-replicates-which-could-explain-lifes-origins' } ] },

    { n:5, title:'The first cell', chip:'The seven characteristics · 1.1',
      icon:'<circle cx="0" cy="0" r="8"/><path d="M-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0"/><circle cx="-4.5" cy="-3" r=".9" fill="currentColor"/><circle cx="4" cy="3.5" r=".9" fill="currentColor"/>',
      text:'Every living thing descends from one population of cells, LUCA, about 4.2 billion years ago. It lived on hydrogen and carbon dioxide, with DNA, proteins and a membrane. It fed, respired, grew, reproduced, excreted and responded: alive by the seven tests of 1.1.',
      real:'This is the leading idea, not a fact. Others start life in hot springs on land, or in sprays of sea water. Everyone agrees on this much: life began in water, chemistry came before cells, and every organism shares the DNA code. That shared code is why differences in DNA show how closely two groups are related, which is what the branches of this tree mean.',
      fig:'<svg viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg" font-family="IBM Plex Mono,monospace" font-size="9" fill="#9FB6C4"><rect width="320" height="130" fill="#071A24"/><g transform="translate(90 65)"><ellipse rx="64" ry="42" fill="#0E2A36" stroke="#FFD48A" stroke-width="3" opacity=".9"/><path d="M-30 -6 c10 -18 40 -14 44 4 c4 16 -20 26 -38 12 c-10 -8 -12 -10 -6 -16z" fill="none" stroke="#8EE6A2" stroke-width="1.6"/><g fill="#8AD8FF"><circle cx="30" cy="-20" r="2"/><circle cx="-40" cy="14" r="2"/><circle cx="20" cy="24" r="2"/><circle cx="-14" cy="-26" r="2"/></g><g stroke="#DCEAF0" stroke-width="1.2" fill="none"><path d="M64 0 c14 -4 24 4 34 0"/><path d="M-64 6 c-14 4 -24 -4 -34 0"/></g></g><text x="168" y="40" fill="#FFD48A">LUCA · about 4.2 billion years ago</text><text x="168" y="56">a membrane · DNA · proteins</text><text x="168" y="72">lives on H₂ and CO₂</text><text x="168" y="96" fill="#8EE6A2">feeds · respires · grows</text><text x="168" y="108" fill="#8EE6A2">reproduces · excretes · responds</text></svg>',
      reads:[ { t:'LUCA at 4.2 billion years, Moody et al. 2024', url:'https://www.nature.com/articles/s41559-024-02474-w' },
              { t:'The case for hot springs on land, 2026', url:'https://news.ucsc.edu/2026/05/special-issue-of-astrobiology/' },
              { t:'Sparks in water sprays, Stanford 2025', url:'https://news.stanford.edu/stories/2025/03/microlightning-in-water-droplets-may-have-sparked-life-on-earth' } ] }
  ],

  /* the one photograph, on step 1 */
  photo: { base:'assets/photos/lost-city', alt:'White carbonate chimneys of the Lost City vent field, lit by a submersible in the dark',
           credit:'Lost City vent field, 750–900 m down · Ifremer, ROV Victor 6000, 2005 · CC BY 4.0',
           url:'https://commons.wikimedia.org/wiki/File:Massif_de_chemin%C3%A9es_carbonat%C3%A9es_(Ifremer_00569-68094_-_25275).jpg' }
};
