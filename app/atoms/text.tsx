import { atom, useRecoilState } from "recoil";

export const count = atom({
  key: "count-useless",
  default: 0,
});

export function useSetCount(counts: Number) {
  const [_, setCounts] = useRecoilState(count);
  setCounts(counts);
}
