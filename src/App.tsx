import React, { Suspense } from "react";
import Navigation from "./Navigation";
import { RecoilRoot } from "recoil";
import Loading from "./components/Loading";
// Css Files
import "./styles/global.scss";
import "./styles/tailwind.css";
import "./styles/scrollbar.scss";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./components/Error";
import queryClient from "./QueryClient";

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary fallback={<Error />}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <Navigation />
            <Toaster />
          </RecoilRoot>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
