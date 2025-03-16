'use client';

import deepmerge from 'deepmerge';
import { createContext, createElement, ProviderProps } from 'react';

export type ConfigTranslateKeys =
    'timestamp_full_short'
    | 'timestamp_full_long'
    | 'timestamp_date_short'
    | 'timestamp_date_long'
    | 'timestamp_time_short'
    | 'timestamp_time_long'
    | 'timestamp_relative_seconds_future'
    | 'timestamp_relative_seconds_past'
    | 'timestamp_relative_minute_future'
    | 'timestamp_relative_minutes_future'
    | 'timestamp_relative_minute_past'
    | 'timestamp_relative_minutes_past'
    | 'timestamp_relative_hour_future'
    | 'timestamp_relative_hours_future'
    | 'timestamp_relative_hour_past'
    | 'timestamp_relative_hours_past'
    | 'timestamp_relative_day_future'
    | 'timestamp_relative_days_future'
    | 'timestamp_relative_day_past'
    | 'timestamp_relative_days_past'
    | 'timestamp_relative_month_future'
    | 'timestamp_relative_months_future'
    | 'timestamp_relative_month_past'
    | 'timestamp_relative_months_past'
    | 'timestamp_relative_year_future'
    | 'timestamp_relative_years_future'
    | 'timestamp_relative_year_past'
    | 'timestamp_relative_years_past'
    | 'timestamp_yesterday'
    | 'timestamp_today'
    | 'timestamp_tomorrow'
    | 'timestamp_other';

export type ConfigTranslateKeyExcludes = Exclude<
    ConfigTranslateKeys,
    'timestamp_full_short'
    | 'timestamp_full_long'
    | 'timestamp_date_short'
    | 'timestamp_date_long'
    | 'timestamp_time_short'
    | 'timestamp_time_long'
    | 'timestamp_relative_seconds_future'
    | 'timestamp_relative_seconds_past'
    | 'timestamp_relative_minute_future'
    | 'timestamp_relative_minutes_future'
    | 'timestamp_relative_minute_past'
    | 'timestamp_relative_minutes_past'
    | 'timestamp_relative_hour_future'
    | 'timestamp_relative_hours_future'
    | 'timestamp_relative_hour_past'
    | 'timestamp_relative_hours_past'
    | 'timestamp_relative_day_future'
    | 'timestamp_relative_days_future'
    | 'timestamp_relative_day_past'
    | 'timestamp_relative_days_past'
    | 'timestamp_relative_month_future'
    | 'timestamp_relative_months_future'
    | 'timestamp_relative_month_past'
    | 'timestamp_relative_months_past'
    | 'timestamp_relative_year_future'
    | 'timestamp_relative_years_future'
    | 'timestamp_relative_year_past'
    | 'timestamp_relative_years_past'
    | 'timestamp_yesterday'
    | 'timestamp_today'
    | 'timestamp_tomorrow'
    | 'timestamp_other'
>;

export type ConfigTranslations = { [key in ConfigTranslateKeys]: string };

export interface Config {
    locale: 'en' | 'ja';
    translations: ConfigTranslations;
}

export const DefaultEnglishTranslations: ConfigTranslations = {
    timestamp_full_short: 'MMMM d, yyyy h:mm a', // f
    timestamp_full_long: 'EEEE, MMMM d, yyyy h:mm a', // F
    timestamp_date_short: 'MM/dd/yyyy', // d
    timestamp_date_long: 'MMMM d, yyyy', // D
    timestamp_time_short: 'h:mm a', // t
    timestamp_time_long: 'h:mm:ss a', // T
    timestamp_relative_seconds_future: 'in %c seconds',
    timestamp_relative_seconds_past: '%c seconds ago',
    timestamp_relative_minute_future: 'in a minute',
    timestamp_relative_minutes_future: 'in %c minutes',
    timestamp_relative_minute_past: 'a minute ago',
    timestamp_relative_minutes_past: '%c minutes ago',
    timestamp_relative_hour_future: 'in an hour',
    timestamp_relative_hours_future: 'in %c hours',
    timestamp_relative_hour_past: 'an hour ago',
    timestamp_relative_hours_past: '%c hours ago',
    timestamp_relative_day_future: 'in a day',
    timestamp_relative_days_future: 'in %c days',
    timestamp_relative_day_past: 'a day ago',
    timestamp_relative_days_past: '%c days ago',
    timestamp_relative_month_future: 'in a month',
    timestamp_relative_months_future: 'in %c months',
    timestamp_relative_month_past: 'a month ago',
    timestamp_relative_months_past: '%c months ago',
    timestamp_relative_year_future: 'in a year',
    timestamp_relative_years_future: 'in %c years',
    timestamp_relative_year_past: 'a year ago',
    timestamp_relative_years_past: '%c years ago',
    timestamp_yesterday: '\'Yesterday at\' h:mm a',
    timestamp_today: '\'Today at\' h:mm a',
    timestamp_tomorrow: '\'Tomorrow at\' h:mm a',
    timestamp_other: 'MM/dd/yyyy h:mm a'
};

export const DefaultJapaneseTranslations: ConfigTranslations = {
    timestamp_full_short: 'yyyy年M月d日 H:mm', // f
    timestamp_full_long: 'yyyy年M月d日 EEEE H:mm', // F
    timestamp_date_short: 'yyyy/MM/dd', // d
    timestamp_date_long: 'yyyy年M月d日', // D
    timestamp_time_short: 'H:mm', // t
    timestamp_time_long: 'H:mm:ss', // T
    timestamp_relative_seconds_future: '%c秒後',
    timestamp_relative_seconds_past: '%c秒前',
    timestamp_relative_minute_future: '1分後',
    timestamp_relative_minutes_future: '%c分後',
    timestamp_relative_minute_past: '1分前',
    timestamp_relative_minutes_past: '%c分前',
    timestamp_relative_hour_future: '1時間後',
    timestamp_relative_hours_future: '%c時間後',
    timestamp_relative_hour_past: '1時間前',
    timestamp_relative_hours_past: '%c時間前',
    timestamp_relative_day_future: '1日後',
    timestamp_relative_days_future: '%c日後',
    timestamp_relative_day_past: '1日前',
    timestamp_relative_days_past: '%c日前',
    timestamp_relative_month_future: '1ヶ月後',
    timestamp_relative_months_future: '%cヶ月後',
    timestamp_relative_month_past: '1ヶ月前',
    timestamp_relative_months_past: '%cヶ月前',
    timestamp_relative_year_future: '1年後',
    timestamp_relative_years_future: '%c年後',
    timestamp_relative_year_past: '1年前',
    timestamp_relative_years_past: '%c年前',
    timestamp_yesterday: '\'昨日\' H:mm',
    timestamp_today: '\'今日\' H:mm',
    timestamp_tomorrow: '\'明日\' H:mm',
    timestamp_other: 'yyyy/MM/dd H:mm'
};

export const DefaultConfig: Config = {
    locale: 'en',
    translations: DefaultEnglishTranslations
};

export const ConfigContext = createContext<Config>(DefaultConfig);

export const ConfigProvider = ({ value, children }: ProviderProps<{
    locale?: Config['locale'];
    translations?: Partial<{ [key in ConfigTranslateKeyExcludes]: string }>;
}>) => createElement(
    ConfigContext,
    {
        value: deepmerge(
            DefaultConfig,
            {
                locale: value?.locale,
                translations: {
                    ...(value?.locale === 'ja' ? DefaultJapaneseTranslations : DefaultEnglishTranslations),
                    ...value?.translations
                }
            }
        ) as Config
    },
    children
);

