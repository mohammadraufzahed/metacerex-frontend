import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import OnchainContent from "../components/Onchain/OnchainContent";
import Search from "../svgs/Search";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiX } from "react-icons/hi";
import { screen } from "../signals/screen";
import { effect, signal, useSignal } from "@preact/signals-react";
import { colorMode } from "../signals/colorMode";
import { useQuery } from "@tanstack/react-query";
import { getOnchainGroups } from "../functions/onchain";
import { OnchainEndpoints, OnchainTopGroup } from "../types/API";

export const sidebar = signal<boolean>(false);
export const cryptobox = signal<boolean>(false);
export const star = signal<boolean>(false);
export const activeEndpoint = signal<null | OnchainEndpoints>(null);

const OnchainPage = () => {
  // Signals
  // Effects
  useEffect(() => {
    if (screen.value.width > 1024 && sidebar.value != true) {
      sidebar.value = true;
    }
  }, [screen.value]);
  // Queries
  const groupsQuery = useQuery(["onchain_group"], getOnchainGroups);
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
        className="absolute z-[60] h-[99vh] w-8/12 top-[60px] right-0 overflow-hidden scrollbar-vertical rounded-t-xl drop-shadow-md bg-neutral-50 dark:bg-neutral-900 lg:right-14 xl:right-[unset] xl:top-[unset] xl:w-6/12 xl:relative lg:max-w-[500px] lg:h-[86vh]"
      >
        <div className="w-full py-4 px-2 flex flex-col gap-4 border-b-[1px] border-neutral-900 dark:border-neutral-50">
          <div className="w-full flex flex-row justify-end items-center cursor-pointer xl:hidden">
            <HiX
              className="text-2xl text-primary-700 dark:text-primary-500 "
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
                src={`/svgs/arrow-down-${colorMode.value}.svg`}
              />
              <div className="flex flex-row items-center gap-2 text-neutral-900 dark:text-neutral-50">
                <span>(BTC)</span>
                <span>Bitcoin</span>
                <img
                  src={
                    colorMode.value == "dark"
                      ? "/svgs/btc-white.svg"
                      : "/svgs/btc.svg"
                  }
                />
              </div>
            </div>
            <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 bg-ne900 overflow-y-scroll scrollbar-vertical rounded-b-xl max-h-full">
              {Array(100)
                .fill(null)
                .map((item, key) => (
                  <motion.div
                    variants={{
                      initial: {
                        background:
                          colorMode.value == "dark"
                            ? "rgba(23, 23, 23, 0)"
                            : "rgba(229 229 229 0)",
                      },
                      hover: {
                        background:
                          colorMode.value == "dark"
                            ? "rgba(23, 23, 23, 0.5)"
                            : "rgba(229 229 229 0.5)",
                      },
                      tap: {
                        background:
                          colorMode.value == "dark"
                            ? "rgba(23, 23, 23, 1)"
                            : "rgba(229 229 229 1)",
                      },
                    }}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onTap={() => (cryptobox.value = false)}
                    className="w-full font-vazir font-normal text-neutral-900 dark:text-neutral-50 cursor-pointer text-base flex items-center justify-end px-4 py-2 gap-1"
                    key={key}
                  >
                    <span>(BTC)</span>
                    <span>Bitcoin</span>
                    <img
                      width={20}
                      src={
                        colorMode.value == "dark"
                          ? "/svgs/btc-white.svg"
                          : `/svgs/btc.svg`
                      }
                    />
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
              className="w-full font-vazir font-normal text-sm h-10 outline-none text-left px-4 py-2 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 placeholder:text-neutral-900 dark:text-neutral-50 dark:placeholder:text-neutral-50"
              placeholder="Search Metrics"
            />
            <Search className="absolute cursor-pointer top-2 right-2 stroke-neutral-900 dark:stroke-neutral-50" />
          </div>
        </div>
        <div className="w-full h-full overflow-y-scroll scrollbar-vertical relative">
          {groupsQuery.data &&
            groupsQuery.data.map((item, key) => (
              <OnchainItem data={item} key={key} />
            ))}
        </div>
      </motion.div>
      <OnchainContent />
    </div>
  );
};

type OnchainItemT = {
  data: OnchainTopGroup;
};

const OnchainItem: React.FC<OnchainItemT> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="w-full">
      <motion.div
        variants={{
          initial: {
            backgroundColor:
              colorMode.value == "dark"
                ? "rgba(38 38 38 0)"
                : "rgba(237 243 245 0)",
          },
          hover: {
            backgroundColor:
              colorMode.value == "dark"
                ? "rgba(38 38 38 0.5)"
                : "rgba(237 243 245 0.5)",
          },
          tap: {
            backgroundColor:
              colorMode.value == "dark"
                ? "rgba(38 38 38 1)"
                : "rgba(237 243 245 1)",
          },
        }}
        onTap={() => setOpen(true)}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className="py-6 cursor-pointer px-4 flex flex-row items-center justify-between border-b-[1px] border-neutral-300 dark:border-neutral-700 bg-neu800"
      >
        <div className=" py-1 px-1.5 flex items-center justify-center">
          <span className="font-vazir font-normal text-sm text-neutral-900 dark:text-neutral-50">
            {data.middle_groups ? data.middle_groups.length : 0}
          </span>
        </div>

        <div className="flex flex-row gap-2.5 items-center">
          <span className="font-vazir font-normal text-sm text-neutral-900 dark:text-neutral-50">
            {data.name}
          </span>
          {/* <img width={16} src={data.icon} /> */}
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
        className="fixed h-full overflow-scroll scrollbar-vertical w-full bg-neutral-50 dark:bg-neutral-900 top-0"
      >
        <div className="w-full flex items-center justify-end px-6 py-4 border-b-[1px] border-b-neutral-900 dark:border-b-neutral-50 gap-2.5">
          <span className="text-neutral-900 dark:text-neutral-50">
            {data.name}
          </span>
          <AiOutlineArrowLeft
            className="cursor-pointer text-neutral-900 dark:text-neutral-50"
            onClick={() => setOpen(false)}
          />
        </div>
        {data.middle_groups && data.middle_groups.length ? (
          data.middle_groups.map((item, key) => {
            const [childOpen, setChildOpen] = useState<boolean>(false);
            return (
              <div key={key} className="w-full flex flex-col gap-1 px-6 py-2">
                <motion.div
                  variants={{
                    initial: {
                      background:
                        colorMode.value == "dark"
                          ? "rgba(38 38 38 0)"
                          : "rgba(229 229 229 0)",
                    },
                    hover: {
                      background:
                        colorMode.value == "dark"
                          ? "rgba(38 38 38 0.5)"
                          : "rgba(229 229 229 0.5)",
                    },
                    tap: {
                      background:
                        colorMode.value == "dark"
                          ? "rgba(38 38 38 1)"
                          : "rgba(229 229 229 1)",
                    },
                  }}
                  onTap={() => setChildOpen((childOpen) => !childOpen)}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="h-10 text-neutral-900  dark:text-neutral-50 w-full cursor-pointer bg-neu flex flex-row justify-end items-center gap-2"
                >
                  <span>{item.name}</span>
                  <img width={16} src={`/svgs/folder-${colorMode.value}.svg`} />
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
                  {item.endpoints
                    ? item.endpoints.map((item, key) => (
                        <div
                          key={key}
                          className="w-full overflow-hidden cursor-pointer flex flex-row items-center justify-end font-vazir font-normal text-sm px-2.5 h-max border-l-[1px] border-neutral-300 dark:border-neutral-600 gap-2.5"
                          onClick={() => (activeEndpoint.value = item)}
                        >
                          <span className="text-neutral-900 dark:text-neutral-50">
                            {item.name}
                          </span>
                          <div className="bg-neutral-300 dark:bg-neutral-600 dark:text-neutral-50 w-max p-0.5">
                            <span>T{item.tier}</span>
                          </div>
                        </div>
                      ))
                    : null}
                </motion.div>
              </div>
            );
          })
        ) : (
          <div className="w-full flex flex-col items-center gap-12 py-10">
            <img src="/svgs/folder-favorite.svg" />
            <span className="font-vazir font-normal text-sm text-neutral-400 dark:text-neutral-600">
              Your {data.name} metrics will be shown here
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OnchainPage;
