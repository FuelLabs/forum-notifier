import { VercelResponse } from '@vercel/node';
import { notion, syslog } from '../services';
import { Ticket } from './Types';


export const handleTicketBodyEdited = async (post: Ticket, res: VercelResponse) => {
    try {

        let ticket = await notion.getTicketByTopic(post.topic_id)

        if (!ticket) {
            // TODO create err msg const
            return res.status(400).send({ error: "topic_id not found" });
        }
        const { discourse_id, notion_id } = ticket

        if (ticket.post_body !== post.post_body) {
            let last_edited_time = await notion.updateTicketBody(notion_id, post.post_body)

            if (last_edited_time) {
                return res.status(200).send({ discourse_id, notion_id, last_edited_time });
            }
            throw new Error("updateTicketBody error");
        }

        return res.status(200).send({ discourse_id, notion_id, message: "nothing to edit" });

    } catch (error) {
        // todo create errors common object
        syslog({ handleTicketCreatedError: JSON.stringify(error) })
        return res.status(500).send({ error: "error editing post" })
    }


};

