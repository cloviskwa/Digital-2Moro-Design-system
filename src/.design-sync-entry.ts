// Temporary barrel for the design-sync build (branch: design-sync/token-system).
// Re-exports the presentational, non-Next-coupled component surface shown on
// /design-system (primitives, controls, premium, icons, motion, theme) so the
// converter can bundle real components + real prop types into claude.ai/design.
// Relative imports (not @/ aliases) at this top level on purpose: the
// converter's source-kit.mjs resolves the entry's exports via a ts-morph
// Project that doesn't inherit tsconfig path-alias config, so an aliased
// top-level import here silently resolves to zero exports.
// Never imported by the app itself — inert. Safe to delete after the sync.
export * from './components/ui/primitives';
export * from './components/ui/controls';
export * from './components/ui/premium';
export * from './components/icons';
export * from './components/motion';
export * from './components/theme';
