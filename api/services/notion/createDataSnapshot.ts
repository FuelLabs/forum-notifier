import { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";
import { getCurrentUnixTimestamp, getIsoDate } from "./utils";
import { notionClient, snapshotsDatabaseId } from "./";

export const createDataSnapshot = async (
    closeTimeAvg: number, firstReplyAvg: number,
    total: number, opened: number, closed: number, reOpen: number
) => {
    const date = getIsoDate()
    const response = await notionClient.pages.create({
        parent: {
            type: "database_id",
            database_id: snapshotsDatabaseId,
        },
        properties: {
            Name: {
                title: [
                    {
                        text: {
                            content: `data-snapshot ${date}`
                        }
                    }
                ]
            },
            timestamp: {
                number: getCurrentUnixTimestamp(),
            },
            date: {
                date: {
                    start: date
                }
            },
            closeTimeAvg: {
                number: closeTimeAvg,
            },
            firstReplyAvg: {
                number: firstReplyAvg,
            },
            total: {
                number: total,
            },
            opened: {
                number: opened,
            },
            closed: {
                number: closed,
            },
            reOpen: {
                number: reOpen,
            },

        },
    } as CreatePageParameters);

    return response;
};
