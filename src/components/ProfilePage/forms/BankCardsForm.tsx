import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BankCardBox from "../Boxes/BankCardBox";
import { AiOutlinePlus } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { getCards } from "../../../functions/cards";
import { Card } from "../../../types/API";
import { Helmet } from "react-helmet";

const BankCardsForm: React.FC = () => {
  // States
  const [cards, setCards] = useState<Card[]>([]);
  // Queries
  const cardsQuery = useQuery(["cards"], getCards);
  // Effects
  useEffect(() => {
    if (cardsQuery.data) {
      setCards(cardsQuery.data.results);
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
        {cards
          ? cards.map((item) => (
              <BankCardBox card={item} newCard={item.number == ""} />
            ))
          : null}
        <motion.div
          variants={{
            idle: {
              color: "#086788",
              background: "rgba(0 0 0 0)",
            },
            hover: {
              color: "#ffffff",
              background: "rgba(8 103 136 0.8)",
            },
            focus: {
              color: "#ffffff",
              background: "rgba(8 103 136 1)",
            },
          }}
          whileHover="hover"
          whileTap="focus"
          initial="idle"
          animate="idle"
          transition={{ duration: 0.7, type: "spring" }}
          onTap={() =>
            setCards([
              ...cards,
              {
                id: 1,
                is_active: false,
                number: "",
                is_verified: false,
                sheba: "",
              },
            ])
          }
          className="font-vazir font-bold cursor-pointer text-xl flex flex-row items-center justify-center gap-5 border-[1px] border-primary-700 rounded-2xl py-3 md:py-11"
        >
          <AiOutlinePlus />
          <span>افزودن حساب بانکی جدید</span>
        </motion.div>
      </motion.div>
    </>
  );
};

export default BankCardsForm;
