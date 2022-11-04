import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BankCardBox from "../Boxes/BankCardBox";
import { AiOutlinePlus } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { getCards } from "../../../functions/cards";
import { Card } from "../../../types/API";
import { Helmet } from "react-helmet";
import { useSignal } from "@preact/signals-react";
import { colorMode } from "../../../signals/colorMode";

const BankCardsForm: React.FC = () => {
  // States
  const [cards, setCards] = useState<Card[]>([]);
  // Queries
  const cardsQuery = useQuery(["cards"], getCards);
  // Effects
  useEffect(() => {
    if (cardsQuery.data) {
      if (cardsQuery.data.results.length > 0) {
        setCards(cardsQuery.data.results);
      }
    }
  }, [cardsQuery.data]);
  return (
    <>
      <Helmet>
        <title>صرافی - کارت های بانکی</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="py-2 flex flex-col gap-6 md:gap-8"
      >
        {cards.map((item) => (
          <BankCardBox card={item} newCard={item.number == ""} />
        ))}
        <motion.div
          variants={{
            idle: {
              color:
                colorMode.value == "dark"
                  ? "rgb(36 196 249)"
                  : "rgb(8 103 136)",
              background:
                colorMode.value == "dark"
                  ? "rgba(36 196 249 0)"
                  : "rgba(0 0 0 0)",
            },
            hover: {
              color: "rgb(255 255 255)",
              background:
                colorMode.value == "dark"
                  ? "rgba(36 196 249 0.8)"
                  : "rgba(8 103 136 0.8)",
            },
            focus: {
              color: "rgb(255 255 255)",
              background:
                colorMode.value == "dark"
                  ? "rgba(36 196 249 1)"
                  : "rgba(8 103 136 1)",
            },
          }}
          whileHover="hover"
          whileTap="focus"
          initial="idle"
          animate="idle"
          transition={{ duration: 0.7, type: "spring" }}
          onTap={() => {
            if (cards) {
              setCards((cards) => [
                ...cards,
                {
                  id: 1,
                  is_active: false,
                  number: "",
                  is_verified: false,
                  sheba: "",
                },
              ]);
            }
          }}
          className="font-vazir bg-pri font-bold cursor-pointer text-xl flex flex-row items-center justify-center gap-5 border-[1px] border-primary-700 dark:border-primary-500 rounded-2xl py-3 md:py-11"
        >
          <AiOutlinePlus />
          <span>افزودن حساب بانکی جدید</span>
        </motion.div>
      </motion.div>
    </>
  );
};

export default BankCardsForm;
