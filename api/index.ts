import { VercelRequest, VercelResponse } from '@vercel/node';
import { handleTopic } from '../src/handleTopic';
import { handlePost } from '../src/handlePost';
import { forumUrl } from '../src/config';
import { hasValidSignature } from '../src/helpers';


export default async (req: VercelRequest, res: VercelResponse) => {
    if (!hasValidSignature(req) || req.headers['x-discourse-instance'] !== forumUrl) {
        console.log('Invalid request');
        return res.status(401).send({ error: 'Invalid request signature' });
    }

    try {
        switch (req.method) {
            case 'POST':
                const eventType = req.headers['x-discourse-event-type'];

                switch (eventType) {
                    case 'topic':
                        return handleTopic(req, res);
                    case 'post':
                        return handlePost(req, res);
                    default:
                        return res.status(400).send({ error: 'Invalid event type' });
                }

            default:
                return res.status(405).send({ error: 'Invalid request method' });
        }
    } catch (error) {
        return res.status(500).send({ error: 'Internal server error' })
    }
}
