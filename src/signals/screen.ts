import { signal } from "@preact/signals-react";

export const screen = signal<{ width: number; height: number }>({
  width: window.innerWidth,
  height: window.innerHeight,
});
