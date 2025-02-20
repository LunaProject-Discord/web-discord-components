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

export type ConfigTranslations = { [key in ConfigTranslateKeys]: string };

export interface Config {
    locale: 'en' | 'ja';
    translations: ConfigTranslations;
}

const DefaultConfig: Config = {
    locale: 'en',
    translations: {
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
    }
};

export const ConfigContext = createContext<Config>(DefaultConfig);

export const ConfigProvider = ({ value, children }: ProviderProps<{
    locale?: Config['locale'];
    translations?: Partial<Config['translations']>;
}>) => createElement(
    ConfigContext,
    { value: deepmerge(DefaultConfig, value) as Config },
    children
);

