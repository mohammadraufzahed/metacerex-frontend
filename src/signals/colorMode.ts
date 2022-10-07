import { effect, signal } from "@preact/signals-react";

const colorModeLocal = localStorage.getItem("colorMode");

export const colorMode = signal<"dark" | "light">(colorModeLocal ?? "light");

effect(() => {
  localStorage.setItem("colorMode", colorMode.value);
  const body = document.querySelector("body");
  const html = document.querySelector("html");
  if (body && html) {
    if (colorMode.value == "dark") {
      body.classList.remove("bg-background-50");
      body.classList.add("bg-neutral-700");
    } else {
      body.classList.add("bg-background-50");
      body.classList.remove("bg-neutral-700");
    }
    body.classList.remove("dark", "light");
    body.classList.add(colorMode.value);
  }
});
