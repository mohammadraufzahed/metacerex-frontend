import { useSignal } from "@preact/signals-react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Button from "../components/AuthenticationPage/Button";
import DropboxSelect from "../components/DropboxSelect";
import { colorMode } from "../signals/colorMode";

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 300;
`;

export const AnimatedOverlay: React.FC<{ accepted: boolean }> = ({
  accepted,
}) => (
  <Overlay
    variants={{
      initial: {
        backgroundColor:
          colorMode.value == "dark"
            ? "rgba(23, 23, 23, 0.6)"
            : "rgba(163, 163, 163, 0.6)",
      },
      active: {
        backgroundColor:
          colorMode.value == "dark"
            ? "rgba(23, 23, 23, 0)"
            : "rgb(163, 163, 163, 0)",
        display: "none",
      },
    }}
    initial="initial"
    animate={accepted ? "active" : "initial"}
    transition={{ duration: 0.3, type: "tween" }}
  />
);

const AtiPage = () => {
  const descAccept = useSignal<boolean>(false);
  const isPicSelected = useSignal<boolean>(false);
  const selectedPercentage = useSignal<string | null>(null);
  return (
    <div className="w-full max-h-[83vh] pb-3 overflow-y-scroll scrollbar-vertical font-vazir grid grid-cols-1 gap-3 lg:grid-cols-2 lg:overflow-y-hidden">
      <div className="w-full bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 rounded-lg">
        <div className="w-full p-2 border-b-[1px] border-neutral-300 dark:border-neutral-600 drop-shadow-md">
          <span className="text-base font-bold">توضیحات</span>
        </div>
        <div className="w-full p-3 max-h-[67vh] overflow-y-scroll scrollbar-vertical md:h-[93vh]">
          <p className="font-normal text-xs text-justify leading-loose">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید
            سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
            چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
            و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود
            ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
            آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها
            شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و
            فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت
            که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان
            رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
            پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.لورم
            ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
            از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
            سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
            در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را
            می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
            صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
            شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی
            دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا
            مورد استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
            از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه
            روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
            تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی
            می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت
            فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
            برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان
            فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
            موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد
            نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
            دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.لورم ایپسوم متن
            ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان
            گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
            که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع
            با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
            درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا
            با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
            طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می
            توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت
            تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و
            جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار
            گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید
            سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
            چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
            و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود
            ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
            آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها
            شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و
            فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت
            که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان
            رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
            پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
          </p>
        </div>
        <div className="w-full px-2 bg-pri py-6 flex flex-row items-center justify-start gap-2 drop-shadow-2xl border-t-[1px] border-neutral-300 dark:border-neutral-600">
          <motion.div
            variants={{
              initial: {
                background:
                  colorMode.value == "dark"
                    ? "rgba(64, 64, 64, 0)"
                    : "rgb(255 255 255)",
              },
              active: {
                background:
                  colorMode.value == "dark"
                    ? "rgba(36, 196, 249, 1)"
                    : "rgb(8 103 136)",
              },
            }}
            initial="initial"
            onTap={() => (descAccept.value = !descAccept.value)}
            animate={descAccept.value ? "active" : "initial"}
            transition={{ duration: 0.4, type: "spring" }}
            className="w-6 h-6 rounded-sm cursor-pointer border-[1px] border-transparent dark:border-primary-700"
          />
          <span className="font-normal text-base">
            با تمامی مفاد ذکر شده موافقم.
          </span>
        </div>
      </div>
      <div className="w-full h-full gap-4 max-h-max lg:overflow-y-hidden items-center lg:min-w-[400px]">
        <div
          className={`w-full relative h-max py-7 px-4 flex flex-col gap-4 max-w-full overflow-x-hidden bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50  rounded-lg lg:h-[70%] ${
            descAccept ? "lg:overflow-y-scroll" : "lg:overflow-y-hidden"
          } scrollbar-vertical`}
        >
          <AnimatedOverlay accepted={descAccept.value} />
          <span className="font-bold text-base">متن تعهد نامه</span>
          <p className="font-normal text-base">
            اینجانب .......... با کد ملی ......... قصد معامله با سایت آبانتتر به
            آدرس abantether.com را دارم و مدارک لازم جهت احراز هویت در این سایت
            ارسال گردیده است. ضمنا متعهد میشوم که حساب بنده تحت اختیار خودم
            میباشد و حساب به شخصی اجاره داده نشده است و خرید را برای خودم انجام
            میدهم. <br />
            <br />
            (امضای شما) - (اثر انگشت شما) - (تاریخ)
          </p>
          <div className="flex flex-col  items-center mt-10 gap-10 lg:flex-row lg:gap-5 lg:mt-4">
            <div className="flex flex-col items-center w-max gap-4 lg:w-4/6">
              <span className="font-bold text-base">
                نمونه تصویر صحیح جهت آپلود
              </span>
              <img width={200} height={200} src="/svgs/profile.svg" />
            </div>
            <div className="w-full min-w-[250px] h-max flex flex-col gap-4 items-center border-dashed border-2 border-primary-700 dark:border-primary-500 py-7 xl:justify-self-end max-w-[50%] xl:py-12">
              {isPicSelected.value ? (
                <img src="/images/personal.png" className="w-[150px]" />
              ) : (
                <>
                  <img
                    src={`/svgs/gallery-${colorMode.value}.svg`}
                    className="mb-5"
                  />
                  <motion.div
                    initial={{ y: 0 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: -4 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className=""
                  >
                    <input
                      accept="image/png, image/gif, image/jpeg"
                      type="file"
                      id="file"
                      onClick={(e) => {
                        e.preventDefault();
                        isPicSelected.value = true;
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="file"
                      className="px-10 py-2 cursor-pointer bg-primary-700 dark:bg-primary-500 font-vazir font-normal text-base text-neutral-50 dark:text-neutral-900 rounded-lg"
                    >
                      بارگزاری تصویر
                    </label>
                  </motion.div>
                  <p className="font-vazir font-light text-xs text-center text-primary-700 dark:text-primary-500">
                    فایل انتخابی باید از نوع تصویر بوده و حجم آن کمتر از 2
                    مگابایت باشد
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-full relative grid grid-cols-1 lg:grid-cols-2 gap-x-3 rounded-lg px-2 py-4 flex-auto bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 mt-3 lg:h-[28%] lg:overflow-y-hidden">
          <AnimatedOverlay accepted={descAccept.value && isPicSelected.value} />
          <div className="flex flex-col gap-6">
            <span className="font-bold text-base">درصد از دارایی</span>
            <p className="font-normal text-xs">
              انتخاب درصد از داراییمان مورد نیاز شامل حروفچینی دستاوردهای اصلی،
              و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
              قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
              چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه
              روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط{" "}
            </p>
          </div>
          <div className=" flex flex-col h-full max-h-full items-center gap-6 lg:justify-between">
            <DropboxSelect
              list={[
                { text: "10%", value: "10" },
                { text: "20%", value: "20" },
                { text: "30%", value: "30" },
                { text: "40%", value: "40" },
                { text: "50%", value: "50" },
                { text: "60%", value: "60" },
                { text: "70%", value: "70" },
                { text: "80%", value: "80" },
                { text: "90%", value: "90" },
                { text: "100%", value: "100" },
              ]}
              onChange={(text) => (selectedPercentage.value = text)}
              placeholder={
                selectedPercentage.value
                  ? `${selectedPercentage.value} درصد`
                  : "درصد از دارایی"
              }
              enableSearch={false}
              maxHeight={100}
            />
            <Button text="ثبت و تایید" className="w-32 h-12 lg:self-end" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtiPage;
