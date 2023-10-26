import { VercelResponse } from '@vercel/node';
import { notion, syslog } from '../services';
import { Ticket } from './Types';


export const handleTopicEdited = async (topic: Ticket, res: VercelResponse) => {
    try {

        let ticket = await notion.getTicketByTopic(topic.topic_id)

        if (!ticket) {
            // TODO create err msg const
            return res.status(400).send({ error: "topic_id not found" });
        }

        if (ticket.topic_title !== topic.topic_title) {
            let last_edited_time = await notion.updateTicketTopic(ticket.notion_id, topic.topic_title)

            if (last_edited_time) {
                return res.status(200).send({
                    discourse_id: ticket.discourse_id,
                    notion_id: ticket.notion_id,
                    last_edited_time
                });
            }
            throw new Error("updateTicketBody error");
        }

        return res.status(200).send({
            discourse_id: ticket.discourse_id,
            notion_id: ticket.notion_id,
            message: "nothing to edit"
        });

    } catch (error) {
        // todo create errors common object
        syslog({ handleTicketCreatedError: JSON.stringify(error) })
        return res.status(500).send({ error: "error editing topic" })
    }


};

