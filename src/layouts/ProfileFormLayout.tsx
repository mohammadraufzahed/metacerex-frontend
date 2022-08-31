import React from "react";

type PropsT = {
  children: React.ReactNode;
  title: string;
};

const ProfileFormLayout: React.FC<PropsT> = ({ children, title }) => {
  return (
    <div className="w-full bg-neutral-50 rounded-2xl flex flex-col gap-10 py-6 px-2 lg:py-8 lg:px-8">
      <span className="font-vazir font-bold text-base">{title}</span>
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

export default ProfileFormLayout;
