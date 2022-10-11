import { motion } from "framer-motion";
import React, { useState } from "react";
import { AnimatedOverlay } from "../pages/AtiPage";

type PropsT = {
  baseValue: number;
  baseOnChange: (value: number) => void;
  baseName: string;
  assetValue: number;
  assetOnChange: (value: number) => void;
  assetName: string;
  disabled: boolean;
};

const ExchangeRate: React.FC<PropsT> = ({
  assetOnChange,
  assetValue,
  assetName,
  baseOnChange,
  baseValue,
  baseName,
  disabled,
}) => {
  const [flip, setFlip] = useState<boolean>(true);
  return (
    <div
      className={`w-full relative gap-2 flex ${
        flip ? "flex-col-reverse" : "flex-col"
      } justify-around h-24 border-primary-500 min-w-[330px] p-4  border-2 rounded-lg text-neutral-900 dark:text-neutral-50`}
    >
      <AnimatedOverlay accepted={!disabled} />
      <div className="w-full grid px-14 grid-cols-2 font-vazir text-sm">
        {flip || disabled ? (
          <span className="font-bold  w-max">{baseValue}</span>
        ) : (
          <input
            className="font-bold min-w-full w-max max-w-max bg-transparent outline-none"
            type="number"
            value={baseValue}
            onChange={({ currentTarget }) =>
              baseOnChange(
                parseFloat((currentTarget as HTMLInputElement).value)
              )
            }
          />
        )}
        <span className="font-normal w-full text-left">{baseName}</span>
      </div>
      <div className="w-full h-[2px] bg-primary-500" />
      <div className="w-full flex px-14 justify-between items-center font-vazir text-sm">
        {!flip || disabled ? (
          <span className="font-bold  w-max">{assetValue}</span>
        ) : (
          <input
            className="font-bold w-full  bg-transparent outline-none"
            type="number"
            value={assetValue}
            onChange={({ currentTarget }) =>
              assetOnChange(
                parseFloat((currentTarget as HTMLInputElement).value)
              )
            }
            step={0.01}
          />
        )}
        <span className="font-normal">{assetName}</span>
      </div>
      <motion.img
        variants={{
          initial: {
            y: 0,
          },
          hover: {
            y: -1,
          },
          tap: {
            y: -2,
          },
        }}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        width={24}
        height={24}
        onTap={() => setFlip((flip) => !flip)}
        src="/svgs/layer-prime-500.svg"
        className="absolute cursor-pointer left-7 bg-neutral-50 dark:bg-neutral-900"
      />
    </div>
  );
};

export default ExchangeRate;
