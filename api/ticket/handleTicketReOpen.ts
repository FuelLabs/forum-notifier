import { VercelResponse } from '@vercel/node';
import { notion } from '../services';
import { Ticket, TicketEventName } from './';


export const handleTicketReOpen = async (topic: Ticket, res: VercelResponse) => {
    try {

        let ticket = await notion.getTicketByTopic(topic.topic_id)

        if (!ticket) {
            ticket = topic
            ticket.notion_id = await notion.createTicket(topic)
        }

        let last_edited_time = await notion.setTicketAsReOpen(ticket.notion_id)

        if (!last_edited_time) {
            throw new Error("handleNewReply error");
        }

        await notion.createEventEntry({
            topic_id: topic.topic_id,
            ticket_id: ticket.notion_id,
            event: TicketEventName.ticketReopen
        })


        return res.status(200).send({
            discourse_id: ticket.discourse_id,
            notion_id: ticket.notion_id,
            last_edited_time
        });


    } catch (error) {
        // todo create errors common object
        return res.status(500).send({ error: "error editing topic" })
    }


};

