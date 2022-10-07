import { QueryErrorResetBoundary } from "@tanstack/react-query";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFetch from "../components/ErrorFetch";

type PropsT = {
  children: React.ReactNode;
  title: string;
};

const ProfileFormLayout: React.FC<PropsT> = ({ children, title }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorFetch resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <div className="w-full bg-neutral-50 dark:bg-neutral-900 rounded-2xl flex flex-col gap-10 py-6 px-2 lg:py-8 lg:px-8">
            <span className="font-vazir font-bold text-base text-neutral-900 dark:text-neutral-50">
              {title}
            </span>
            <div className="w-full h-full">{children}</div>
          </div>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ProfileFormLayout;
