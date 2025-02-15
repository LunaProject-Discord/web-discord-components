import { createElement } from 'react';
import { Link } from '../../../components';
import { defineRule } from './index';

const pathize = (href: string) => href.replace(/^attachment:\/\//, '/');

const resolvePathable = (href: string) => {
    const path = pathize(href);
    if (path !== href) {
        let origin: string;
        try {
            origin = window.location.origin;
        } catch {
            origin = 'https://lunaproject.jp';
        }
        return new URL(path, origin).href;
    }
    return href;
};

export const link = defineRule({
    capture: (source) => {
        const match = /^<([^ :>]+:\/[^ >]+)>/.exec(source);
        if (!match)
            return;

        try {
            new URL(match[1]);
        } catch {
            return;
        }

        return {
            size: match[0].length,
            url: new URL(match[1]).href
        };
    },
    render: (capture) => createElement(
        Link,
        {
            href: pathize(capture.url)
        },
        resolvePathable(capture.url)
    )
});

export const autoLink = defineRule({
    capture: (source) => {
        const match = /^(?:attachment|https?):\/\/[^\s<]+[^\s"',.:;<\]]/.exec(source);
        if (!match)
            return;

        let url = match[0];
        let searchLeft = 0;
        let searchRight = url.length - 1;

        while (url[searchRight] === ')') {
            const index = url.indexOf('(', searchLeft);
            if (index === -1) {
                url = url.slice(0, -1);
                break;
            }
            searchLeft = index + 1;
            searchRight -= 1;
        }

        try {
            new URL(url);
        } catch {
            return;
        }

        return {
            size: url.length,
            url
        };
    },
    render: (capture) => createElement(
        Link,
        {
            href: pathize(capture.url)
        },
        resolvePathable(capture.url)
    )
});

const INVITE_RESOLVABLE_RE = /^(https:\/\/)?((?:www\.)?(discord(?:app)?\.com\/invite)|(discord\.gg))\/(?<invite>.+)/;

export const maskedLink = defineRule({
    capture: (source, _, parse) => {
        const match = /^\[((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*)\]\(\s*<?((?:\([^)]*\)|[^\s\\]|\\.)*?)>?(?:\s+['"](.*?)['"])?\s*\)/su.exec(source);
        if (!match)
            return;

        const invalid = {
            valid: false,
            size: match[0].length,
            raw: match[0],
            content: parse(match[1]),
            url: match[2],
            title: match[3]
        };

        if (match[1].trim().length === 0)
            return invalid;

        try {
            new URL(match[1]);
            return invalid;
        } catch {
        }

        let url: URL;
        try {
            url = new URL(match[2]);
        } catch {
            return;
        }

        if (INVITE_RESOLVABLE_RE.test(match[1]))
            return invalid;

        return {
            valid: true,
            size: match[0].length,
            raw: match[0],
            content: parse(match[1]),
            url: url.href,
            title: match[3]
        };
    },
    render: (capture, render) => {
        if (!capture.valid)
            return createElement(
                'span',
                {},
                capture.raw
            );

        return createElement(
            Link,
            {
                href: pathize(capture.url),
                title: capture.title
            },
            render(capture.content)
        );
    }
});

// ブログ形式の投稿でのみ使用される画像リンクのルール (実際には使用されていない)
export const maskedImageLink = defineRule({
    capture: (source) => {
        const match = /^!\[((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*)\]\(\s*<?((?:\([^)]*\)|[^\s\\]|\\.)*?)>?(?:\s+['"](.*?)['"])?\s*\)/su.exec(source);
        if (!match)
            return;

        try {
            new URL(match[2]);
        } catch {
            return;
        }

        const dotDelimited = new URL(match[2]).pathname.split('.');
        return {
            size: match[0].length,
            content: match[1],
            url: new URL(match[2]).href,
            extension:
                dotDelimited.length === 0
                    ? null
                    : dotDelimited[dotDelimited.length - 1].toLowerCase(),
            title: match[3]
        };
    },
    render: (capture) => {
        // TODO 仮実装
        return capture.extension !== null && ['mp4'].includes(capture.extension) ? createElement(
            'video',
            {
                src: pathize(capture.url),
                title: capture.title,
                rel: 'noreferrer noopener nofollow ugc',
                controls: true,
                className: 'rounded-lg'
            }
        ) : createElement(
            'img',
            {
                src: pathize(capture.url),
                alt: capture.content || capture.title,
                title: capture.title,
                rel: 'noreferrer noopener nofollow ugc',
                className: 'rounded-lg'
            }
        );
    }
});
