import { Client } from "@notionhq/client";

export * from "./tickets";
export * from "./events";
export * from "./createDataSnapshot";
export * from "./types"

export const databaseId = process.env.NOTION_DATABASE_ID ?? "MISSING_DB_KEY"
export const eventsDatabaseId = process.env.NOTION_EVENTS_DATABASE_ID ?? "MISSING_EVENTS_DB_KEY"
export const snapshotsDatabaseId = process.env.NOTION_DATA_SNAPSHOTS_DATaBASE_ID ?? "MISSING_EVENTS_DB_KEY"

export const notionClient = new Client({ auth: process.env.NOTION_KEY })

