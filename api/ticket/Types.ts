export enum TicketStatus {
    backlog = "backlog",
    todo = "todo",
    inProgress = "inProgress",
    newComment = "newComment",
    closed = "closed",
    reOpen = "reOpen"
}

export type Ticket = {
    notion_id: string, // notion
    discourse_id: number,

    created_timestamp: number,
    created_at: string,
    updated_at: string,

    topic_title: string,
    topic_id: number,

    post_id: number,
    post_body: string,

    category_id: number,
    creator_username: string,

    status: TicketStatus,
    assignee: string,
}

export enum TicketEventName {
    ticketCreated = 'ticketCreated',
    staffFirstReply = 'staffFirstReply',
    staffReply = 'staffReply',
    userReply = 'userReply',
    ticketClosed = 'ticketClosed',
    ticketReopen = 'ticketReopen',
}

// todo post event log
export type TicketEvent = {
    timestamp?: Number
    event: TicketEventName
    ticket_id: string,
    topic_id: number
}

