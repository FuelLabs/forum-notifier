import { VercelResponse } from '@vercel/node';
import { notion, syslog } from '../services';
import { Ticket, TicketEventName } from './';

export const handleTicketCreated = async (post: Ticket, res: VercelResponse) => {
    try {
        let ticket: any = await notion.getTicketByTopic(post.topic_id)

        if (!ticket) {
            ticket = post
            ticket.notion_id = await notion.createTicket(post)
        }

        let logRes = await notion.createEventEntry({
            topic_id: post.topic_id,
            ticket_id: ticket.notion_id,
            event: TicketEventName.ticketCreated
        })

        syslog({ event: "log creation", logRes })

        return res.status(200).send({
            discourse_id: post.discourse_id,
            notion_id: ticket.notion_id,
            topic_id: post.topic_id
        });

    } catch (error) {
        syslog({ handleTicketCreatedError: error })
        return res.status(500).send({ error: "error creating post" })
    }
};

