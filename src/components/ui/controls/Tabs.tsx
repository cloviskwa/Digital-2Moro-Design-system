'use client';

import { useId, useState, type KeyboardEvent, type ReactNode } from 'react';

export interface TabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  /** Uncontrolled — the active tab is internal state, seeded from this. Defaults to the first enabled item. */
  defaultValue?: string;
  className?: string;
}

/**
 * Tabs — `role="tablist"`/`"tab"`/`"tabpanel"` with a roving-tabindex,
 * automatic-activation keyboard model (ArrowLeft/ArrowRight/Home/End move
 * focus AND select, matching the common native-feeling tab pattern) —
 * implemented by hand since no dependency was approved for this. Uncontrolled
 * only (internal state); a controlled `value`/`onChange` API is deferred
 * until a real consumer needs it.
 */
export default function Tabs({ items, defaultValue, className }: TabsProps) {
  const baseId = useId();
  const enabledItems = items.filter((item) => !item.disabled);
  const [active, setActive] = useState(defaultValue ?? enabledItems[0]?.value);

  const activeIndex = items.findIndex((item) => item.value === active);

  const focusTabAt = (index: number) => {
    const tab = document.getElementById(`${baseId}-tab-${items[index]?.value}`);
    tab?.focus();
  };

  const moveTo = (nextIndex: number) => {
    const item = items[nextIndex];
    if (!item || item.disabled) return;
    setActive(item.value);
    focusTabAt(nextIndex);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const enabledIndexes = items.map((item, i) => (!item.disabled ? i : -1)).filter((i) => i >= 0);
    if (enabledIndexes.length === 0) return;

    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const currentPos = enabledIndexes.indexOf(activeIndex);
      const nextPos = (currentPos + direction + enabledIndexes.length) % enabledIndexes.length;
      moveTo(enabledIndexes[nextPos]);
    } else if (event.key === 'Home') {
      event.preventDefault();
      moveTo(enabledIndexes[0]);
    } else if (event.key === 'End') {
      event.preventDefault();
      moveTo(enabledIndexes[enabledIndexes.length - 1]);
    }
  };

  return (
    <div className={['d2m-tabs', className].filter(Boolean).join(' ')}>
      <div className="d2m-tabs__list" role="tablist" onKeyDown={handleKeyDown}>
        {items.map((item) => {
          const isActive = item.value === active;
          return (
            <button
              key={item.value}
              id={`${baseId}-tab-${item.value}`}
              type="button"
              role="tab"
              className={['d2m-tabs__tab', isActive && 'd2m-tabs__tab--active'].filter(Boolean).join(' ')}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${item.value}`}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => setActive(item.value)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.value}
          id={`${baseId}-panel-${item.value}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${item.value}`}
          className="d2m-tabs__panel"
          hidden={item.value !== active}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
