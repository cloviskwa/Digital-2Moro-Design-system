# Digital 2Moro Design System

The real `@digital2moro/ui` component library (`window.D2M` when bundled), extracted from
the [digital2moro-platform](https://github.com/cloviskwa/Digital-2Moro-Next-Tailwind-Website)
monorepo — the real components and stylesheet the live site renders, not a
reimplementation or a separate demo kit.

## What's here

- `src/components/ui/{primitives,controls,premium}` — the component set
- `src/components/icons`, `src/components/motion`, `src/components/theme` — supporting families
- `src/styles/` — the real design-system stylesheet (`variables.css`, `themes/{dark,light}.css`, `typography.css`, `components.css`)
- `.design-sync/` — config, notes, and hand-authored preview compositions used to sync this
  library into a [claude.ai/design](https://claude.ai/design) project via the `/design-sync` skill

## Relationship to the main repo

This is a **read-extracted subset**, not a package with its own build/publish pipeline.
The source of truth for these components is `digital2moro-platform`; changes should land
there first (via the real app's `/design-system` showcase route) and be re-exported here,
not edited independently in this repo.

See `.design-sync/NOTES.md` for known limitations (font substitutions, a couple of
components without authored previews) and `.design-sync/conventions.md` for the styling
idiom (CSS custom properties, `--d2m-*` tokens, no theme provider needed — dark is the
default, opt into light via `data-theme="light"`).
