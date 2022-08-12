import React, { Suspense } from "react";
import Navigation from "./Navigation";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";

function App() {
  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <RecoilRoot>
        <RecoilNexus />
        <Navigation />
      </RecoilRoot>
    </Suspense>
  );
}

export default App;
