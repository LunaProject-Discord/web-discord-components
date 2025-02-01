import { DateTime } from 'luxon';

export const formatTimestamp = (timestamp: DateTime<true> | 'now') => {
    if (timestamp === 'now')
        timestamp = DateTime.now();

    const isToday = timestamp.hasSame(DateTime.now(), 'day');
    if (isToday)
        return timestamp.toFormat('\'Today at\' H:mm');

    const isYesterday = timestamp.hasSame(DateTime.now().minus({ days: 1 }), 'day');
    if (isYesterday)
        return timestamp.toFormat('\'Yesterday at\' H:mm');

    const isTomorrow = timestamp.hasSame(DateTime.now().plus({ days: 1 }), 'day');
    if (isTomorrow)
        return timestamp.toFormat('\'Tomorrow at\' H:mm');

    return timestamp.toFormat('yyyy/MM/dd H:mm');
};
