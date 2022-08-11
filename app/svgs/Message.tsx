import * as React from "react";
import type { SVGProps } from "react";

const Message = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.5 10.5h7M7 18.43h4l4.45 2.96a.997.997 0 0 0 1.55-.83v-2.13c3 0 5-2 5-5v-6c0-3-2-5-5-5H7c-3 0-5 2-5 5v6c0 3 2 5 5 5Z"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    />
  </svg>
);

export default Message;
