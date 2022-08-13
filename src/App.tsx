import React, { Suspense, useEffect } from "react";
import Navigation from "./Navigation";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import Loading from "./components/Loading";
// Css Files
import globalCss from "./styles/global.scss";
import tailwindCss from "./styles/tailwind.css";

export default function App() {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <title>Hello</title>
        <style>{globalCss}</style>
        <style>{tailwindCss}</style>
      </head>
      <body id="root">
        <Suspense fallback={<Loading />}>
          <RecoilRoot>
            <RecoilNexus />
            <Navigation />
          </RecoilRoot>
        </Suspense>
        <script src="/index.js" type="module"></script>
      </body>
    </html>
  );
}
