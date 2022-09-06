import { motion } from "framer-motion";
import React from "react";
import { HiOutlineCreditCard } from "react-icons/hi";
import { IoAddCircleOutline } from "react-icons/io5";
import { getCards } from "../../functions/cards";
import NotFound from "../../components/NotFound";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type PropsT = {
  fieldUpdater: any;
  card_value: string;
};

const CardSelectBox: React.FC<PropsT> = ({ fieldUpdater, card_value }) => {
  // States
  const navigate = useNavigate();
  // Queries
  const cardsQuery = useQuery(["cards_deposit"], getCards);
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="font-vazir flex flex-row items-center gap-2.5 font-normal text-sm">
        <HiOutlineCreditCard className="text-xl" /> کارت های بانکی تایید شده شما
        :
      </span>
      {cardsQuery.data && cardsQuery.data.results ? (
        cardsQuery.data.results.map((item, key) => {
          let generatedCard = [...item.number].map((cardNumber, key) =>
            key > 5 && key < 14 ? "*" : cardNumber
          );
          let currectCard = "";
          for (let i = 0; i < generatedCard.length; i += 4) {
            currectCard += generatedCard.slice(i, i + 4).join("") + "-";
          }
          return (
            <div
              key={key}
              className="flex flex-row items-center w-full h-max gap-3"
            >
              <motion.div
                initial="idle"
                variants={{
                  selected: {
                    background: "rgba(8 103 136 1)",
                  },
                  hover: {
                    background: "rgba(8 103 136 0.5)",
                  },
                  idle: {
                    background: "rgba(8 103 136 0)",
                  },
                }}
                animate={card_value == item.number ? "selected" : "idle"}
                whileHover="hover"
                whileTap="selected"
                onTap={() =>
                  card_value !== item.number
                    ? fieldUpdater("selected_card", item.number)
                    : fieldUpdater("selected_card", "")
                }
                className="w-4 cursor-pointer h-4 border-2 rounded-full border-primary-700"
              />
              <span
                className="font-vazir mt-1 h-max font-bold text-primary-700 text-sm"
                dir="ltr"
              >
                {currectCard.slice(0, -1)}
              </span>
            </div>
          );
        })
      ) : (
        <NotFound text="کارت بانکی یافت نشد" />
      )}
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 1.05 }}
        onTap={() => navigate("/dashboard/profile/cards", { replace: true })}
        className="w-max flex flex-row gap-2.5 cursor-pointer text-primary-700 font-vazir font-light text-xs  items-center"
      >
        <IoAddCircleOutline className="text-xl" />
        <span className="border-b-[1px] border-primary-700/50 pb-0.5">
          افزودن کارت بانکی جدید
        </span>
      </motion.div>
    </div>
  );
};

export default CardSelectBox;
