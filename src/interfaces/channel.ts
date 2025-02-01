export type ChannelType = 'text' | 'voice' | 'stage' | 'forum' | 'post' | 'thread';

export interface Channel {
    id: string;
    name: string;
    type: ChannelType;
    locked?: boolean;
}
