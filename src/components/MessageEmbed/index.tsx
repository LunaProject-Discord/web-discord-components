'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, Fragment, useEffect, useMemo, useRef } from 'react';
import { MessageEmbedData } from '../../interfaces';
import { Markdown } from '../../transformers';
import { generateComponentClasses } from '../../utils';
import { decimalToHex } from '../../utils/embed';
import { Link } from '../Link';
import { MessageEmbedAuthor } from '../MessageEmbedAuthor';
import { getFieldGridColumn, MessageEmbedField } from '../MessageEmbedField';
import { MessageEmbedFooter, messageEmbedFooterClasses } from '../MessageEmbedFooter';
import { MessageEmbedGallery } from '../MessageEmbedGallery';
import { MessageEmbedImage, messageEmbedImageClasses } from '../MessageEmbedImage';
import { messageEmbedThumbnailClasses } from '../MessageEmbedThumbnail';

export const messageEmbedClasses = generateComponentClasses(
    'MessageEmbed',
    [
        'root',
        'title',
        'description',
        'fields'
    ]
);

const MessageEmbedRootElement: ElementType = 'div';

export const MessageEmbedRoot = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedRootElement>) => (
        <MessageEmbedRootElement
            className={
                clsx(
                    messageEmbedClasses.root,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    maxWidth: 520,
    padding: '.5rem 1rem 1rem .75rem',
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto',
    alignSelf: 'start',
    justifySelf: 'start',
    backgroundColor: theme.palette.background.secondary,
    borderLeft: 'solid 4px',
    borderRadius: 4,
    [`&:has(.${messageEmbedThumbnailClasses.root}) :where(.${messageEmbedImageClasses.root}, .${messageEmbedFooterClasses.root})`]: {
        gridColumn: '1 / 3'
    }
}));

const MessageEmbedTitleElement: ElementType = 'h4';

export const MessageEmbedTitle = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedTitleElement>) => (
        <MessageEmbedTitleElement
            className={
                clsx(
                    messageEmbedClasses.title,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    marginTop: 8,
    gridColumn: '1 / 1',
    display: 'inline-block',
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: '22px',
    whiteSpace: 'break-spaces',
    wordWrap: 'break-word',
    color: theme.palette.text.primary
}));

const MessageEmbedDescriptionElement: ElementType = 'div';

export const MessageEmbedDescription = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedDescriptionElement>) => (
        <MessageEmbedDescriptionElement
            className={
                clsx(
                    messageEmbedClasses.description,
                    className
                )
            }
            {...props}
        />
    )
)(({ theme }) => ({
    marginTop: 8,
    gridColumn: '1 / 1',
    display: 'inline-block',
    fontSize: '.875rem',
    fontWeight: 400,
    lineHeight: '1.125rem',
    whiteSpace: 'pre-line',
    wordWrap: 'break-word',
    color: theme.palette.text.primary
}));

const MessageEmbedFieldsElement: ElementType = 'div';

export const MessageEmbedFields = styled(
    ({ className, ...props }: ComponentPropsWithRef<typeof MessageEmbedFieldsElement>) => (
        <MessageEmbedFieldsElement
            className={
                clsx(
                    messageEmbedClasses.fields,
                    className
                )
            }
            {...props}
        />
    )
)({
    marginTop: 8,
    gridColumn: '1 / 1',
    display: 'grid',
    gap: 8
});

export interface MessageEmbedProps {
    embed: MessageEmbedData;
}

export const MessageEmbed = (
    {
        embed: {
            title,
            description,
            url,
            color,
            timestamp,
            author,
            footer,
            fields,
            images,
            thumbnail
        }
    }: MessageEmbedProps
) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    const fieldInlines = useMemo(() => (fields ?? []).map(({ inline }) => inline ?? false), [fields]);

    useEffect(() => {
        const { current: container } = containerRef;
        if (!container)
            return;

        container.style.maxWidth = '';
    }, [images?.length === 1 && images[0]]);

    return (
        <MessageEmbedRoot
            ref={containerRef}
            style={{
                borderLeftColor: color ? decimalToHex(color) : undefined
            }}
        >
            {author && <MessageEmbedAuthor
                name={author.name}
                url={author.url}
                iconUrl={author.iconUrl}
            />}
            {title && <MessageEmbedTitle>
                {url ? <Link href={url}>
                    <Markdown
                        content={title}
                        features="title"
                    />
                </Link> : <Markdown
                    content={title}
                    features="title"
                />}
            </MessageEmbedTitle>}
            {description && <MessageEmbedDescription>
                <Markdown
                    content={description}
                    features="full"
                />
            </MessageEmbedDescription>}
            {fields && <MessageEmbedFields>
                {fields.map(({ name, value }, i) => (
                    <MessageEmbedField
                        key={name}
                        name={
                            <Markdown
                                content={name}
                                features="title"
                            />
                        }
                        value={
                            <Markdown
                                content={value}
                                features={{
                                    extend: 'full',
                                    headings: false
                                }}
                            />
                        }
                        column={getFieldGridColumn(fieldInlines, i)}
                    />
                ))}
            </MessageEmbedFields>}
            {images && <Fragment>
                {images.length > 1 ? <MessageEmbedGallery images={images} /> : <MessageEmbedImage
                    ref={imageRef}
                    src={images[0]}
                    onLoad={() => {
                        const { current: container } = containerRef;
                        const { current: image } = imageRef;
                        if (!container || !image)
                            return;

                        const { width } = image.getBoundingClientRect();
                        container.style.maxWidth = width >= 300 ? `${width + 32}px` : '';
                    }}
                />}
            </Fragment>}
            {thumbnail && <MessageEmbedImage src={thumbnail} />}
            {(timestamp || footer?.text) && <MessageEmbedFooter
                timestamp={timestamp}
                text={footer?.text}
                iconUrl={footer?.iconUrl}
            />}
        </MessageEmbedRoot>
    );
};
