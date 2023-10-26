import { VercelResponse } from '@vercel/node';
import { notion, syslog } from '../services';
import { Ticket, TicketEventName, TicketStatus } from './';


export const handleTicketStaffComment = async (topic: Ticket, res: VercelResponse) => {
    try {

        let ticket = await notion.getTicketByTopic(topic.topic_id)

        if (!ticket) {
            return res.status(400).send({ error: "topic_id not found" });
        }

        let last_edited_time = await notion.setTicketAsBacklog(ticket.notion_id)

        if (!last_edited_time) {
            throw new Error("handleNewReply error");
        }


        await notion.createEventEntry({
            topic_id: topic.topic_id,
            ticket_id: ticket.notion_id,
            event: ticket.status === TicketStatus.todo ?
                TicketEventName.staffFirstReply : TicketEventName.staffReply
        })


        return res.status(200).send({
            discourse_id: ticket.discourse_id,
            notion_id: ticket.notion_id,
            last_edited_time
        });


    } catch (error) {
        // todo create errors common object
        syslog({ handleTicketCreatedError: JSON.stringify(error) })
        return res.status(500).send({ error: "error editing topic" })
    }


};

