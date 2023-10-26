import { notionClient } from "./";

export async function getAllFromDB(dbId: string) {
    try {
        let response = await notionClient.databases.query(
            {
                database_id: dbId
            }
        )
        return response.results as any
    } catch (error) {
        return {
            error: error
        }
    }
}

export function getIsoDate(): string {
    const currentTime = new Date();
    return currentTime.toISOString();
}

export function getCurrentUnixTimestamp(): number {
    const currentTime = Date.now();
    const unixTimestamp = Math.floor(currentTime / 1000);
    return unixTimestamp;
}
