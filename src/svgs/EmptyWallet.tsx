import * as React from "react";
import type { SVGProps } from "react";

const EmptyWallet = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.04 13.55c-.42.41-.66 1-.6 1.63.09 1.08 1.08 1.87 2.16 1.87h1.9v1.19c0 2.07-1.69 3.76-3.76 3.76H6.26c-2.07 0-3.76-1.69-3.76-3.76v-6.73c0-2.07 1.69-3.76 3.76-3.76h11.48c2.07 0 3.76 1.69 3.76 3.76v1.44h-2.02c-.56 0-1.07.22-1.44.6Z"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    />
    <path
      d="M2.5 12.41V7.84c0-1.19.73-2.25 1.84-2.67l7.94-3a1.9 1.9 0 0 1 2.57 1.78v3.8M22.559 13.97v2.06c0 .55-.44 1-1 1.02h-1.96c-1.08 0-2.07-.79-2.16-1.87-.06-.63.18-1.22.6-1.63.37-.38.88-.6 1.44-.6h2.08c.56.02 1 .47 1 1.02ZM7 12h7"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      className={props.className}
      strokeLinejoin="round"
    />
  </svg>
);

export default EmptyWallet;