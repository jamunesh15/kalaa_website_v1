# Drop reel videos here

Put the editors' exports in this folder and run:

    npm run reels

Anything ending `.mp4`, `.mov`, `.m4v`, `.webm` or `.mkv` is picked up. Nothing
else in the repo needs touching: the script writes web-ready files into
`public/work/reels/` and rewrites `src/content/reelsManifest.ts`, which is what
the site reads.

## Naming

The filename becomes the slug, so name it after the client or the piece:

    angoori-bliss.mp4      ->  angoori-bliss
    Mad Over Grill 02.mov  ->  mad-over-grill-02

## Choosing which five seconds

By default the clip starts at 10% in, which skips a title card without cutting
into the middle of the piece. To pick the moment yourself, put the start second
after an `@`:

    angoori-bliss@12.mp4     starts at 12 seconds
    angoori-bliss@12-4.mp4   starts at 12 seconds, runs 4 seconds

## What comes out

Per source, in `public/work/reels/`:

- `<slug>.webm` and `<slug>.mp4`, 720x1280, silent, roughly 5 seconds
- `<slug>.jpg`, the poster frame, so something is on screen before the video is

The originals stay here and are NOT committed or deployed. They are usually tens
of megabytes each, and a repository never gets smaller once a binary is in its
history.
