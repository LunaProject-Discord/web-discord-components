import { DateTime } from 'luxon';
import { createElement } from 'react';
import { Timestamp } from '../../../components';
import { defineRule } from './utils';

const timestampFormats = {
    f: 'full_short',
    F: 'full_long',
    d: 'date_short',
    D: 'date_long',
    t: 'time_short',
    T: 'time_long',
    R: 'relative'
} as const;

export const timestamp = defineRule({
    capture(source) {
        const match = /^<t:(-?\d+)(?::([DFRTdft]))?>/.exec(source);
        if (!match)
            return;

        const dateTime = DateTime.fromSeconds(Number(match[1]), { zone: 'utc' });
        if (!dateTime.isValid)
            return;

        return {
            size: match[0].length,
            timestamp: dateTime,
            format: timestampFormats[(match[2] as keyof typeof timestampFormats) ?? 'f']
        };
    },
    render: (capture, _) => createElement(
        Timestamp,
        {
            timestamp: capture.timestamp,
            format: capture.format
        }
    )
});
