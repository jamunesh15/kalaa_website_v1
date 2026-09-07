# Landing artifact sources

The paper artifacts in the hero, as supplied. Drop a replacement here under the
same name and run `npm run artifacts`.

Sources are not committed. `public/landing/*.webp` is what ships and that is in
git, so a clone can build the site without these files.

## What is used

`a3` (content calendar) and `a4` (content ideas sheet). Both are proper cutouts
with a real alpha channel, both are in the site's own sage and butter, and both
are about planning content rather than about owning equipment.

## What is not, and why

**`a1` has a checkerboard baked into it as pixels.** Its corners are solid
black. Whatever exported it drew the transparency checkerboard into the image
rather than writing an alpha channel, so on the page it is a dark chequered
rectangle. It needs re-exporting as a real transparent PNG.

**`a2` has an opaque cream background** and cannot be keyed out, because the
artifact itself is cream paper: removing the background would eat the artwork.

**`a2` also breaks a content rule and would need changing even with
transparency.** It carries an invented brand handle, an invented city and an
invented like count. CLAUDE.md forbids inventing a client name, a number or a
geography, and a hero artifact is on the first screen where all three read as
claims. Ask for it again with a blank profile row, no location and no counts.
