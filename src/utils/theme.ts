export type AppearanceColor = 'dark' | 'light';
export type AppearanceDisplay = 'cozy' | 'compact';

export interface Appearance {
    color: AppearanceColor;
    display: AppearanceDisplay;
}

export type Palette = Record<AppearanceColor, string>;

export type Spacing = Record<AppearanceDisplay, string>;

export interface Theme {
    palette: {
        common: {
            black: string;
            white: string;
        };
        background: {
            primary: Palette;
            secondary: Palette;
            mention: Palette;
            selection: Palette;
        };
        text: {
            primary: Palette;
            secondary: Palette;
            muted: Palette;
            link: Palette;
        };
    };
    size: {
        avatar: string;
    };
    spacing: {
        messagesGap: Spacing;
    };
}

export const DefaultTheme: Theme = {
    palette: {
        common: {
            black: '#000',
            white: '#fff'
        },
        background: {
            primary: {
                dark: '#313338',
                light: '#fff'
            },
            secondary: {
                dark: '#2b2d31',
                light: '#f2f3f5'
            },
            mention: {
                dark: '#3f416e',
                light: '#e8e8fd'
            },
            selection: {
                dark: '#5d769c',
                light: '#b3d4fc'
            }
        },
        text: {
            primary: {
                dark: '#dcdee1',
                light: '#313338'
            },
            secondary: {
                dark: '#f2f3f5',
                light: '#060607'
            },
            muted: {
                dark: '#959ba3',
                light: '#5c5e65'
            },
            link: {
                dark: '',
                light: ''
            }
        }
    },
    size: {
        avatar: '40px'
    },
    spacing: {
        messagesGap: {
            cozy: '1.0625rem',
            compact: '.0625rem'
        }
    }
};

export const getCssVariables = (theme: Theme, { color, display }: Appearance): Record<string, string> => {
    const variables: Record<string, string> = {};

    const transform = (obj: Record<string, any>, path: string[] = []): void => {
        console.log(obj, path);
        for (const key in obj) {
            const varKey = `--discord-${[...path, key].join('-')}`;
            const value = obj[key];

            console.log(varKey, key, value);

            if (typeof value !== 'object') {
                variables[varKey] = value;
                continue;
            }

            if ('dark' in value && 'light' in value) {
                variables[varKey] = value[color];
                continue;
            }

            if ('cozy' in value && 'compact' in value) {
                variables[varKey] = value[display];
                continue;
            }

            transform(value, [...path, key]);
        }
    };

    transform(theme);

    return variables;
};
