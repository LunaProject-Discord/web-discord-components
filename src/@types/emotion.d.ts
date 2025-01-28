import '@emotion/react';
import { Theme as DiscordTheme } from '../utils';

declare module '@emotion/react' {
    interface Theme extends DiscordTheme {
    }
}
