import { VercelRequest, VercelResponse } from '@vercel/node';
import { handleTopicEdited, handleTicketClosed, handleTicketReOpen, parseDiscourseTopicToTicket } from "./ticket";

export const handleTopic = async (req: VercelRequest, res: VercelResponse) => {
    const event = req.headers['x-discourse-event'];
    const topic = parseDiscourseTopicToTicket(req.body.topic)

    switch (event) {
        case 'topic_edited':
            return handleTopicEdited(topic, res)
        case 'topic_closed_status_updated':
            if (!!req.body.topic.closed) {
                return handleTicketClosed(topic, res)
            }

            if (!req.body.topic.closed) {
                return handleTicketReOpen(topic, res)
            }

        default:
            return res.status(400).send({ error: 'Invalid topic event' });
    }
};

