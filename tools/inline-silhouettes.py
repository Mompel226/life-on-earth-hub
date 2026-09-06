#!/usr/bin/env python3
"""Drop every silhouette in assets/silhouettes/ into index.html as a <symbol>,
between the SILHOUETTES markers.

Run this after adding or swapping a silhouette:   python3 tools/inline-silhouettes.py

Inlining (rather than fetching sixteen files) means the page still works when
someone double-clicks index.html, with no web server running. Each file is the
vector PhyloPic serves, untouched except for the XML wrapper, the metadata and
the hard-coded black fill, which the stylesheet replaces.
"""
import os, re, sys, json

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
folder = os.path.join(root, 'assets/silhouettes')
manifest = json.load(open(os.path.join(folder, 'manifest.json')))

symbols = []
for name in manifest:                         # the manifest's order, so the diff stays readable
    path = os.path.join(folder, name + '.svg')
    svg = open(path).read()
    vb = re.search(r'viewBox="([^"]+)"', svg).group(1)
    inner = svg[svg.index('<g'):svg.rindex('</svg>')]
    inner = re.sub(r'<metadata>.*?</metadata>', '', inner, flags=re.S)
    inner = inner.replace('fill="#000000"', '').replace('stroke="none"', '')
    symbols.append('<symbol id="s-%s" viewBox="%s">%s</symbol>' % (name, vb, inner.strip()))

page = os.path.join(root, 'index.html')
html = open(page).read()
block = '<!-- SILHOUETTES:START -->\n' + '\n'.join(symbols) + '\n<!-- SILHOUETTES:END -->'
new, n = re.subn(r'<!-- SILHOUETTES:START -->.*?<!-- SILHOUETTES:END -->', lambda _m: block, html, flags=re.S)
if not n:
    sys.exit('index.html has no <!-- SILHOUETTES:START --> … <!-- SILHOUETTES:END --> markers')
open(page, 'w').write(new)
print('%d silhouettes inlined — index.html is now %.0f KB' % (len(symbols), len(new) / 1024))
