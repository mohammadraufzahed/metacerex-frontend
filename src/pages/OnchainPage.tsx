import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OnchainContent from "../components/Onchain/OnchainContent";
import Search from "../svgs/Search";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiX } from "react-icons/hi";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { screen } from "../signals/screen";
import { signal } from "@preact/signals-react";

type data = {
  name: string;
  icon: string;
  count: number;
  child: {
    name: string;
    child: string[];
  }[];
};

const fakeData: data[] = [
  {
    name: "Favorites",
    icon: "/svgs/star.svg",
    count: 0,
    child: [],
  },
  ...Array(20).fill({
    name: "Addresses",
    icon: "/svgs/wallet.svg",
    count: 0,
    child: Array(30).fill({
      name: "Address Activity",
      child: ["Active Addresses", "Sending Addresses", "Recieving Addresses"],
    }),
  }),
];

export const sidebar = signal<boolean>(false);
export const cryptobox = signal<boolean>(false);
export const star = signal<boolean>(false);

const OnchainPage = () => {
  // Effects
  useEffect(() => {
    if (screen.value.width > 1024 && sidebar.value != true) {
      sidebar.value = true;
    }
  }, [screen.value]);
  return (
    <div className="w-full max-h-[92vh] overflow-y-scroll scrollbar-vertical flex py-2 gap-4 px-4">
      <motion.div
        variants={{
          show: {
            x: 0,
            display: "block",
          },
          hide: {
            x: "70vh",
            display: "none",
          },
        }}
        animate={sidebar.value ? "show" : "hide"}
        transition={{ duration: 0.5 }}
        className="absolute z-[60] h-[99vh] w-8/12 top-[60px] right-0 overflow-hidden scrollbar-vertical rounded-t-xl drop-shadow-md bg-neutral-50 lg:right-14 xl:right-[unset] xl:top-[unset] xl:w-6/12 xl:relative lg:max-w-[500px] lg:h-[86vh]"
      >
        <div className="w-full py-4 px-2 flex flex-col gap-4 border-b-[1px] border-black">
          <div className="w-full flex flex-row justify-end items-center cursor-pointer xl:hidden">
            <HiX
              className="text-2xl text-primary-700 "
              onClick={() => {
                sidebar.value = false;
              }}
            />
          </div>
          <motion.div
            variants={{
              close: { height: 46.23 },
              open: { height: 300 },
            }}
            transition={{ duration: 0.4, type: "tween" }}
            initial="close"
            animate={cryptobox.value ? "open" : "close"}
            className="overflow-y-hidden relative"
          >
            <div
              className="w-full h-[46.23px] cursor-pointer flex items-center justify-between border-[1px] py-2.5 px-4"
              onClick={() => (cryptobox.value = !cryptobox.value)}
            >
              <motion.img
                variants={{
                  initial: {
                    rotate: 0,
                  },
                  open: {
                    rotate: 180,
                  },
                }}
                initial="initial"
                animate={cryptobox.value ? "open" : "initial"}
                src="/svgs/arrow-down.svg"
              />
              <div className="flex flex-row items-center gap-2">
                <span>(BTC)</span>
                <span>Bitcoin</span>
                <img src="/svgs/btc.svg" />
              </div>
            </div>
            <div className="w-full h-full bg-neutral-100 overflow-y-scroll scrollbar-vertical rounded-b-xl max-h-full">
              {Array(100)
                .fill(null)
                .map((item, key) => (
                  <motion.div
                    variants={{
                      initial: {
                        background: "rgb(229 229 229 0)",
                      },
                      hover: {
                        background: "rgb(229 229 229 0.5)",
                      },
                      tap: {
                        background: "rgb(229 229 229 1)",
                      },
                    }}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onTap={() => (cryptobox.value = false)}
                    className="w-full font-vazir font-normal cursor-pointer text-base flex items-center justify-end px-4 py-2 gap-1"
                    key={key}
                  >
                    <span>(BTC)</span>
                    <span>Bitcoin</span>
                    <img width={20} src="/svgs/btc.svg" />
                  </motion.div>
                ))}
            </div>
          </motion.div>
          <div className="w-full relative">
            <motion.input
              variants={{
                initial: {
                  borderWidth: 1,
                },
                focus: {
                  borderWidth: 2,
                },
                hover: {
                  borderWidth: 1.5,
                },
              }}
              initial="initial"
              whileFocus="focus"
              whileHover="hover"
              className="w-full font-vazir font-normal text-sm h-10 outline-none text-left px-4 py-2"
              placeholder="Search Metrics"
            />
            <Search className="absolute cursor-pointer top-2 right-2 stroke-neutral-500" />
          </div>
        </div>
        <div className="w-full h-full overflow-y-scroll scrollbar-vertical relative">
          {fakeData.map((item, key) => (
            <OnchainItem data={item} key={key} />
          ))}
        </div>
      </motion.div>
      <OnchainContent />
    </div>
  );
};

type OnchainItemT = {
  data: data;
};

const OnchainItem: React.FC<OnchainItemT> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="w-full">
      <motion.div
        variants={{
          initial: {
            background: "rgba(237, 243, 245 0)",
          },
          hover: {
            background: "rgba(237, 243, 245 0.5)",
          },
          tap: {
            background: "rgba(237, 243, 245 1)",
          },
        }}
        onTap={() => setOpen(true)}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className="py-6 cursor-pointer px-4 flex flex-row items-center justify-between border-b-[1px] border-neutral-300"
      >
        <div className=" py-1 px-1.5 flex items-center justify-center">
          <span className="font-vazir font-normal text-sm">{data.count}</span>
        </div>

        <div className="flex flex-row gap-2.5 items-center">
          <span className="font-vazir font-normal text-sm">{data.name}</span>
          <img width={16} src={data.icon} />
        </div>
      </motion.div>
      <motion.div
        variants={{
          hide: {
            display: "none",
            opacity: 0,
          },
          show: {
            display: "block",
            opacity: 1,
          },
        }}
        initial="hide"
        animate={open ? "show" : "hide"}
        transition={{ duration: 0.3, type: "tween" }}
        className="fixed h-full overflow-scroll scrollbar-vertical w-full bg-neutral-50 top-0"
      >
        <div className="w-full flex items-center justify-end px-6 py-4 border-b-[1px] gap-2.5">
          <span>{data.name}</span>
          <AiOutlineArrowLeft
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        {data.child.length !== 0 ? (
          data.child.map((item, key) => {
            const [childOpen, setChildOpen] = useState<boolean>(false);
            return (
              <div key={key} className="w-full flex flex-col gap-1 px-6 py-2">
                <motion.div
                  variants={{
                    initial: {
                      background: "rgba(229 229 229 0)",
                    },
                    hover: {
                      background: "rgba(229 229 229 0.5)",
                    },
                    tap: {
                      background: "rgba(229 229 229 1)",
                    },
                  }}
                  onTap={() => setChildOpen((childOpen) => !childOpen)}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="h-10 w-full cursor-pointer bg-neu flex flex-row justify-end items-center gap-2"
                >
                  <span>{item.name}</span>
                  <img width={16} src="/svgs/folder.svg" />
                </motion.div>

                <motion.div
                  variants={{
                    hide: {
                      height: 0,
                    },
                    show: {
                      height: "max-content",
                    },
                  }}
                  initial="hide"
                  animate={childOpen ? "show" : "hide"}
                  className="w-full flex flex-col gap-1"
                >
                  {item.child.map((item, key) => (
                    <div
                      key={key}
                      className="w-full overflow-hidden cursor-pointer flex flex-row items-center justify-end font-vazir font-normal text-sm px-2.5 h-max border-l-[1px] border-neutral-300 gap-2.5"
                    >
                      <span>{item}</span>
                      <div className="bg-neutral-300 w-max p-0.5">
                        <span>T1</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            );
          })
        ) : (
          <div className="w-full flex flex-col items-center gap-12 py-10">
            <img src="/svgs/folder-favorite.svg" />
            <span className="font-vazir font-normal text-sm text-neutral-400">
              Your {data.name} metrics will be shown here
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OnchainPage;
