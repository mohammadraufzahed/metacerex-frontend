import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import { registerWorkers } from "./registerWorker";

import AppCss from "./styles/css/app.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: AppCss,
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  useEffect(() => {
    registerWorkers();
  }, []);
  return (
    <RecoilRoot>
      <RecoilNexus />
      <html lang="en">
        <head>
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </RecoilRoot>
  );
}
