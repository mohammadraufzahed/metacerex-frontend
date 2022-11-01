import { motion } from "framer-motion";
import React, { ReactText } from "react";
import { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import styled from "styled-components";
import tw from "twin.macro";
import { colorMode } from "../signals/colorMode";

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 92vh;
  max-height: 92vh;
  overflow: hidden;
  display: grid;
  padding-bottom: 1rem;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  @media screen and (max-width: 1024px) {
    min-height: 85.2vh;
    max-height: 85.2vh;
    grid-template-columns: 1fr;
    overflow-y: scroll;
  }
`;

const Box: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="w-full h-full py-2 text-neutral-900 dark:text-neutral-50 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
    {children}
  </div>
);

const Title: React.FC<{ title: string }> = ({ title }) => (
  <span className="font-vazir font-bold text-base">{title}</span>
);

const Header: React.FC<{ title: string }> = ({ title }) => (
  <div className="w-full pb-2 px-2 border-b-[1px]">
    <Title title={title} />
  </div>
);

const Paragraph: React.FC<{ content: string }> = ({ content }) => (
  <p className="leading-8 font-vazir font-normal text-base text-justify">
    {content}
  </p>
);

const ContactItem: React.FC<{
  icon: {
    dark: string;
    light: string;
  };
  text: string;
}> = ({ icon, text }) => (
  <div className="flex flex-row font-vazir font-normal text-base items-center gap-4">
    <img src={colorMode.value == "dark" ? icon.dark : icon.light} alt="" />
    <span>{text}</span>
  </div>
);

const SocialIcons: React.FC<{ Icon: IconType }> = ({ Icon }) => (
  <motion.div
    variants={{
      initial: {
        scale: 1,
        y: 0,
      },
      hover: {
        scale: 1.03,
        y: -1.5,
      },
      tap: {
        scale: 1.03,
        y: -3,
      },
    }}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    className="bg-primary-700 dark:bg-primary-500 cursor-pointer text-neutral-50 dark:text-neutral-900 p-1.5 rounded-sm"
  >
    <Icon />
  </motion.div>
);

const SocialIconsBox: React.FC = () => (
  <div className="flex flex-row items-center gap-4">
    <span className="font-vazir font-normal text-base">
      ما را در شبکه های اجتماعی دنبال کنید
    </span>
    <SocialIcons Icon={FaLinkedinIn} />
    <SocialIcons Icon={FaWhatsapp} />
    <SocialIcons Icon={FaTelegram} />
    <SocialIcons Icon={FaTwitter} />
    <SocialIcons Icon={FaInstagram} />
    <SocialIcons Icon={FaFacebookF} />
  </div>
);

const ContactUsPage: React.FC = () => {
  return (
    <Container className="scrollbar-vertical">
      <Box>
        <Header title="درباره موبی اکس" />
        <div className="p-3">
          <Paragraph content="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار منپ.نسپیبش.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار منپ.نسپیبش.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم " />
        </div>
      </Box>
      <Box>
        <Header title="ارتباط با موبی اکس" />
        <div className="px-2 py-14 flex flex-col gap-6">
          <ContactItem
            icon={{
              dark: "/svgs/location-dark.svg",
              light: "/svgs/location-light.svg",
            }}
            text="تهران - یوسف آباد - خیابان ۱۰۶ غربی - پلاک ۳ - واحد ۶ "
          />
          <ContactItem
            icon={{
              dark: "/svgs/call-dark.svg",
              light: "/svgs/call-light.svg",
            }}
            text="۰۲۱- ۴۴۴۴۵۵۷۷"
          />
          <ContactItem
            icon={{
              dark: "/svgs/call-dark.svg",
              light: "/svgs/call-light.svg",
            }}
            text="۰۲۱- ۴۴۴۴۵۵۷۷"
          />
          <ContactItem
            icon={{
              dark: "/svgs/call-dark.svg",
              light: "/svgs/call-light.svg",
            }}
            text="۰۲۱- ۴۴۴۴۵۵۷۷"
          />
          <ContactItem
            icon={{
              dark: "/svgs/mail-dark.svg",
              light: "/svgs/mail-light.svg",
            }}
            text="info@mobydex.com"
          />
          <SocialIconsBox />
        </div>
      </Box>
    </Container>
  );
};

export default ContactUsPage;
