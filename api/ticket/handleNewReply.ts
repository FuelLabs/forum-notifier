import { VercelResponse } from '@vercel/node';
import { notion } from '../services';
import { Ticket, TicketEventName } from './';


export const handleNewReply = async (post: Ticket, res: VercelResponse) => {
    try {

        let ticket = await notion.getTicketByTopic(post.topic_id)

        if (!ticket) {
            ticket = post
            ticket.notion_id = await notion.createTicket(post)
        }

        let last_edited_time = await notion.setTicketAsNewComment(ticket.notion_id)

        if (!last_edited_time) {
            throw new Error("handleNewReply error");
        }

        await notion.createEventEntry({
            topic_id: post.topic_id,
            ticket_id: ticket.notion_id,
            event: TicketEventName.userReply
        })



        return res.status(200).send({
            discourse_id: ticket.discourse_id,
            notion_id: ticket.notion_id,
            last_edited_time
        });

    } catch (error) {
        // todo create errors common object
        return res.status(500).send({ error: "error adding reply" })
    }


};

