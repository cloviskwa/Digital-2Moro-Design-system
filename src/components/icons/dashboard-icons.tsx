import type { ComponentType, SVGProps } from 'react';
import {
  IconLayoutDashboard,
  IconFileText,
  IconFiles,
  IconPhoto,
  IconUsers,
  IconShieldLock,
  IconSettings,
  IconLock,
  IconClipboardList,
  IconKey,
  IconBell,
  IconSearch,
  IconBook,
  IconArticle,
  IconChartBar,
  IconUpload,
  IconClockCog,
  IconCloud,
  IconPlugConnected,
  IconForms,
  IconMail,
  IconChartDots,
  IconSunMoon,
  IconSun,
  IconMoon,
  IconDeviceDesktop,
  IconExternalLink,
  IconArrowRight,
  IconArrowUpRight,
  IconChevronRight,
  IconCheck,
  IconAlertTriangle,
  IconInfoCircle,
  IconCircleCheck,
  IconCircleX,
  IconX,
  IconTrash,
} from '@tabler/icons-react';

/**
 * Structural type for a Tabler icon component — `@tabler/icons-react` does not
 * export its internal `Icon`/`IconProps` types, so this is derived from the
 * public shape every generated icon actually has (an SVG component accepting
 * `size`/`stroke`/`title` on top of standard SVG props).
 */
export type TablerIconComponent = ComponentType<
  SVGProps<SVGSVGElement> & {
    size?: string | number;
    stroke?: string | number;
    title?: string;
  }
>;

/**
 * THE central Digital 2Moro icon registry (Phase 14D). One name maps to
 * exactly one Tabler icon — this is the only place a Tabler icon should ever
 * be imported. Every consumer (dashboard cards, menus, CTAs, link rows,
 * public sections) renders icons via `DashboardIcon`/`ICON_REGISTRY`, never by
 * importing `@tabler/icons-react` directly elsewhere in the codebase. See
 * docs/design/phase-14d-tabler-icon-system.md §3/§9.
 */
export const ICON_REGISTRY = {
  dashboard: IconLayoutDashboard,
  content: IconFileText,
  pages: IconFiles,
  media: IconPhoto,
  users: IconUsers,
  roles: IconShieldLock,
  settings: IconSettings,
  security: IconLock,
  audit: IconClipboardList,
  apiKeys: IconKey,
  notifications: IconBell,
  seo: IconSearch,
  dictionary: IconBook,
  blog: IconArticle,
  websiteAudit: IconChartBar,
  imports: IconUpload,
  jobs: IconClockCog,
  storage: IconCloud,
  integrations: IconPlugConnected,
  forms: IconForms,
  contact: IconMail,
  analytics: IconChartDots,
  theme: IconSunMoon,
  themeSun: IconSun,
  themeMoon: IconMoon,
  themeSystem: IconDeviceDesktop,
  external: IconExternalLink,
  arrowRight: IconArrowRight,
  arrowUpRight: IconArrowUpRight,
  chevronRight: IconChevronRight,
  check: IconCheck,
  warning: IconAlertTriangle,
  info: IconInfoCircle,
  success: IconCircleCheck,
  error: IconCircleX,
  close: IconX,
  trash: IconTrash,
} as const satisfies Record<string, TablerIconComponent>;

/** Typed union of every registered icon name — the only valid `DashboardIcon` `name` values. */
export type IconName = keyof typeof ICON_REGISTRY;
