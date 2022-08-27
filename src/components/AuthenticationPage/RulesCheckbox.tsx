import React from "react";

const RulesCheckbox: React.FC = () => {
  return (
    <div className="flex flex-row mr-4 gap-2 self-start items-start">
      <input className="mt-1" type="checkbox" size={17} />
      <span className="font-vazir w-full font-normal text-sm text-neutral-600">
        با <span className="text-primary-500">قوانین و مقررات</span> استفاده از
        شرکت الف موافقم.
      </span>
    </div>
  );
};

export default RulesCheckbox;
