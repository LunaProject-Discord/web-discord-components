'use client';

import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, ElementType, Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { MessageEmbedData } from '../../interfaces';
import { Markdown } from '../../transformers';
import { decimalToHex, generateComponentClasses, Styles, ThemeCSSVariableValues } from '../../utils';
import { Link } from '../Link';
import { MessageEmbedAuthor } from '../MessageEmbedAuthor';
import { getFieldGridColumn, MessageEmbedField } from '../MessageEmbedField';
import { MessageEmbedFooter, messageEmbedFooterClasses } from '../MessageEmbedFooter';
import { MessageEmbedGallery } from '../MessageEmbedGallery';
import { MessageEmbedImage, messageEmbedImageClasses } from '../MessageEmbedImage';
import { MessageEmbedThumbnail, messageEmbedThumbnailClasses } from '../MessageEmbedThumbnail';

export const messageEmbedClasses = generateComponentClasses(
    'MessageEmbed',
    [
        'root',
        'title',
        'description',
        'fields'
    ]
);

export const messageEmbedStyles: Styles<typeof messageEmbedClasses> = {
    root: {
        maxWidth: 520,
        padding: '.5rem 1rem 1rem .75rem',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'auto',
        gridTemplateRows: 'auto',
        alignSelf: 'start',
        justifySelf: 'start',
        backgroundColor: ThemeCSSVariableValues.palette.background.secondary,
        borderLeft: `solid 4px ${ThemeCSSVariableValues.palette.background.tertiary}`,
        borderRadius: 4,
        [`&:has(.${messageEmbedThumbnailClasses.root}) :where(.${messageEmbedImageClasses.root}, .${messageEmbedFooterClasses.root})`]: {
            gridColumn: '1 / 3'
        }
    },
    title: {
        marginTop: 8,
        gridColumn: '1 / 1',
        display: 'inline-block',
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: '22px',
        whiteSpace: 'break-spaces',
        wordWrap: 'break-word',
        color: ThemeCSSVariableValues.palette.text.primary
    },
    description: {
        marginTop: 8,
        gridColumn: '1 / 1',
        display: 'inline-block',
        fontSize: '.875rem',
        fontWeight: 400,
        lineHeight: '1.125rem',
        whiteSpace: 'pre-line',
        wordWrap: 'break-word',
        color: ThemeCSSVariableValues.palette.text.primary
    },
    fields: {
        marginTop: 8,
        gridColumn: '1 / 1',
        display: 'grid',
        gap: 8
    }
};

export const MessageEmbedRootElement: ElementType = 'div';

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
)(messageEmbedStyles.root);

export const MessageEmbedTitleElement: ElementType = 'h4';

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
)(messageEmbedStyles.title);

export const MessageEmbedDescriptionElement: ElementType = 'div';

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
)(messageEmbedStyles.description);

export const MessageEmbedFieldsElement: ElementType = 'div';

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
)(messageEmbedStyles.fields);

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
    const imageRef = useRef<HTMLImageElement | null>(null);

    const [maxWidth, setMaxWidth] = useState<string | undefined>(undefined);

    const fieldInlines = useMemo(() => (fields ?? []).map(({ inline }) => inline ?? false), [fields]);
    const isSingleImage = useMemo(() => images !== undefined && images.length === 1 && images[0] !== undefined, [images]);

    useEffect(() => setMaxWidth(undefined), [isSingleImage]);

    return (
        <MessageEmbedRoot
            style={{
                maxWidth,
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
                        key={i}
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
            {(images && images.length > 0) && <Fragment>
                {images.length > 1 ? <MessageEmbedGallery images={images} /> : <MessageEmbedImage
                    ref={imageRef}
                    src={images[0]}
                    onLoad={() => {
                        const { current: image } = imageRef;
                        if (!image)
                            return;

                        const { width } = image.getBoundingClientRect();
                        setMaxWidth(width >= 300 ? `${width + 32}px` : '');
                    }}
                />}
            </Fragment>}
            {thumbnail && <MessageEmbedThumbnail src={thumbnail} />}
            {(timestamp || footer?.text) && <MessageEmbedFooter
                timestamp={timestamp}
                text={footer?.text}
                iconUrl={footer?.iconUrl}
            />}
        </MessageEmbedRoot>
    );
};
