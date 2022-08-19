import React, { lazy } from "react";

const ListContainerMobile = lazy(() => import("./ListContainer.mobile"));
const ListContainerDesktop = lazy(() => import("./ListContainer.desktop"));

const ListSelector: React.FC = () => {
  return (
    <div className="relative lg:max-h-[510px] lg:min-h-[500px] lg:overflow-y-hidden">
      <ListContainerMobile />
      <ListContainerDesktop />
    </div>
  );
};

export default ListSelector;
