import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { setFavAsset } from "../../functions/assets";
import { tradingview } from "../../signals/tradingview";
import { TickerTable } from "../../types/API";

type PropsT = {
  onFavTap: () => void;
};

const ListItem: React.FC<TickerTable & PropsT> = ({
  onFavTap,
  base_asset,
  price,
}) => {
  return (
    <motion.tr
      initial={{ x: "50vw", scale: 1 }}
      animate={{ x: 0 }}
      exit={{ x: "50vw" }}
      whileHover={{
        scale: 1.005,
      }}
      whileTap={{ scale: 1.01 }}
      key={base_asset.name}
      transition={{ duration: 0.3, type: "tween" }}
      onTap={() => {
        if (base_asset.code !== "TOMAN") {
          tradingview.value = base_asset.code;
        }
      }}
      onDoubleClick={() => {
        setFavAsset(base_asset.code).then(() => {
          onFavTap();
        });
      }}
      className='font-vazir cursor-pointer font-normal relative h-[23px] text-xs text-neutral-900 after:content-[""] after:w-full after:h-[1px] after:bg-neutral-200 after:absolute after:left-0 after:-bottom-2'
    >
      <td className="flex flex-row items-center self-start justify-start">
        <img src={base_asset.icon} width={14} />
        <span className="mx-2">{base_asset.code}</span>
      </td>
      <td className="text-center">{price}</td>
      <td className="flex flex-row gap-2 justify-center">
        <Button type="buy" />
        <Button type="sell" />
      </td>
    </motion.tr>
  );
};

type ButtonT = {
  type: "sell" | "buy";
};

const Button: React.FC<ButtonT> = ({ type }) => {
  const navigate = useNavigate();
  return (
    <motion.button
      className={`text-white ${
        type == "buy" ? "bg-success" : "bg-error"
      } rounded-3xl px-4 py-0.5`}
      whileHover={{ scale: 1.05 }}
      whileFocus={{ scale: 1.07 }}
      transition={{ type: "spring", duration: 0.5 }}
      onTap={() => {
        if (type == "sell") {
          navigate("/dashboard/market/sell", { replace: true });
        } else if (type == "buy") {
          navigate("/dashboard/market/buy", { replace: true });
        }
      }}
    >
      {type == "sell" ? "فروش" : "خرید"}
    </motion.button>
  );
};

export default ListItem;
