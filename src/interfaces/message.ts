import { DateTime } from 'luxon';
import { MessageReplyProps } from '../components';
import { User } from './user';

export interface MessageData {
    timestamp: DateTime<true> | 'now';
    author: string | User;
    content?: string;
    embeds?: MessageEmbedData[];
    reply?: MessageReplyProps;
}

export interface MessageEmbedData {
    title?: string;
    description?: string;
    url?: string;
    color?: number;
    timestamp?: DateTime<true> | 'now';
    author?: MessageEmbedAuthorData;
    footer?: MessageEmbedFooterData;
    fields?: MessageEmbedFieldData[];
    images?: string[];
    thumbnail?: string;
}

export interface MessageEmbedAuthorData {
    name: string;
    url?: string;
    iconUrl?: string;
}

export interface MessageEmbedFooterData {
    text: string;
    iconUrl?: string;
}

export interface MessageEmbedFieldData {
    name: string;
    value: string;
    inline?: boolean;
}
