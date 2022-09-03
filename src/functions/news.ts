import { httpClient } from "../axios";
import { API_LIMIT } from "../constants/APILimit";
import { NewsArticleDetail, PaginatedNewsList } from "../types/API";

export async function getNewsPaginated(
  page: number = 0,
  title: string | null = null
): Promise<PaginatedNewsList> {
  const params: {
    limit: number;
    offset: number;
    q?: string;
  } = {
    limit: API_LIMIT,
    offset: page,
  };
  if (title && title != "") {
    params.q = title;
  }
  return await httpClient
    .get("contents/news/", {
      params,
    })
    .then((res) => res.data);
}

export async function getNews(id: string): Promise<NewsArticleDetail> {
  return await httpClient.get(`contents/news/${id}`).then((res) => res.data);
}
