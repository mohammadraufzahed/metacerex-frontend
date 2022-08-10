import { useRecoilState, useRecoilValue } from "recoil";
import { count } from "~/atoms/text";

export default function Index() {
  const counter = useRecoilValue(count);
  return <div></div>;
}
