interface NotionUser {
    object: string;
    id: string;
}

interface NotionParent {
    type: string;
    database_id: string;
}

interface RichTextContent {
    text: {
        content: string;
        link: string | null;
    };
}

interface NotionPropertyRichText {
    type: string;
    rich_text: Array<RichTextContent>
    annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
    };
    plain_text: string;
    href: string | null;
}

interface NotionPropertyDate {
    id: string;
    type: string;
    date: {
        start: string;
        end: string | null;
        time_zone: string | null;
    };
}

interface NotionPropertyPeople {
    id: string;
    type: string;
    people: any[];
}

interface NotionPropertyNumber {
    id: string;
    type: string;
    number: number;
}

interface NotionGenericPage<T> {
    object: string;
    id: string;
    created_time: string;
    last_edited_time: string;
    created_by: NotionUser;
    last_edited_by: NotionUser;
    cover: null;
    icon: null;
    parent: NotionParent;
    archived: boolean;
    properties: T;
    url: string;
    public_url: null;
}

interface NotionTicketEventProperties {
    date: NotionPropertyDate;
    event: NotionPropertyRichText;
    timestamp: NotionPropertyNumber;
    topic_id: NotionPropertyNumber;
    ticket_id: NotionPropertyRichText;
    Name: NotionPropertyRichText;
}

export type NotionTicketEvent = NotionGenericPage<NotionTicketEventProperties>

interface NotionTicketProperties {
    category_id: NotionPropertyNumber;
    updated_at: NotionPropertyRichText;
    status: {
        id: string;
        type: string;
        status: {
            id: string;
            name: string;
            color: string;
        };
    };
    creator_username: NotionPropertyRichText;
    discourse_id: NotionPropertyNumber;
    post_id: NotionPropertyNumber;
    post_body: NotionPropertyRichText;
    created_at: NotionPropertyRichText;
    assignee: NotionPropertyPeople;
    forum_id: NotionPropertyRichText;
    created_timestamp: NotionPropertyNumber;
    topic_title: NotionPropertyRichText;
    topic_id: NotionPropertyNumber;
    Name: NotionPropertyRichText;
}

export type NotionTicket = NotionGenericPage<NotionTicketProperties>