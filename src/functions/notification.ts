import { httpClient } from "../axios";
import { API_LIMIT } from "../constants/APILimit";
import { PaginatedNotifications } from "../types/API";

export default async function getNotification(offset: number = 0): Promise<PaginatedNotifications> {
    return await httpClient.get("messaging/notifications/", {
        params: {
            limit: API_LIMIT,
            offset,
        }
    }).then(res => res.data)
}