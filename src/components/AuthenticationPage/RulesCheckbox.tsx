import React from "react";
import type { ChangeEventHandler } from "react";
import { FaAsterisk } from "react-icons/fa";

type PropsT = {
  value: boolean;
  onChange: ChangeEventHandler;
  name: string;
  id: string;
  className?: string;
};

const RulesCheckbox: React.FC<PropsT> = ({
  onChange,
  name,
  id,
  value,
  className,
}) => {
  return (
    <div
      className={`flex flex-row lg:mr-4 w-11/12 gap-2 self-start items-start ${className}`}
    >
      <input
        className="mt-1"
        type="checkbox"
        size={17}
        checked={value}
        onChange={onChange}
        name={name}
        id={id}
      />
      <span className="font-vazir flex flex-row break-words text-xs items-center w-ful font-normal lg:text-sm text-neutral-600">
        با <span className="text-primary-500 mx-2">قوانین و مقررات</span>{" "}
        استفاده از شرکت الف موافقم.
        <FaAsterisk className="text-error mr-1" size={10} />
      </span>
    </div>
  );
};

export default RulesCheckbox;
