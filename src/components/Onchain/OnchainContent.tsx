import React from "react";
import TradingView from "../TradingView";
import OnchainActions from "./OnchainActions";

const OnchainContent = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <OnchainActions />
      <div className="w-full h-5/6 min-h-[500px] max-h-[800px]">
        <TradingView />
      </div>
      <div className="w-full bg-neutral-50 font-vazir text-sm lg:text-base rounded-t-lg">
        <div className="w-full p-2 border-b-[1px] border-black">
          <span className="font-bold">مشخصات متریک</span>
        </div>
        <div className="p-4 flex flex-col gap-6">
          <p className="font-normal text-justify">
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
            طراحی اساسا مورد استفاده قرار گیرد.
          </p>
          <div className="flex flex-col gap-2">
            <span className="font-bold">دارایی</span>
            <span className="font-normal">بیت کوین</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold">بازه زمانی</span>
            <span className="font-normal">یک روزه</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnchainContent;
