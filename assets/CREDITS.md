# Where every image came from, and what the story rests on

Every silhouette is from [PhyloPic](https://www.phylopic.org) and is either **CC0** (no rights
reserved) or carries the **Public Domain Mark**. They are credited by contributor in the
colophon on the page, from `js/tree.js`, and here. The files in `silhouettes/` are the vector
files PhyloPic serves, untouched; `tools/inline-silhouettes.py` inlines them into `index.html`.

## Silhouettes

| Group | File | Organism | Contributor | Licence | PhyloPic |
|---|---|---|---|---|---|
| Prokaryotes | `prokaryotes.svg` | *Escherichia coli* | Arcadia Science | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [27d35deb](https://www.phylopic.org/images/27d35deb-98bb-4833-8121-8750f35cd09b) |
| Protoctists | `protoctists.svg` | *Amoeba proteus* | Carlo De Rito | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [4227f7b5](https://www.phylopic.org/images/4227f7b5-b1e5-4af6-99cc-af68795f5855) |
| Fungi | `fungi.svg` | *Amanita muscaria* | Mason McNair | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [237a0fb1](https://www.phylopic.org/images/237a0fb1-7b73-43ec-b0a5-eff95e7237df) |
| Ferns | `ferns.svg` | *Polypodium vulgare* | Guillaume Dera | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [ee243ea1](https://www.phylopic.org/images/ee243ea1-c311-4fa2-b730-928b80117515) |
| Monocotyledons | `monocots.svg` | *Oryza sativa* | Mason McNair | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [bdae8ff7](https://www.phylopic.org/images/bdae8ff7-6c00-4af9-8464-a44b3e6c65f9) |
| Dicotyledons | `dicots.svg` | *Helianthus annuus* | Mason McNair | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [40b91c6c](https://www.phylopic.org/images/40b91c6c-4ef8-4a5a-9b90-85fb50d74c5b) |
| Mammals | `mammals.svg` | *Elephas maximus* | Andy Wilson | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [db278f3b](https://www.phylopic.org/images/db278f3b-d8c1-47e9-afce-0478980f5875) |
| Birds | `birds.svg` | *Columba livia* | Andy Wilson | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [cbe76bdb](https://www.phylopic.org/images/cbe76bdb-5a89-4577-8472-6af7c2052d70) |
| Reptiles | `reptiles.svg` | *Iguana iguana* | Jack Mayer Wood | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [5dec03d9](https://www.phylopic.org/images/5dec03d9-66a2-4033-b1a9-6dbb3485199f) |
| Amphibians | `amphibians.svg` | *Rana temporaria* | Beth Reinke | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [e73c5c1c](https://www.phylopic.org/images/e73c5c1c-7727-4687-bf0b-3957343edfc3) |
| Fish | `fish.svg` | *Perca fluviatilis* | Ando | [Public Domain Mark 1.0](https://creativecommons.org/publicdomain/mark/1.0/) | [bbc78f09](https://www.phylopic.org/images/bbc78f09-18e1-4e4d-9e77-c6f9daee33c1) |
| Myriapods | `myriapods.svg` | *Lithobius forficatus* | Tatiana Miroliubova | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [b09c0ec3](https://www.phylopic.org/images/b09c0ec3-c56f-4ab9-a4e2-6b36e53f86d8) |
| Insects | `insects.svg` | *Apis mellifera* | Lubna Maherally | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [f551f54e](https://www.phylopic.org/images/f551f54e-1e17-4b0e-985c-74d34a53cb63) |
| Arachnids | `arachnids.svg` | *Araneus diadematus* | Amy Beauvois | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [2f7145fc](https://www.phylopic.org/images/2f7145fc-002c-40e8-9b35-16f95b05f0e3) |
| Crustaceans | `crustaceans.svg` | *Carcinus maenas* | Caleb M. Gordon | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [a34e9df9](https://www.phylopic.org/images/a34e9df9-d549-4ba2-a648-7785a84206e5) |
| Viruses | `viruses.svg` | *Alphainfluenzavirus influenzae* | Ian Shin | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [3813d3bb](https://www.phylopic.org/images/3813d3bb-8bad-469c-99b6-fcea358b1d49) |

To swap one: drop the new PhyloPic vector in `silhouettes/` under the group's id, update its row
in `silhouettes/manifest.json` and the `sil` record in `js/tree.js`, rewrite its row here, and run
`python3 tools/inline-silhouettes.py`.

## The pictures on the story

Step 1 is a photograph of the vent; steps 2 to 4 are pictures students meet in the textbook; step 5
is a painting by David S. Goodsell from the RCSB Protein Data Bank's Goodsell Gallery, which the
RCSB releases under CC BY 4.0. Each is shown at 900 and 1400 px wide, JPEG and WebP.

| Step | File | Source | Licence |
|---|---|---|---|
| 1 · The vent | `photos/lost-city-*` | **Massif of carbonate chimneys at the Lost City hydrothermal site**, 750–900 m deep, photographed by the ROV *Victor 6000*, Ifremer, 2005. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Massif_de_chemin%C3%A9es_carbonat%C3%A9es_(Ifremer_00569-68094_-_25275).jpg). Cropped. | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| 2 · The building blocks | `photos/glycine-*` | **Glycine, ball-and-stick model** by Ben Mills. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File%3AGlycine-neutral-Ipttt-conformer-3D-bs-17.png). | Public domain |
| 3 · The bag | `photos/liposome-*` | **Liposome**, from *Phospholipids aqueous solution structures* by Mariana Ruiz Villarreal (LadyofHats). [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Phospholipids_aqueous_solution_structures.svg). Cropped to the liposome. | Public domain |
| 4 · The copier | `photos/rna-*` | **RNA and DNA compared**, XBio illustration by explorebiology. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File%3AXBio_illustration_%E2%80%93_RNA.png). | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| 5 · The first cell | `photos/first-cell-*` | **Last Universal Common Ancestor** (2018): the primordial cell dividing, its DNA pulled apart, a glycolipid wall. Illustration by David S. Goodsell, RCSB Protein Data Bank, [doi 10.2210/rcsb_pdb/goodsell-gallery-035](https://pdb101.rcsb.org/sci-art/goodsell-gallery/last-universal-common-ancestor). Cropped. | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

## The photographs on the groups

One photograph under each group's name, from Wikimedia Commons, centre-cropped to 3 : 2 and shown
at 900 and 1400 px wide, JPEG and WebP. Every one is public domain, CC0 or CC BY; the credit is
also in the colophon on the page, from `js/tree.js`.

| Group | File | Source | Photographer | Licence |
|---|---|---|---|---|
| Animals | `photos/animals-*` | [Lion, Serengeti National Park (48788336273).jpg](https://commons.wikimedia.org/wiki/File%3ALion%2C_Serengeti_National_Park_%2848788336273%29.jpg) — A lion in the Serengeti | Ankit Gita from Mumbai, Maharashtra, India, India | CC BY 2.0 |
| Vertebrates | `photos/vertebrates-*` | [Snake skeleton.jpg](https://commons.wikimedia.org/wiki/File%3ASnake_skeleton.jpg) — A snake skeleton: the backbone, bone by bone | dbking | CC BY 2.0 |
| Mammals | `photos/mammals-*` | [African bush elephant (Loxodonta africana), Masai Mara.jpg](https://commons.wikimedia.org/wiki/File%3AAfrican_bush_elephant_%28Loxodonta_africana%29%2C_Masai_Mara.jpg) — African bush elephant | Hobbyfotowiki | CC0 |
| Birds | `photos/birds-*` | [Bald eagle in Alaska 2016-3.jpg](https://commons.wikimedia.org/wiki/File%3ABald_eagle_in_Alaska_2016-3.jpg) — Bald eagle | Andy Morffew from Itchen Abbas, Hampshire, UK | CC BY 2.0 |
| Reptiles | `photos/reptiles-*` | [Endangered species Iguana Iguana from Margarita Island.jpg](https://commons.wikimedia.org/wiki/File%3AEndangered_species_Iguana_Iguana_from_Margarita_Island.jpg) — Green iguana | Wilfredor | CC0 |
| Amphibians | `photos/amphibians-*` | [Red eyed tree frog edit2.jpg](https://commons.wikimedia.org/wiki/File%3ARed_eyed_tree_frog_edit2.jpg) — Red-eyed tree frog | Careyjamesbalboa (Carey James Balboa) | Public domain |
| Fish | `photos/fish-*` | [Common clownfish.jpg](https://commons.wikimedia.org/wiki/File%3ACommon_clownfish.jpg) — Clownfish in an anemone | Janderk | Public domain |
| Arthropods | `photos/arthropods-*` | [20200529 Lucanus cervus 02.jpg](https://commons.wikimedia.org/wiki/File%3A20200529_Lucanus_cervus_02.jpg) — Stag beetle | Flocci Nivis | CC BY 4.0 |
| Myriapods | `photos/myriapods-*` | [Tiger centipede (Scolopendra polymorpha).jpg](https://commons.wikimedia.org/wiki/File%3ATiger_centipede_%28Scolopendra_polymorpha%29.jpg) — Tiger centipede | Jbjensen1 | CC0 |
| Insects | `photos/insects-*` | [Honey Bee on Gaillardia Flower - Flickr - Swallowtail Garden Seeds.jpg](https://commons.wikimedia.org/wiki/File%3AHoney_Bee_on_Gaillardia_Flower_-_Flickr_-_Swallowtail_Garden_Seeds.jpg) — Honey bee on a flower | Swallowtail Garden Seeds from Santa Rosa, California, United States | CC BY 2.0 |
| Arachnids | `photos/arachnids-*` | [Phidippus regius female 01.jpg](https://commons.wikimedia.org/wiki/File%3APhidippus_regius_female_01.jpg) — Jumping spider | Nosferattus | CC0 |
| Crustaceans | `photos/crustaceans-*` | [Carcinus maenas 265985977.jpg](https://commons.wikimedia.org/wiki/File%3ACarcinus_maenas_265985977.jpg) — Shore crab, from above | Josh Boe | CC BY 4.0 |
| Plants | `photos/plants-*` | [Canopy shyness Malaysian rainforest Dryabalonops aromatica IMG20250930121416 Canopy Shyness 01.jpg](https://commons.wikimedia.org/wiki/File%3ACanopy_shyness_Malaysian_rainforest_Dryabalonops_aromatica_IMG20250930121416_Canopy_Shyness_01.jpg) — Rainforest trees, seen from the ground | Rohitjahnavi | CC0 |
| Ferns | `photos/ferns-*` | [Fern fronds at Riverbend CPA (26611537224).jpg](https://commons.wikimedia.org/wiki/File%3AFern_fronds_at_Riverbend_CPA_%2826611537224%29.jpg) — Fern fronds in sunlight | USFWS/Southeast | Public domain |
| Flowering plants | `photos/flowering-*` | [Blanket flowers, Cathleen Kuehl Memorial Wildflower Meadow 2026-08-01.jpg](https://commons.wikimedia.org/wiki/File%3ABlanket_flowers%2C_Cathleen_Kuehl_Memorial_Wildflower_Meadow_2026-08-01.jpg) — Wildflowers | Peter Cooper Jr. | CC0 |
| Monocotyledons | `photos/monocots-*` | [Rice terraces, Bali.jpg](https://commons.wikimedia.org/wiki/File%3ARice_terraces%2C_Bali.jpg) — Rice terraces, Bali | Vyacheslav Argenberg | CC BY 4.0 |
| Dicotyledons | `photos/dicots-*` | [Sunflower Fields.jpg](https://commons.wikimedia.org/wiki/File%3ASunflower_Fields.jpg) — Sunflowers | Wenchieh Yang | CC0 |
| Fungi | `photos/fungi-*` | [Amanita muscaria 2018 G10.jpg](https://commons.wikimedia.org/wiki/File%3AAmanita_muscaria_2018_G10.jpg) — Fly agaric | George Chernilevsky | Public domain |
| Protoctists | `photos/protoctists-*` | [Paramécium caudátum.jpg](https://commons.wikimedia.org/wiki/File%3AParam%C3%A9cium_caud%C3%A1tum.jpg) — Paramecium, under the microscope | MTadey | CC BY 4.0 |
| Prokaryotes | `photos/prokaryotes-*` | [E. coli Bacteria (16578744517).jpg](https://commons.wikimedia.org/wiki/File%3AE._coli_Bacteria_%2816578744517%29.jpg) — Escherichia coli, electron microscope, coloured | NIAID | CC BY 2.0 |
| Viruses | `photos/viruses-*` | [Influenza A Virus (H1N1)-1.jpg](https://commons.wikimedia.org/wiki/File%3AInfluenza_A_Virus_%28H1N1%29-1.jpg) — Influenza A virus, electron microscope, coloured | NIH Image Gallery | Public domain |

## The book

`photos/vital-question-cover.*` is the cover of Nick Lane, *The Vital Question* (Profile Books, 2015),
via Open Library. The cover is the publisher's copyright and is shown, small, to identify the book
the page recommends; it is credited on the card and here.

## What the story rests on

The five steps follow the alkaline hydrothermal vent hypothesis, which is the leading idea and
is presented as one. Each step on the page links to what it rests on; this is the full list.

| Step | Claim | Source |
|---|---|---|
| 1 | Lost City: warm, alkaline, hydrogen-rich white smokers, 800 m down | [Lost City Hydrothermal Field](https://en.wikipedia.org/wiki/Lost_City_Hydrothermal_Field); [The hydrothermal vent hypothesis, Understanding Evolution, UCMP Berkeley](https://evolution.berkeley.edu/the-origin-of-life/the-hydrothermal-vent-hypothesis/) |
| 2 | CO₂ reduced to formate and acetate on Fe–S and Fe–Ni–S minerals under vent–seawater gradients, no enzymes | Ferreira et al., *Journal of the American Chemical Society*, October 2025 — [summary](https://phys.org/news/2025-10-underwater-thermal-vents-molecular-precursors.html) |
| 3 | Mixed fatty acids form vesicles at 70 °C, pH ~12, in seawater salts | [Jordan et al., *Nature Ecology & Evolution* 2019](https://www.nature.com/articles/s41559-019-1015-y) |
| 4 | A polymerase ribozyme copies working ribozymes and lets them evolve | [Salk Institute, 2024](https://www.salk.edu/news-release/modeling-the-origins-of-life-new-evidence-for-an-rna-world/) |
| 4 | QT45 copies its complementary strand and then itself, in separate reactions — the closest yet | Gianni et al., *Science*, April 2026 — [summary](https://www.sciencealert.com/this-rna-almost-self-replicates-which-could-explain-lifes-origins) |
| 5 | LUCA about 4.2 billion years ago; an anaerobic acetogen living on H₂ and CO₂, with DNA, proteins, a membrane | [Moody et al., *Nature Ecology & Evolution* 2024](https://www.nature.com/articles/s41559-024-02474-w) |
| 5 | The rival ideas: hot springs on land with wet–dry cycles; sparks in water sprays | [UCSC, *Astrobiology* special issue, May 2026](https://news.ucsc.edu/2026/05/special-issue-of-astrobiology/); [Stanford, *Science Advances*, March 2025](https://news.stanford.edu/stories/2025/03/microlightning-in-water-droplets-may-have-sparked-life-on-earth) |
| 5 | The critique: Lost City's in-situ pH is close to seawater, so proton gradients were weaker than the hypothesis needs | [Tutolo, Goldschmidt 2025](https://goldschmidtabstracts.info/2025/30191.pdf) |
| 5 | The chemistry case for sunlit pools: the parts of RNA, proteins and lipids from one cyanide-based network in UV light | [Patel et al., *Nature Chemistry* 2015](https://www.nature.com/articles/nchem.2202) |
| 5 | For vents: rust chimneys grown in the laboratory concentrate RNA about a thousandfold | [Helmbrecht et al., *Geobiology* 2023](https://onlinelibrary.wiley.com/doi/10.1111/gbi.12572) |
| 5 | Against vents: modelled pH gradients across chimney walls too small and short-lived | [Jackson, *J. Mol. Evol.* 2016](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4999464/) |
| 5 | For pools: wet–dry cycling in hot springs joins monomers and packs them in vesicles | [Damer & Deamer, *Astrobiology* 2020](https://doi.org/10.1089/ast.2019.2045) |
| 5 | For pools: "microlightning" between water droplets makes uracil and other C–N molecules | [Zare lab, *Science Advances* 2025](https://www.science.org/doi/10.1126/sciadv.adt8979) |
| 5 | Against pools: the early Earth as a water world, continents largely submerged 3.2 Ga | [Johnson & Wing, *Nature Geoscience* 2020](https://www.nature.com/articles/s41561-020-0538-9) |
| 5 | Against pools: LUCA as an anaerobic, H₂-dependent, thermophilic vent dweller | [Weiss et al., *Nature Microbiology* 2016](https://www.nature.com/articles/nmicrobiol2016116) |
| 5 | Both camps' critiques of each other, in one readable account | [Knowable Magazine, 2020](https://knowablemagazine.org/content/article/physical-world/2020/searching-high-and-low-origins-life) |
| 1, 5 | The book behind the story: the vent, the energy problem, and why complex life came late | Nick Lane, *The Vital Question* (Profile / Norton, 2015) — [the author's page](https://nick-lane.net/books/the-vital-question/). The card on the page is typeset, not the cover, which is the publisher's. |

**Where the field stands (September 2026).** There is no agreed setting. Two ideas lead: alkaline
hydrothermal vents (Russell, Martin, Lane; supported by what the reconstructed LUCA lived on and by
the 2025 carbon-fixation experiments) and shallow pools on land that dry out and refill in sunlight
(Sutherland's chemistry; Damer and Deamer's hot springs; the 2026 *Astrobiology* special issue).
Atmospheric sparks (Miller–Urey, and the 2025 microlightning result) and organic molecules delivered
from space (the Bennu samples) feed either. Each side has results the other has not matched, and
each has a standing critique. The page presents the vent story as one of two leading ideas and says
where everyone agrees.

The class deck's diagram of the vent pores (Understanding Evolution, UC Museum of Paleontology)
is copyright UCMP and AAAS and licensed for classroom use only. It is **not** used here.
