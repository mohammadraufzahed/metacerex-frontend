import React, { Suspense, useEffect } from "react";
import Navigation from "./Navigation";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import Loading from "./components/Loading";
// Css Files
import "./styles/global.scss";
import "./styles/tailwind.css";
import "./styles/scrollbar.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true } },
});
export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <RecoilNexus />
          <Navigation />
        </RecoilRoot>
      </QueryClientProvider>
    </Suspense>
  );
}
