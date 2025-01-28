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

type FormatAsCSSVar<Path extends string> = `var(--discord-${Path})`;

type ToCSSVars<T, Path extends string = ''> = {
    [K in keyof T]: T[K] extends object
        ? ToCSSVars<T[K], `${Path}${K & string}-`> // オブジェクトの場合は再帰
        : FormatAsCSSVar<`${Path}${K & string}`>; // プリミティブ型はフォーマット
};

// 使用例
type TransformedTheme = ToCSSVars<Theme>;

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

export const getCssVariables = (theme: Theme, appearance: Appearance): Record<string, string> => {
    const getVariables = (obj: Record<string, any>, path: string): Record<string, string> => {
        let vars: Record<string, string> = {};

        for (const [key, value] of Object.entries(obj)) {
            if (typeof value !== 'object') {
                vars[`--discord-${path}-${key}`] = value;
                continue;
            }

            if ('dark' in value && 'light' in value) {
                vars[`--discord-${path}-${key}`] = value[appearance.color];
                continue;
            }

            if ('cozy' in value && 'compact' in value) {
                vars[`--discord-${path}-${key}`] = value[appearance.display];
                continue;
            }

            vars = {
                ...vars,
                ...getVariables(value, `${path}-${key}`)
            };
        }

        return vars;
    };

    return {
        ...getVariables(theme, 'palette'),
        ...getVariables(theme, 'size'),
        ...getVariables(theme, 'spacing')
    };
};
