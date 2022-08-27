import { httpClient } from "../axios";
import { NewsArticleList } from "../types/API";

export async function useNews(): Promise<NewsArticleList[]> {
  const news: NewsArticleList[] = await httpClient
    .get("contents/news", {})
    .then((data) => data.data.results);
  return news;
}
