import { signal } from "@preact/signals-react";

export const financialbox = signal<"idle" | "idleMobile" | "open" | "max" | "mobileOpen">(
    window.innerWidth >= 1024 ? "idle" : "idleMobile"
)