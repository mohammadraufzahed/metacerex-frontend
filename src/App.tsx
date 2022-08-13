import React, { Suspense } from "react";
import Navigation from "./Navigation";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import Loading from "./components/Loading";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RecoilRoot>
        <RecoilNexus />
        <Navigation />
      </RecoilRoot>
    </Suspense>
  );
}

export default App;
