import { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";
import { getAllFromDB, getIsoDate, getCurrentUnixTimestamp } from "./utils";
import { notionClient } from "./";
import { TicketEvent } from "../../ticket";
import { eventsDatabaseId } from "../../config";

export const getAllEvents = async () => {
    return await getAllFromDB(eventsDatabaseId)
}

export const createEventEntry = async (event: TicketEvent) => {
    const response = await notionClient.pages.create({
        parent: {
            type: "database_id",
            database_id: eventsDatabaseId,
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: `Topic ${event.topic_id} ${event.event}`
                        }
                    }
                ]
            },
            timestamp: {
                number: getCurrentUnixTimestamp(),
            },
            date: {
                date: {
                    start: getIsoDate()
                }
            },
            topic_id: {
                number: event.topic_id,
            },
            ticket_id: {
                rich_text: [
                    {
                        text: {
                            content: event.ticket_id,
                        },
                    },
                ],
            },
            event: {
                rich_text: [
                    {
                        text: {
                            content: event.event,
                        },
                    },
                ],
            },
        },
    } as CreatePageParameters);

    return response;
};
