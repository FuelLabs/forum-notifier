import { VercelRequest, VercelResponse } from '@vercel/node';

export default async (req: VercelRequest, res: VercelResponse) => {
    try {
        if (req.method == 'GET') {
            return res.status(200).send('get');
        }
        if (req.method == 'POST') {
            return res.status(200).send('post');
        }
        return res.status(405).send({ error: 'Invalid request method' });
    } catch (error) {
        return res.status(500).send({ error: 'Internal server error' })

    }
}
