import React, { Suspense, useState } from "react";
import ActionsBox from "../components/Assets/ActionsBox";
import DepositToman from "../components/Assets/DepositToman";
import Button from "../components/AuthenticationPage/Button";
import { useRecoilValue } from "recoil";
import { userToken } from "../atoms/userToken";
import RulesBox from "../components/Assets/RulesBox";
import { TiWarningOutline } from "react-icons/ti";
import { AnimatePresence } from "framer-motion";
import DepositCrypto from "../components/Assets/DepositCrypto";
import Loading from "../components/Loading";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../components/Error";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { Navigate } from "react-router-dom";

const DepositPage: React.FC = () => {
  // States
  const userTokenD = useRecoilValue(userToken);
  const [showRules, setShowRules] = useState<boolean>(false);
  const [currentForm, setCurrentForm] = useState<"toman" | "crypto">("crypto");
  // Conditions
  if (!userTokenD) return <Navigate to="/auth" replace />;
  return (
    <div className="w-full h-[93vh] overflow-y-scroll scrollbar-vertical py-2 px-4 flex flex-row gap-4 lg:max-h-[900px] overflow-hidden">
      <ActionsBox>
        <div className="w-full place-items-center grid grid-cols-2">
          <Button
            text="واریز رمز ارز"
            fullWidth
            outlined={currentForm != "crypto"}
            onClick={() => setCurrentForm("crypto")}
          />
          <Button
            text="واریز تومان"
            fullWidth
            onClick={() => setCurrentForm("toman")}
            outlined={currentForm != "toman"}
          />
        </div>
        <Suspense fallback={<Loading />}>
          <ErrorBoundary fallback={<Error />}>
            <AnimatePresence mode="wait">
              {currentForm == "toman" ? (
                <DepositToman
                  onRuleClick={(e) => {
                    setShowRules(true);
                  }}
                />
              ) : (
                <DepositCrypto onRuleClick={() => setShowRules(true)} />
              )}
            </AnimatePresence>
          </ErrorBoundary>
        </Suspense>
      </ActionsBox>

      <RulesBox show={showRules} onClose={() => setShowRules(false)}>
        <AnimatePresence mode="wait">
          {currentForm == "toman" ? (
            <motion.div
              key={nanoid()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, type: "tween" }}
              className="flex flex-col w-full gap-4"
            >
              <WarnBox content="کاربر گرامی، قبل از واریز تومان، از احراز شدن کارت بانکی خود در حساب کاربری اطمینان حاصل نمایید." />
              <WarnBox content="در صورت استفاده از VPN، تراکنش توسط بانک لغو خواهد شد." />
            </motion.div>
          ) : (
            <motion.div
              key={nanoid()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, type: "tween" }}
              className="flex flex-col w-full gap-14"
            >
              <div className="w-full bg-neutral-50 dark:bg-neutral-900 py-10 px-2 rounded-2xl flex flex-col gap-10 xl:flex-row items-center md:px-14 md:py-2 text-neutral-900 dark:text-neutral-50">
                <div className="flex flex-col gap-10">
                  <strong className="font-vazir font-bold text-sm">
                    مراحل واریز رمزارز :
                  </strong>
                  <div className="flex flex-col gap-6">
                    <span className="font-vazir font-normal text-sm md:text-base">
                      1. ابتدا رمزارز و شبکه ی انتقال خود را انتخاب کنید.
                    </span>
                    <span className="font-vazir font-normal text-sm md:text-base">
                      2. آدرس ولت نمایش داده شده را دریافت کنید و مقدار رمزارز
                      مورد نظر را در شبکه ی انتخابی به آن ارسال نمایید.
                    </span>
                    <span className="font-vazir font-normal text-sm md:text-base">
                      3. پس از انتقال رمزارز به آبانتتر، عبارت txid یا hash را
                      از قسمت جزئیات تراکنش در ولت مبدا دریافت نمایید و در کادر
                      مربوط به «کد تراکنش» جایگذاری کنید.
                    </span>
                    <span className="font-vazir font-normal text-sm md:text-base">
                      4. روی گزینه ثبت واریز بزنید و منتظر بمانید تا انتقال
                      تکمیل شود و ارز در موجودی حساب کاربری نمایش داده شود.
                    </span>
                  </div>
                </div>
                <div className="w-5/12 mx-auto xl:min-w-[300px]">
                  <img src="/svgs/astronaut.svg" className="w-full" />
                </div>
              </div>
              <WarnBox
                content="کاربر گرامی، از یکسان بودن آدرس و شبکه ی انتقال در ولت مبدا و مقصد اطمینان حاصل فرمایید.
در صورت مغایرت، امکان از بین رفتن رمزارز مذکور وجود دارد."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </RulesBox>
    </div>
  );
};

type WarnBoxT = {
  content: string;
};

export const WarnBox: React.FC<WarnBoxT> = ({ content }) => (
  <div className="flex flex-col items-center gap-8 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 md:flex-row md:py-[72px] md:px-6">
    <div className="text-[#FFA34F] flex flex-row gap-3 items-center">
      <TiWarningOutline className="text-5xl" />
      <span className="font-vazir font-bold text-2xl">هشدار</span>
    </div>
    <p
      className="font-vazir  font-normal text-sm md:text-base whitespace-pre-line"
      dangerouslySetInnerHTML={{ __html: content }}
    ></p>
  </div>
);

export default DepositPage;
