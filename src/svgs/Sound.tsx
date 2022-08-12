import * as React from "react";
import type { SVGProps } from "react";

const Sound = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 8.25v7.5M7.5 5.75v12.5M12 3.25v17.5M16.5 5.75v12.5M21 8.25v7.5"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    />
  </svg>
);

export default Sound;
