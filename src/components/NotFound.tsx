import React from "react";

type PropsT = {
  text: string;
};

const NotFound: React.FC<PropsT> = ({ text }) => {
  return (
    <div className="flex-auto flex flex-col items-center justify-center">
      <img src="/svgs/ballon.svg" width={250} />
      <span className="font-vazir font-bold text-xl text-primary-700">
        {text}
      </span>
    </div>
  );
};

export default NotFound;
