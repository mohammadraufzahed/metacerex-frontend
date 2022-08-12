import * as React from "react";
import type { SVGProps } from "react";

const Calendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    />
    <path
      d="M11.995 13.7h.01M8.294 13.7h.01M8.294 16.7h.01"
      stroke="#292D32"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    />
  </svg>
);

export default Calendar;
