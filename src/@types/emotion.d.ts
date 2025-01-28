import '@emotion/react';
import { DiscordTheme as DiscordTheme } from '../utils';

declare module '@emotion/react' {
    interface Theme extends DiscordTheme {
    }
}
