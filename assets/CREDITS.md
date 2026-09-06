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

## The photograph

| Where | File | Source | Licence |
|---|---|---|---|
| Step 1, the vent | `photos/lost-city-*` | **Massif of carbonate chimneys at the Lost City hydrothermal site**, 750–900 m deep, photographed by the ROV *Victor 6000*, Ifremer, 2005. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Massif_de_chemin%C3%A9es_carbonat%C3%A9es_(Ifremer_00569-68094_-_25275).jpg). Shown cropped, at 900 and 1400 px, JPEG and WebP. | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |

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

The class deck's diagram of the vent pores (Understanding Evolution, UC Museum of Paleontology)
is copyright UCMP and AAAS and licensed for classroom use only. It is **not** used here; the
drawings on the page were drawn for it.
