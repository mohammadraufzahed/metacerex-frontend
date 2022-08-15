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
    <html lang="fa" dir="rtl" className="overflow-x-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta
          name="wakav-stress-test"
          content="https://saraphi-ui.iran.liara.run/dashboard_3b8b0701b3aa4b09ad013527c71d7da5"
        />
        <title>صرافی</title>
        <style>{globalCss}</style>
        <style>{tailwindCss}</style>
      </head>
      <body id="root" className="overflow-x-hidden">
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
