import { signal } from "@preact/signals-react";
import { ProfileReadOnly } from "../types/API";

export const profile = signal<ProfileReadOnly | null>(null)