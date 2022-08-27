import * as React from "react";
import type { SVGProps } from "react";

const BitcoinConvert = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M23 15.97c0 3.87-3.13 7-7 7l1.05-1.75M1 7.97c0-3.87 3.13-7 7-7L6.95 2.72"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    />
    <path
      d="M6.62 13.07h2.81c.62 0 1.13.56 1.13 1.13 0 .62-.5 1.13-1.13 1.13H6.62v-2.26ZM6.62 15.33h3.22c.71 0 1.29.5 1.29 1.13 0 .62-.58 1.13-1.29 1.13H6.62v-2.26ZM8.42 17.58v1.12M8.42 11.95v1.12"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    />
    <path
      d="M14.85 15.33c0 3.41-2.76 6.17-6.17 6.17s-6.17-2.76-6.17-6.17 2.76-6.17 6.17-6.17c.16 0 .31.01.48.02 3.03.23 5.45 2.65 5.68 5.68 0 .15.01.3.01.47Z"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    />
    <path
      d="M21.5 8.67c0 3.41-2.76 6.17-6.17 6.17h-.49a6.174 6.174 0 0 0-5.68-5.68v-.49c0-3.41 2.76-6.17 6.17-6.17s6.17 2.76 6.17 6.17Z"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    />
  </svg>
);

export default BitcoinConvert;