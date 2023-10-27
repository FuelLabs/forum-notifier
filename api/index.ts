import { VercelRequest, VercelResponse } from '@vercel/node';
import { handleTopic } from '../src/handleTopic';
import { handlePost } from '../src/handlePost';

export default async (req: VercelRequest, res: VercelResponse) => {
    try {
        switch (req.method) {
            case 'GET':
                return res.status(200).send('get');

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
