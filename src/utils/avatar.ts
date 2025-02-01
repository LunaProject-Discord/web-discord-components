export type DefaultAvatarColor = 'Blurple' | 'Grey' | 'Green' | 'Orange' | 'Red' | 'Pink';

export const DefaultAvatar = {
    Blurple: 'https://cdn.discordapp.com/embed/avatars/0.png',
    Grey: 'https://cdn.discordapp.com/embed/avatars/1.png',
    Green: 'https://cdn.discordapp.com/embed/avatars/2.png',
    Orange: 'https://cdn.discordapp.com/embed/avatars/3.png',
    Red: 'https://cdn.discordapp.com/embed/avatars/4.png',
    Pink: 'https://cdn.discordapp.com/embed/avatars/5.png'
} as const satisfies Record<DefaultAvatarColor, string>;
