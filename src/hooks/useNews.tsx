import { httpClient } from "../axios";

export const useNews = async () => {
  const news = await httpClient
    .get("contents/news", {})
    .then((data) => data.data);
  console.dir(news);
  return true;
};
