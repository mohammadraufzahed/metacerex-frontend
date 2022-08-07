import { useRecoilState } from "recoil";
import { textD } from "~/atoms/text";

export default function Index() {
  const [textx, setTextX] = useRecoilState(textD);
  return (
    <div>
      <h1 className="text-secondary-500">Title 1</h1>
      <h2>{textx}</h2>
      <input value={textx} onChange={(e) => setTextX(e.currentTarget.value)} />
      <h4>Title 4</h4>
      <h5>Title 5</h5>
      <h6>Title 6</h6>
    </div>
  );
}
