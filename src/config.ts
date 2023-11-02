
export const databaseId = process.env.NOTION_DATABASE_ID
export const eventsDatabaseId = process.env.NOTION_EVENTS_DATABASE_ID
// export const snapshotsDatabaseId = process.env.NOTION_DATA_SNAPSHOTS_DATABASE_ID
export const notionKey = process.env.NOTION_KEY

export const forumUrl = process.env.FORUM_BASE_URL

export const forumSecret = process.env.FORUM_SECRET


if (!databaseId || !eventsDatabaseId || !notionKey || !forumUrl || !forumSecret) {
    console.log({ databaseId, eventsDatabaseId, notionKey })
    throw new Error("Missing env vars for Notion");

}