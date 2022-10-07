import React, { MouseEventHandler, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsFillXCircleFill, BsX } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import Modal from "react-modal";
import { QRCodeSVG } from "qrcode.react";
import { nanoid } from "nanoid";
import AnimatedCopy from "../../../svgs/AnimatedCopy";
import { useSignal } from "@preact/signals-react";
import useCustomToast from "../../../hooks/useCustomToast";
import Button from "../../AuthenticationPage/Button";
import { useQuery } from "@tanstack/react-query";
import { getTOTPState } from "../../../functions/toptp";
import { TOTPState } from "../../../types/API";
import { httpClient } from "../../../axios";
import Input from "../../Input";
import { useRecoilState } from "recoil";
import { twofactoryState } from "../../../atoms/twofactoryState";
import { colorMode } from "../../../signals/colorMode";

Modal.setAppElement("#root");

const TwoSecActivateBox: React.FC = () => {
  // States
  const active = useSignal<boolean>(false);
  const copied = useSignal<number>(0);
  const modalOpen = useSignal<boolean>(false);
  const totp = useSignal<TOTPState | null>(null);
  const [totpState, setTotpState] = useRecoilState(twofactoryState);
  const loading = useSignal<boolean>(false);
  const totpCode = useSignal<string>("");
  const type = useSignal<"enable" | "disable">("enable");
  // Queries
  const totpQuery = useQuery(["totp"], getTOTPState, {
    refetchOnMount: true,
  });
  // Effects
  useEffect(() => {
    if (totpQuery.data) {
      active.value = totpQuery.data.is_totp_enabled;
      totp.value = totpQuery.data;
    }
  }, [totpQuery.data]);
  return (
    <div className="flex flex-col bg-neutral-50 dark:bg-neutral-900 w-full rounded-2xl items-center justify-center py-2 gap-4 md:flex-row md:justify-between md:px-8 md:py-7">
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-7">
        <img src="/svgs/2af.svg" width={32} height={32} />
        <div className="font-vazir font-bold text-sm text-neutral-900 dark:text-neutral-50">
          <span>احراز هویت دو عاملی: </span>
          <span>غیر فعال</span>
        </div>
      </div>
      <AnimatedCheckBox
        active={active.value}
        onClick={() => {
          if (!active.value) {
            httpClient
              .post("users/totp/state/", { state: "create" })
              .then((res) => {
                if (res.status == 200) {
                  totp.value = res.data;
                  modalOpen.value = true;
                  type.value = "enable";
                } else {
                  useCustomToast(
                    "bottom-right",
                    "error",
                    "فعال سازی کد دو عاملی با مشکل مواجه شد."
                  );
                }
              });
          } else {
            alert(true);
            modalOpen.value = true;
            type.value = "disable";
          }
          active.value = !active.value;
        }}
      />
      <Modal
        isOpen={modalOpen.value}
        className="relative  outline-none border-0"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, type: "tween" }}
          className="absolute bottom-0 w-[90vw] h-[80vh] top-[60px] left-0 right-0 mx-auto scrollbar-vertical text-shades-100/70 flex flex-col items-center bg-neutral-50/80 dark:bg-neutral-900/80 drop-shadow-lg rounded-3xl py-16 outline-none border-0 px-4 font-vazir  overflow-y-scroll  lg:h-[90vh] justify-center"
        >
          <BsX
            className="text-3xl absolute right-4 top-5 cursor-pointer text-neutral-900 dark:text-neutral-50"
            onClick={() => (modalOpen.value = false)}
          />
          <h1 className="text-2xl font-extrabold md:text-3xl text-neutral-900 dark:text-neutral-50">
            {type.value == "enable"
              ? "فعال سازی کد شناسایی دوعاملی"
              : "غیر فعال سازی کد شناسایی دوعاملی"}
          </h1>
          <div
            className={`w-max h-max p-4 rounded-2xl drop-shadow-md bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center gap-4 mt-10 lg:mt-14 ${
              type.value == "disable" ? "hidden" : ""
            }`}
          >
            <QRCodeSVG
              bgColor={colorMode.value == "dark" ? "" : "#ffffff"}
              fgColor={colorMode.value == "dark" ? "#ffffff" : "#171717"}
              value={totp.value ? totp.value.url : ""}
              className="w-[200px] stroke-ne h-[200px] bg-neu md:w-[300px] md:h-[300px]"
            />
            <p className="font-bold text-base text-neutral-900 dark:text-neutral-50">
              لطفا کد بالا را اسکن کنید
            </p>
          </div>
          <div
            className={`flex flex-col mt-6 gap-3 items-center ${
              type.value == "disable" ? "hidden" : ""
            }`}
          >
            <p className="text-neutral-900 dark:text-neutral-50">
              درصورت نیاز میتونید با استفاده از کد زیر این ویژگی رو فعال کنید:
            </p>
            <div className="w-full min-w-max max-w-max gap-4 bg-neutral-50 dark:bg-neutral-900 drop-shadow-md font-normal flex flex-row justify-between py-2 px-7 rounded-lg text-neutral-900 dark:text-neutral-50">
              <span>{totp.value ? totp.value.secret : ""}</span>
              <AnimatedCopy
                className="cursor-pointer stroke-neutral-900 dark:stroke-neutral-50"
                copied={copied.value}
                onClick={() => {
                  navigator.clipboard.writeText(
                    totp.value ? totp.value.secret : ""
                  );
                  useCustomToast(
                    "bottom-right",
                    "success",
                    "کد فعال سازی با موفقیت کپی شد."
                  );
                  copied.value = 1;
                  setTimeout(() => (copied.value = 0), 2500);
                }}
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-center gap-2 max-w-xs my-6">
            <Input
              id="code"
              name="code"
              value={totpCode.value}
              onChange={({ currentTarget }) =>
                (totpCode.value = (currentTarget as HTMLInputElement).value)
              }
              type="text"
              isPrimary
              label="کد دوعاملی"
              placeholder="کد فعالسازی"
              fullWidth
            />
          </div>
          <Button
            text={type.value == "enable" ? "انجام شد" : "تایید"}
            loading={loading.value}
            onClick={() => {
              loading.value = true;
              httpClient
                .post("users/totp/state/", {
                  state: type.value,
                  otp: totpCode.value,
                })
                .then((res) => {
                  if (res.status == 200) {
                    modalOpen.value = false;
                    setTotpState(true);
                    totpQuery.refetch();
                  } else {
                    useCustomToast(
                      "bottom-right",
                      "error",
                      "فعال سازی کد دو عاملی با مشکل مواجه شد."
                    );
                  }
                  loading.value = false;
                });
            }}
            className="w-5/12 max-w-md"
          />
        </motion.div>
      </Modal>
    </div>
  );
};

type AnimatedCheckBoxT = {
  active: boolean;
  onClick: MouseEventHandler;
  className?: string;
};

export const AnimatedCheckBox: React.FC<AnimatedCheckBoxT> = ({
  active,
  onClick,
  className,
}) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  return (
    <motion.div
      variants={{
        active: {
          background:
            colorMode.value == "dark" ? "rgb(36 196 249)" : "rgb(8 103 136)",
        },
        deactive: {
          background:
            colorMode.value == "dark"
              ? "rgba(229 229 229 0)"
              : "rgb(212 212 212)",
        },
      }}
      animate={active ? "active" : "deactive"}
      className={`${className} border-transparent dark:border-primary-500 border-[1px] w-16 h-7 rounded-2xl ${
        disabled ? "cursor-wait" : "cursor-pointer"
      }`}
      onClick={(e) => {
        if (!disabled) {
          onClick(e);
          setDisabled(true);
          setTimeout(() => setDisabled(false), 900);
        }
      }}
    >
      <motion.div
        variants={{
          active: {
            x: -40,
            y: 4,
            color:
              colorMode.value == "dark"
                ? "rgb(255, 255, 255)"
                : "rgb(250 250 250)",
          },
          deactive: {
            y: 4,
            x: -3,
            color:
              colorMode.value == "dark"
                ? "rgb(255, 255, 255)"
                : "rgb(163, 163, 163)",
          },
        }}
        transition={{ duration: 1, type: "spring" }}
        animate={active ? "active" : "deactive"}
        initial={{ y: 4, x: -3 }}
      >
        {!active ? (
          <BsFillXCircleFill className="text-xl" />
        ) : (
          <AiFillCheckCircle className="text-xl" />
        )}
      </motion.div>
    </motion.div>
  );
};

export default TwoSecActivateBox;
