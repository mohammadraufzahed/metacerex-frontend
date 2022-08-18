import React, { lazy } from "react";

const ListContainerMobile = lazy(() => import("./ListContainer.mobile"));
const ListContainerDesktop = lazy(() => import("./ListContainer.desktop"));

const ListSelector = () => {
  return (
    <div className="relative max-h-[50vh] overflow-y-hidden">
      <ListContainerMobile />
      <ListContainerDesktop />
    </div>
  );
};

export default ListSelector;
