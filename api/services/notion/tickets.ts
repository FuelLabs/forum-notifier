import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import { TicketStatus, parseNotionToTicket } from "../../ticket";
import { notionClient, databaseId, NotionTicket } from "./";
import { getAllFromDB } from "./utils";
export * from "./createTicket";

export const setTicketAsReOpen = async (notionId: string) => {
    const response: any = await notionClient.pages.update({
        page_id: notionId,
        properties: {
            status: {
                status: {
                    name: TicketStatus.reOpen
                },
            }
        }
    });

    return response.last_edited_time ?? null;
};

export const setTicketAsNewComment = async (notionId: string) => {
    const response: any = await notionClient.pages.update({
        page_id: notionId,
        properties: {
            status: {
                status: {
                    name: TicketStatus.newComment
                },
            }
        }
    });

    return response.last_edited_time ?? null;
};

export const setTicketAsClosed = async (notionId: string) => {
    const response: any = await notionClient.pages.update({
        page_id: notionId,
        properties: {
            status: {
                status: {
                    name: TicketStatus.closed
                },
            }
        }
    });

    return response.last_edited_time ?? null;
};

export const setTicketAsBacklog = async (notionId: string) => {
    const response: any = await notionClient.pages.update({
        page_id: notionId,
        properties: {
            status: {
                status: {
                    name: TicketStatus.backlog
                },
            }
        }
    });

    return response.last_edited_time ?? null;
};

export const getTicketByTopic = async (topic_id: number) => {
    try {
        const response = await notionClient.databases.query({
            database_id: databaseId ?? "NO_DATABASE_ID",
            filter: {
                "property": "topic_id",
                number: {
                    equals: topic_id
                }
            }
        } as QueryDatabaseParameters);

        return response.results.length > 0 ? parseNotionToTicket(response.results[0] as NotionTicket) : null
    } catch (error) {
        return null
    }
};

export const getAllTickets = async () => {
    return await getAllFromDB(databaseId)
}

export const updateTicketBody = async (notionId: string, newPostBody: string) => {
    const response: any = await notionClient.pages.update({
        page_id: notionId,
        properties: {
            post_body: {
                rich_text: [
                    {
                        text: {
                            content: newPostBody,
                        },
                    },
                ],
            }
        }
    });

    return response.last_edited_time ?? null;
};

export const updateTicketTopic = async (notionId: string, newTopicTitle: string) => {
    const response: any = await notionClient.pages.update({
        page_id: notionId,
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: newTopicTitle
                        }
                    }
                ]
            },
            topic_title: {
                rich_text: [
                    {
                        text: {
                            content: newTopicTitle,
                        },
                    },
                ],
            }
        }
    });

    return response.last_edited_time ?? null;
};