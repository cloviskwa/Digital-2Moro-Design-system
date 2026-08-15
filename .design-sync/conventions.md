# Digital 2Moro UI (`@digital2moro/ui`, `window.D2M`) — build conventions

## No provider, no wrapper

This DS reads no React context and needs no root component. Dark is the
default theme baked into `:root` — an unthemed page is already correct.
To opt a subtree into light, set `data-theme="light"` on any ancestor
element (usually `<html>` or `<body>`); there is no `ThemeProvider` and no
theme prop on individual components. Don't invent one.

```jsx
<div data-theme="light">
  <Card>...</Card> {/* renders in the light theme */}
</div>
```

## Styling idiom: CSS custom properties, not utility classes

Every component styles itself internally from `var(--d2m-*)` tokens defined
in `styles.css`. You never write Tailwind-style utility classes against this
DS — you compose real components and, where a token is genuinely needed for
layout glue you write yourself (spacing between components you're arranging,
not inside one), reach for the same `var(--d2m-*)` tokens so custom glue
matches the system instead of introducing new hardcoded values.

Real token families (not exhaustive — see `tokens/` for the full set):

| Family | Examples |
|---|---|
| Color | `--d2m-color-blue`, `--d2m-color-blue-cta`, `--d2m-color-danger`, `--d2m-color-success`, `--d2m-color-warning` |
| Surface (theme-aware) | `--d2m-bg`, `--d2m-bg-panel`, `--d2m-bg-panel-solid`, `--d2m-bg-hover` |
| Text (theme-aware) | `--d2m-text-main`, `--d2m-text-muted`, `--d2m-text-soft` |
| Border (theme-aware) | `--d2m-border-soft`, `--d2m-border-faint` |
| Radius | `--d2m-radius-sm` (10px), `--d2m-radius-md` (16px), `--d2m-radius-lg` (30px), `--d2m-radius-full` |
| Spacing (4/8 grid) | `--d2m-space-3xs` … `--d2m-space-3xl` |
| Type | `--d2m-font-heading`, `--d2m-font-body`, `--d2m-font-mono`, `--d2m-fs-h1` … `--d2m-fs-h6`, `--d2m-fs-p-body`, `--d2m-fs-p-lg`, `--d2m-fs-p-sm` |
| Glow / gradient accents | `--d2m-glow-blue`, `--d2m-gradient-blue`, `--d2m-gradient-border` |
| Elevation | `--d2m-shadow-elevated`, `--d2m-overlay-backdrop` |

A few compound components also expose fixed **semantic child class names**
for slotted content — these are real, grep-discoverable vocabulary, not
utility classes: e.g. `Card` accepts `<p className="d2m-card__title">` /
`d2m-card__description"` children. Check a component's `.prompt.md` or its
`.d.ts` for whether it has this pattern before inventing child markup.

## Where the truth lives

Read `styles.css` (and its `@import` closure, including `_ds_bundle.css`)
before styling anything — it is the actual compiled stylesheet, not a
summary. Per-component usage patterns and props live in each
`components/<group>/<Name>/<Name>.prompt.md` and `<Name>.d.ts`.

## One idiomatic build snippet

```jsx
import { Card, Button } from '@digital2moro/ui';

<Card interactive>
  <p className="d2m-card__title">Ship faster</p>
  <p className="d2m-card__description">
    Real components, real tokens, zero guesswork.
  </p>
  <div style={{ display: 'flex', gap: 'var(--d2m-space-sm)', marginTop: 'var(--d2m-space-md)' }}>
    <Button variant="primary">Get started</Button>
    <Button variant="ghost">Learn more</Button>
  </div>
</Card>
```
