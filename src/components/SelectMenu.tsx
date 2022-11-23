import React from "react";
import Select from "react-select";
import { activeEndpoint } from "../pages/OnchainPage";

type Props = {
  options?: {
    label: string;
    value: any;
  }[];
  onChange: (v: any) => void;
};

const SelectMenu: React.FC<Props> = ({ options, onChange }) => {
  return (
    <div className="flex flex-col items-center w-max bg-neutral-100 border-[1px] border-neutral-200 px-2 py-2">
      <span className="font-vazir font-light w-max text-sm text-black/60">
        Resolution
      </span>
      <Select
        placeholder="1 Day"
        styles={{
          container: (styles) => ({
            ...styles,
            width: "max-content",
            backgroundColor: "transparent",
          }),
          control: (styles) => ({
            ...styles,
            backgroundColor: "transparent",
            border: "unset",
            outline: "unset",
          }),
          indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
        }}
        options={options ?? []}
        onChange={(v) => onChange(v.value)}
      />
    </div>
  );
};

export default SelectMenu;
