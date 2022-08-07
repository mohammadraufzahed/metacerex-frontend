import { useRecoilState, useRecoilValue } from "recoil";
import { count } from "~/atoms/text";

export default function Index() {
  const counter = useRecoilValue(count);
  return (
    <div>
      <h1 className="text-secondary-500">Title 1</h1>
      <h2>{counter}</h2>
      <h4>Title 4</h4>
      <h5>Title 5</h5>
      <h6>Title 6</h6>
    </div>
  );
}
