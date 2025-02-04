export type AppearanceColor = 'dark' | 'light';
export type AppearanceDisplay = 'cozy' | 'compact';

export interface Appearance {
    color: AppearanceColor;
    display: AppearanceDisplay;
}

export interface Theme {
    appearance: Appearance;
    palette: {
        common: {
            black: string;
            white: string;
        };
        background: {
            primary: string;
            secondary: string;
            selection: string;
            mention: string;
        };
        text: {
            primary: string;
            secondary: string;
            muted: string;
            mention: string;
            link: string;
        };
    };
}

const DefaultLightTheme: Omit<Theme, 'appearance'> = {
    palette: {
        common: {
            black: '#000',
            white: '#fff'
        },
        background: {
            primary: '#fff',
            secondary: '#f2f3f5',
            selection: '#b3d4fc',
            mention: '#e8e8fc'
        },
        text: {
            primary: '#313338',
            secondary: '#060607',
            muted: '#5c5e65',
            mention: '#4e51be',
            link: '#3868e0'
        }
    }
};

const DefaultDarkTheme: Omit<Theme, 'appearance'> = {
    palette: {
        common: {
            black: '#000',
            white: '#fff'
        },
        background: {
            primary: '#313338',
            secondary: '#2b2d31',
            selection: '#5d769c',
            mention: '#3f416d'
        },
        text: {
            primary: '#dcdee1',
            secondary: '#f2f3f5',
            muted: '#959ba3',
            mention: '#cbcdf8',
            link: '#52a6f6'
        }
    }
};

export const buildTheme = ({ color, display }: Appearance): Theme => ({
    ...color === 'dark' ? DefaultDarkTheme : DefaultLightTheme,
    appearance: {
        color,
        display
    }
});

export const generateComponentClasses = <T extends string>(name: string, slots: T[]): Record<T, string> => {
    const classes: Record<string, string> = {};
    for (const slot of slots)
        classes[slot] = `LPD${name}-${slot}`;
    return classes;
};
