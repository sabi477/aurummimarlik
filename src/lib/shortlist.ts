"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * In Common With's header carries a live cart count. Aurum is a portfolio, so
 * the same slot holds a shortlist: projects the visitor is collecting before
 * sending a brief.
 *
 * The shortlist lives in a tiny external store rather than React state. That
 * keeps the server snapshot empty — so the markup matches on hydration — and
 * lets any component read it without a provider.
 */

const KEY = "aurum:liste";

type State = { items: string[]; open: boolean };

const EMPTY: State = { items: [], open: false };

let state: State = EMPTY;
let hydrated = false;

const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist(items: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable — the shortlist stays in memory */
  }
}

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function set(next: Partial<State>) {
  state = { ...state, ...next };
  emit();
}

function onStorage(e: StorageEvent) {
  // Başka bir sekmede değişirse listeyi eşitle.
  if (e.key === KEY) set({ items: read() });
}

function subscribe(listener: () => void) {
  // İlk aboneden önce okumuyoruz; sunucu anlık görüntüsü boş kalmalı.
  if (!hydrated) {
    hydrated = true;
    state = { ...state, items: read() };
    window.addEventListener("storage", onStorage);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => state;
const getServerSnapshot = () => EMPTY;

export function useCart() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { items, open } = snapshot;

  const add = useCallback((slug: string) => {
    if (state.items.includes(slug)) return;
    const items = [...state.items, slug];
    persist(items);
    set({ items });
  }, []);

  const remove = useCallback((slug: string) => {
    const items = state.items.filter((s) => s !== slug);
    persist(items);
    set({ items });
  }, []);

  const toggle = useCallback((slug: string) => {
    const items = state.items.includes(slug)
      ? state.items.filter((s) => s !== slug)
      : [...state.items, slug];
    persist(items);
    set({ items });
  }, []);

  const clear = useCallback(() => {
    persist([]);
    set({ items: [] });
  }, []);

  const setOpen = useCallback((v: boolean) => set({ open: v }), []);

  return useMemo(
    () => ({
      items,
      count: items.length,
      has: (slug: string) => items.includes(slug),
      add,
      remove,
      toggle,
      clear,
      open,
      setOpen,
    }),
    [items, open, add, remove, toggle, clear, setOpen],
  );
}
