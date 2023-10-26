import { notion } from "../services";
import { DiscoursePost, DiscourseTopic, TicketStatus, Ticket, TicketEvent, TicketEventName } from "./";

export const parseDiscourseTopicToTicket = (rawTopic: DiscourseTopic): Ticket => (
    {
        notion_id: "",
        discourse_id: rawTopic.id,
        created_timestamp: Date.parse(rawTopic.created_at),
        created_at: rawTopic.created_at,
        updated_at: rawTopic.last_posted_at,
        topic_title: rawTopic.title,
        topic_id: rawTopic.id,
        post_id: 0,
        post_body: "missing_first_post",// to be filled by post_created event since the ticket body is the first post of the topic
        category_id: rawTopic.category_id,
        creator_username: rawTopic.created_by.username,
        status: TicketStatus.todo,
        assignee: "",
    }
)
export const parseDiscoursePostToTicket = (rawPost: DiscoursePost): Ticket => (
    {
        notion_id: "",
        discourse_id: rawPost.id,
        created_timestamp: Date.parse(rawPost.created_at),
        created_at: rawPost.created_at,
        updated_at: rawPost.updated_at,
        topic_title: rawPost.topic_title,
        topic_id: rawPost.topic_id,
        post_id: rawPost.post_number,
        post_body: rawPost.raw,
        category_id: rawPost.category_id,
        creator_username: rawPost.username,
        status: TicketStatus.todo,
        assignee: "",// TODO handle assignee
    }
)

export const parseNotionToTicket = (rawPost: notion.NotionTicket): Ticket => ({
    notion_id: rawPost.id,
    discourse_id: rawPost.properties.discourse_id.number,
    created_timestamp: rawPost.properties.created_timestamp.number,
    created_at: rawPost.properties.created_at.rich_text[0].text.content,
    updated_at: rawPost.properties.updated_at.rich_text[0].text.content,
    topic_title: rawPost.properties.topic_title.rich_text[0].text.content,
    topic_id: rawPost.properties.topic_id.number,
    post_id: rawPost.properties.post_id.number,
    post_body: rawPost.properties.post_body.rich_text[0].text.content,
    category_id: rawPost.properties.category_id.number,
    creator_username: rawPost.properties.creator_username.rich_text[0].text.content,
    status: TicketStatus[rawPost.properties.status.status.name],
    assignee: "",
})

export const parseNotionTicketEventToTicketEvent = (rawEvent: notion.NotionTicketEvent): TicketEvent => {

    return ({
        timestamp: rawEvent.properties.timestamp.number,
        event: rawEvent.properties.event.rich_text[0].text.content as TicketEventName,
        ticket_id: rawEvent.properties.ticket_id.rich_text[0].text.content,
        topic_id: rawEvent.properties.topic_id.number,
    })

};

