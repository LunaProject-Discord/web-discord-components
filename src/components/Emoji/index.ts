'use client';

import { generateComponentClasses } from '../../utils';

export const emojiClasses = generateComponentClasses(
    'Emoji',
    [
        'root',
        'custom',
        'unicode'
    ]
);

export * from './custom';
export * from './unicode';
