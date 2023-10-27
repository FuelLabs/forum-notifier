import { Client } from "@notionhq/client";

export * from "./tickets";
export * from "./events";
export * from "./createDataSnapshot";
export * from "./types"

export const databaseId = process.env.NOTION_DATABASE_ID
export const eventsDatabaseId = process.env.NOTION_EVENTS_DATABASE_ID
export const snapshotsDatabaseId = process.env.NOTION_DATA_SNAPSHOTS_DATABASE_ID
export const notionKey = process.env.NOTION_KEY

export const forumUrl = process.env.FORUM_BASE_URL

if (!databaseId || !eventsDatabaseId || !snapshotsDatabaseId || !notionKey || !forumUrl) {
    console.log({ databaseId, eventsDatabaseId, snapshotsDatabaseId, notionKey })
    throw new Error("Missing env vars for Notion");

}

export const notionClient = new Client({ auth: notionKey })

