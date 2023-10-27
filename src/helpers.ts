import { VercelRequest } from '@vercel/node';
import { createHmac } from 'crypto';
import { forumSecret } from './config';

function computeSHA256HMAC(payload, secret) {
    const hmac = createHmac('sha256', secret);
    hmac.update(payload);
    const hash = hmac.digest('hex');
    return hash;
}

export function hasValidSignature(req: VercelRequest) {
    const rawSig = req.headers['x-discourse-event-signature']

    if (!rawSig || typeof rawSig !== 'string' || !rawSig.startsWith('sha256=')) {
        return false
    }

    const signature = rawSig.substring(7)
    const hmac = computeSHA256HMAC(JSON.stringify(req.body), forumSecret);

    return signature === hmac
}