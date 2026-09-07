# Fonts

Both families are from [Fontshare](https://www.fontshare.com), by Indian Type
Foundry, and are free for commercial use under the ITF Free Font Licence. Read
the licence at <https://www.fontshare.com/licenses/itf-ffl>.

| File | Family | Role |
| --- | --- | --- |
| `chillax-*.woff2` | Chillax | Display. Headings and anything set large. |
| `switzer-*.woff2` | Switzer | Text. Everything a person reads a sentence of. |

Two families, and that is the ceiling. Three unrelated faces on one site is a
tell in itself. Chillax tops out at 700; a heading that needs more presence than
that gets it from size, not from a weight the family does not have.

The `.woff2` files were downloaded from the Fontshare CDN through its CSS API.
To re-download a family, or to add a weight:

```
curl -s "https://api.fontshare.com/v2/css?f%5B%5D=chillax@700" | grep -o "//cdn.fontshare.com/wf/[A-Z0-9/]*\.woff2"
```

then fetch that URL and save it as `<family>-<weight>.woff2`, and add the entry
to `fonts.ts`.

Clash Display and Panchang were the other two display candidates. They were
deleted when Chillax was chosen, files and all. An unused font in a repository
is a decision waiting to be relitigated.

English only, so every file is the Latin cut and no Indic subset is needed.

## The glyph bounding boxes were repaired, 2026-09-01

Firefox's font sanitiser reported `glyf: Glyph bbox was incorrect; adjusting`
for 29 glyphs in every Satoshi face and 7 or 8 in every Switzer face. Firefox
corrects them itself and the type renders correctly, so nothing looked wrong,
and it emitted one console warning per glyph per face on every page load. That
is what `npm test`'s clean-console check was failing on, and it is the kind of
noise that trains people to ignore the console.

The files as downloaded from Fontshare carry `xMin`/`yMin`/`xMax`/`yMax` values
on those glyphs that do not match their actual outlines. Recalculated with
fontTools (`glyf[name].recalcBounds(glyf)` for every glyph, then `head` updated
to the new extremes) and saved back as woff2. The outlines are untouched: only
the numbers describing them changed, so the type is identical.

Re-download a face and the warning comes back. Re-run the repair.
