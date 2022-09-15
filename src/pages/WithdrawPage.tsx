import { AnimatePresence, motion } from "framer-motion";
import React, { Suspense, useState } from "react";
import ActionsBox from "../components/Assets/ActionsBox";
import RulesBox from "../components/Assets/RulesBox";
import WithdrawToman from "../components/Assets/WithdrawToman";
import Button from "../components/AuthenticationPage/Button";
import { FiClock } from "react-icons/fi";
import WithdrawCrypto from "../components/Assets/WithdrawCrypto";
import { WarnBox } from "./DepositPage";
import { useRecoilValue } from "recoil";
import { userToken } from "../atoms/userToken";
import LoginRequiredPage from "./LoginRequiredPage";
import Loading from "../components/Loading";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../components/Error";
import { nanoid } from "nanoid";
import { Navigate } from "react-router-dom";

const WithdrawPage = () => {
  // States
  const [currentForm, setCurrentForm] = useState<"toman" | "crypto">("crypto");
  const [ruleOpen, setRuleOpen] = useState<boolean>(false);
  const userTokenD = useRecoilValue(userToken);
  // Condition
  if (!userTokenD) return <Navigate to="/auth" replace />;
  return (
    <div className="flex-auto h-max w-full py-2 px-4 flex flex-row gap-4">
      <ActionsBox>
        <div className="w-full grid grid-cols-2 place-items-center">
          <Button
            text="برداشت رمز ارز"
            fullWidth
            outlined={currentForm != "crypto"}
            onClick={() => setCurrentForm("crypto")}
          />
          <Button
            text="برداشت تومان"
            fullWidth
            outlined={currentForm != "toman"}
            onClick={() => setCurrentForm("toman")}
          />
        </div>
        <Suspense fallback={<Loading />}>
          <ErrorBoundary fallback={<Error />}>
            <AnimatePresence mode="wait">
              {currentForm == "toman" ? (
                <WithdrawToman onRuleClick={() => setRuleOpen(true)} />
              ) : (
                <WithdrawCrypto onRuleClick={() => setRuleOpen(true)} />
              )}
            </AnimatePresence>
          </ErrorBoundary>
        </Suspense>
      </ActionsBox>
      <RulesBox show={ruleOpen} onClose={() => setRuleOpen(false)}>
        <AnimatePresence mode="wait">
          {currentForm == "toman" ? (
            <motion.div
              key={nanoid()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, type: "tween" }}
              className="flex flex-col w-full gap-12 rounded-lg bg-neutral-50 py-10 md:px-3"
            >
              <div className="flex flex-row self-start gap-2 items-center text-primary-700">
                <FiClock className="text-2xl" />
                <span className="font-vazir font-bold text-sm">
                  زمان بندی واریز به حساب
                </span>
              </div>
              <div className="flex flex-col gap-9">
                <UnorderListItem text="برداشت تومان تا قبل از ساعت 18 عصر، در همان روز تسویه می شود." />
                <UnorderListItem text="برداشت های ثبت شده در روزهای تعطیل، در اولین روز کاری بعد از تعطیلات با اولین سیکل پایا طبق زمان بندی ارسال می شوند." />
                <span className="font-vazir font-normal text-sm self-start">
                  زمانبندی واریز به حساب در روز های غیر تعطیل:
                </span>
                <UnorderListItem text="برداشت بین ساعت 23 تا 09:30 صبح: تسویه در ساعت 10:45 الی 11:30" />
                <UnorderListItem text="برداشت بین ساعت 09:30 تا 12:30 ظهر: تسویه در ساعت 13:45 الی 14:30" />
                <UnorderListItem text="برداشت بین ساعت 12:30 تا 18:00 عصر: تسویه در ساعت 18:45 الی 19:30" />
                <UnorderListItem
                  text="
برداشت بین ساعت 18:00 تا 23 شب: تسویه در ساعت 3:45 الی 4:30 صبح روز بعد"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={nanoid()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, type: "tween" }}
              className="flex flex-col gap-4 lg:max-h-[900px] overflow-hidden"
            >
              <div className="w-full bg-neutral-50 py-10 px-2 rounded-2xl flex flex-col gap-10 xl:flex-row items-center md:px-14 md:py-8 md:h-[400px]">
                <div className="flex flex-col gap-10">
                  <strong className="font-vazir font-bold text-sm">
                    مراحل برداشت رمزارز :
                  </strong>
                  <div className="flex flex-col gap-6">
                    <span className="font-vazir font-normal text-sm md:text-base">
                      1. ابتدا رمزارز مورد نظر را انتخاب نموده و آدرس ولت خود را
                      در قسمت مربوط به آدرس وارد کنید.
                    </span>
                    <span className="font-vazir font-normal text-sm md:text-base">
                      2. با توجه به آدرس و شبکه ی موجود در ولت مقصد، شبکه ی
                      انتقال را انتخاب نمایید.
                    </span>
                    <span className="font-vazir font-normal text-sm md:text-base">
                      3. تعداد رمزارز مورد نظر را در قسمت «مقدار» وارد کنید. در
                      نهایت ثبت برداشت را بزنید و منتظر بمانید تا برداشت شما
                      تکمیل شود.
                    </span>
                  </div>
                </div>
                <div className="block md:hidden xl:block mx-auto md:min-w-[300px]">
                  <img src="/svgs/astronaut.svg" className="w-full" />
                </div>
              </div>
              <WarnBox
                content={`کاربر گرامی، از یکسان بودن آدرس و شبکه ی انتقال در ولت مبدا و مقصد اطمینان حاصل فرمایید.
در صورت مغایرت، امکان از بین رفتن رمزارز مذکور وجود دارد.


کاربران گرامی، آگهی‌های اینترنتی کسب درآمد، کاملا با هدف کلاهبرداری و سوءاستفاده از مشخصات هویتی شما انجام می‌شوند. بنابراین جهت جلوگیری از مواجه شدن با اتهاماتی نظیر «پولشویی» یا «مشارکت در دزدی» به هیچ عنوان برای دیگران خرید و فروش و برداشت انجام ندهید. مسئولیت هرگونه تخلف به عهده‌ی صاحب حساب می‌باشد و آبان‌تتر هیچ مسئولیتی در این زمینه ندارد.
`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </RulesBox>
    </div>
  );
};

type UnorderListItemT = {
  text: string;
};

export const UnorderListItem: React.FC<UnorderListItemT> = ({ text }) => (
  <div className="font-vazir font-normal items-start flex flex-row gap-2 text-sm">
    <div className="w-[3px] h-[3px] rounded-full bg-black mt-2" />
    <span>{text}</span>
  </div>
);

export default WithdrawPage;
