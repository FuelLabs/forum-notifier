import { VercelRequest, VercelResponse } from '@vercel/node';
import { parseDiscoursePostToTicket, handleTicketBodyEdited, handleTicketCreated, handleTicketStaffComment } from "./ticket";
import { handleNewReply } from './ticket';

export const handlePost = (req: VercelRequest, res: VercelResponse) => {
  const post = parseDiscoursePostToTicket(req.body.post)
  if (post.creator_username === 'system' || post.creator_username === 'discobot') {
    return res.status(400).send({ error: 'Reject system and bot messages' });
  }

  const event = req.headers['x-discourse-event'];

  if (event === 'post_created') {

    if (post.post_id == 1) {
      return handleTicketCreated(post, res);
    }

    if (post.post_id > 1) {
      if (!!req.body.post.staff || !!req.body.post.admin || !!req.body.post.moderator) {
        return handleTicketStaffComment(post, res)
      }

      return handleNewReply(post, res);
    }
  }

  if (event === 'post_edited') {
    if (post.post_id == 1) {
      return handleTicketBodyEdited(post, res);
    }
  }

  return res.status(400).send({ error: 'Not a post reply, not a ticket body' });
};
