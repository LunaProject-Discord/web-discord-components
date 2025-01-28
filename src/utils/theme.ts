export type DiscordAppearanceColor = 'dark' | 'light';
export type DiscordAppearanceDisplay = 'cozy' | 'compact';

export interface DiscordAppearance {
    color: DiscordAppearanceColor;
    display: DiscordAppearanceDisplay;
}

export interface DiscordTheme {
    appearance: DiscordAppearance;
    palette: {
        common: {
            black: string;
            white: string;
        };
        background: {
            primary: string;
            secondary: string;
            mention: string;
            selection: string;
        };
        text: {
            primary: string;
            secondary: string;
            muted: string;
            link: string;
        };
    };
}

const DefaultDiscordLightTheme: Omit<DiscordTheme, 'appearance'> = {
    palette: {
        common: {
            black: '#000',
            white: '#fff'
        },
        background: {
            primary: '#fff',
            secondary: '#f2f3f5',
            mention: '#e8e8fd',
            selection: '#b3d4fc'
        },
        text: {
            primary: '#313338',
            secondary: '#060607',
            muted: '#5c5e65',
            link: ''
        }
    }
};

const DefaultDiscordDarkTheme: Omit<DiscordTheme, 'appearance'> = {
    palette: {
        common: {
            black: '#000',
            white: '#fff'
        },
        background: {
            primary: '#313338',
            secondary: '#2b2d31',
            mention: '#3f416e',
            selection: '#5d769c'
        },
        text: {
            primary: '#dcdee1',
            secondary: '#f2f3f5',
            muted: '#959ba3',
            link: ''
        }
    }
};

export const buildDiscordTheme = ({ color, display }: DiscordAppearance): DiscordTheme => ({
    ...color === 'dark' ? DefaultDiscordDarkTheme : DefaultDiscordLightTheme,
    appearance: {
        color,
        display
    }
});

export const generateDiscordComponentClasses = <T extends string>(name: string, slots: T[]): Record<T, string> => {
    const classes: Record<string, string> = {};
    for (const slot of slots)
        classes[slot] = `LPD${name}-${slot}`;
    return classes;
};
