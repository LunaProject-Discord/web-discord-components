import { DateTime } from 'luxon';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30.436875 * DAY;
const YEAR = 12 * MONTH;

export interface RelativeTimestamp {
    unit: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds';
    type: 'future' | 'past';
    value: number;
}

export const getRelativeTimestamp = (timestamp: DateTime<true>): RelativeTimestamp => {
    const now = DateTime.local({ zone: 'utc' });
    const timeline = timestamp.diff(now).milliseconds > 0 ? 'future' : 'past';
    const diff = Math.abs(timestamp.toSeconds() - now.toSeconds());

    let unit: RelativeTimestamp['unit'];
    let value: number;

    if (diff < MINUTE) {
        unit = 'seconds';
        value = Math.round(diff / SECOND);
    } else if (diff < HOUR) {
        unit = 'minutes';
        value = Math.round(diff / MINUTE);
    } else if (diff < HOUR * 21.5) {
        unit = 'hours';
        value = Math.round(diff / HOUR);
    } else if (diff < DAY * 25.5) {
        unit = 'days';
        value = Math.round(diff / DAY);
    } else if (diff < MONTH * 10.5) {
        unit = 'months';
        value = Math.round(diff / MONTH);
    } else {
        unit = 'years';
        value = Math.round(diff / YEAR);
    }

    return {
        unit,
        type: timeline,
        value
    };
};

export const formatTimestamp = (
    timestamp: DateTime<true> | 'now',
    formats: {
        today: string;
        yesterday: string;
        tomorrow: string;
        other: string;
    }
) => {
    if (timestamp === 'now')
        timestamp = DateTime.now();

    const isToday = timestamp.hasSame(DateTime.now(), 'day');
    if (isToday)
        return timestamp.toFormat(formats.today);

    const isYesterday = timestamp.hasSame(DateTime.now().minus({ days: 1 }), 'day');
    if (isYesterday)
        return timestamp.toFormat(formats.yesterday);

    const isTomorrow = timestamp.hasSame(DateTime.now().plus({ days: 1 }), 'day');
    if (isTomorrow)
        return timestamp.toFormat(formats.tomorrow);

    return timestamp.toFormat(formats.other);
};
