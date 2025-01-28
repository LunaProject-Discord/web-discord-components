import '@emotion/react';
import { Palette, Spacing, Theme as DiscordTheme } from '../utils';

type FormatAsCSSVar<Path extends string> = `var(--discord-${Path})`;

type ToCSSVars<T, Path extends string = ''> = {
    [K in keyof T]: T[K] extends Palette | Spacing // Palette または Spacing の場合
        ? FormatAsCSSVar<`${Path}${K & string}`>
        : T[K] extends object // オブジェクト型の場合は再帰
            ? ToCSSVars<T[K], `${Path}${K & string}-`>
            : FormatAsCSSVar<`${Path}${K & string}`>; // プリミティブ型の場合
};

declare module '@emotion/react' {
    interface Theme extends DiscordTheme {
        vars: ToCSSVars<DiscordTheme>;
    }
}
