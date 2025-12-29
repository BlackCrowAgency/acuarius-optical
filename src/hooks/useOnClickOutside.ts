// src/hooks/useOnClickOutside.ts
"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

type MaybeRef = RefObject<HTMLElement | null> | HTMLElement | null | undefined;

type Options = {
  enabled?: boolean;
};

export function useOnClickOutside(
  refs: MaybeRef | MaybeRef[],
  handler: (event: MouseEvent | TouchEvent) => void,
  options: Options = {}
) {
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const list = Array.isArray(refs) ? refs : [refs];

    function isInside(target: EventTarget | null) {
      for (const ref of list) {
        const el =
          ref && typeof ref === "object" && "current" in ref
            ? (ref.current as HTMLElement | null)
            : (ref as HTMLElement | null);

        if (el && target instanceof Node && el.contains(target)) return true;
      }
      return false;
    }

    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (isInside(event.target)) return;
      handler(event);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [refs, handler, enabled]);
}
