"use client";

import * as React from "react";

export type UseCountdownResult = {
  secondsLeft: number;
  isActive: boolean;
  reset: (seconds: number) => void;
};

function computeLeft(endAt: number | null) {
  if (endAt == null) return 0;
  return Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
}

/**
 * Countdown driven by end timestamp so it does not drift on re-renders.
 */
export function useCountdown(initialSeconds: number): UseCountdownResult {
  const endAtRef = React.useRef<number | null>(null);
  const [secondsLeft, setSecondsLeft] = React.useState(initialSeconds);

  React.useEffect(() => {
    if (initialSeconds <= 0) {
      endAtRef.current = null;
      setSecondsLeft(0);
      return;
    }
    endAtRef.current = Date.now() + initialSeconds * 1000;
    setSecondsLeft(computeLeft(endAtRef.current));
  }, [initialSeconds]);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      const next = computeLeft(endAtRef.current);
      setSecondsLeft(next);
      if (next <= 0) {
        endAtRef.current = null;
      }
    }, 400);
    return () => window.clearInterval(id);
  }, []);

  const reset = React.useCallback((seconds: number) => {
    const s = Math.max(0, Math.floor(seconds));
    if (s <= 0) {
      endAtRef.current = null;
      setSecondsLeft(0);
      return;
    }
    endAtRef.current = Date.now() + s * 1000;
    setSecondsLeft(s);
  }, []);

  const isActive = secondsLeft > 0;

  return { secondsLeft, isActive, reset };
}
