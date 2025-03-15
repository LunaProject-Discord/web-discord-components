import { DefaultDarkTheme, Theme } from './theme';

type FormatAsCSSVariable<Path extends string> = `--discord-${Path}`;

type TransformCSSVariableKeys<T = Omit<Theme, 'appearance'>, Path extends string = ''> = {
    [K in keyof T]: T[K] extends object // オブジェクト型の場合は再帰
        ? TransformCSSVariableValues<T[K], `${Path}${K & string}-`>
        : FormatAsCSSVariable<`${Path}${K & string}`>;
};

type TransformCSSVariableValues<T = Omit<Theme, 'appearance'>, Path extends string = ''> = {
    [K in keyof T]: T[K] extends object // オブジェクト型の場合は再帰
        ? TransformCSSVariableValues<T[K], `${Path}${K & string}-`>
        : `var(${FormatAsCSSVariable<`${Path}${K & string}`>})`;
};

const asCssVariables = (obj: Omit<Theme, 'appearance'>, type: 'key' | 'value'): any => {
    const result: any = {};

    const traverse = (nestedObj: any, path: string, target: any) => {
        Object.entries(nestedObj).forEach(([key, value]) => {
            const newPath = `${path}-${key}`;

            if (typeof value === 'string') {
                target[key] = type === 'value' ? `var(${newPath})` : newPath;
            } else if (typeof value === 'object' && value !== null) {
                target[key] = {}; // ネストされたオブジェクトを作成
                traverse(value, newPath, target[key]);
            }
        });
    };

    traverse(obj, '--discord', result);
    return result;
};


export const ThemeCSSVariableKeys: TransformCSSVariableKeys = asCssVariables(DefaultDarkTheme, 'key');
export const ThemeCSSVariableValues: TransformCSSVariableValues = asCssVariables(DefaultDarkTheme, 'value');
