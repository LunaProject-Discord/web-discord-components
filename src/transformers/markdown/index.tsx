import React, { Fragment } from 'react';
import {
    autoLink,
    blockquote,
    bold,
    channelMention,
    code,
    codeBlock,
    commandMention,
    createMarkdownParser,
    customEmoji,
    escape,
    globalMention,
    guildSectionMention,
    heading, InitialState,
    italic,
    lineBreak,
    link,
    list,
    maskedImageLink,
    maskedLink,
    paragraph,
    placeholder,
    renderMarkdownNodes,
    roleMention,
    Rule,
    small,
    spoiler,
    State,
    strikethrough,
    text,
    timestamp,
    underline,
    unicodeEmoji,
    userMention
} from './rules';

type RuleOptionKey =
    | 'headings'
    | 'smalls'
    | 'codeBlocks'
    | 'inlineCode'
    | 'blockquotes'
    | 'lists'
    | 'paragraphs'
    | 'escapes'
    // | 'references'
    | 'links'
    | 'autoLinks'
    | 'maskedImageLinks'
    | 'maskedLinks'
    | 'italic'
    | 'bold'
    | 'underline'
    | 'strikethrough'
    | 'lineBreaks'
    | 'spoilers'
    | 'timestamps'
    | 'globalMentions'
    | 'guildSectionMentions'
    | 'channelMentions'
    | 'userMentions'
    | 'roleMentions'
    | 'commandMentions'
    | 'customEmojis'
    | 'unicodeEmojis'
    | 'placeholders'
    | 'text';

export const ruleOptions: Record<
    RuleOptionKey,
    { rule: Rule; title?: boolean; full?: boolean }
> = {
    headings: { rule: heading, full: true },
    smalls: { rule: small, full: true },
    codeBlocks: { rule: codeBlock, full: true },
    inlineCode: { rule: code, title: true, full: true },
    blockquotes: { rule: blockquote, full: true },
    lists: { rule: list, full: true },
    paragraphs: { rule: paragraph, title: true, full: true },
    escapes: { rule: escape, title: true, full: true },
    // references: { rule: reference, full: true },
    links: { rule: link, title: true, full: true },
    autoLinks: { rule: autoLink, title: true, full: true },
    maskedImageLinks: { rule: maskedImageLink },
    maskedLinks: { rule: maskedLink, full: true },
    italic: { rule: italic, title: true, full: true },
    bold: { rule: bold, title: true, full: true },
    underline: { rule: underline, title: true, full: true },
    strikethrough: { rule: strikethrough, title: true, full: true },
    lineBreaks: { rule: lineBreak, title: true, full: true },
    spoilers: { rule: spoiler, title: true, full: true },
    timestamps: { rule: timestamp, title: true, full: true },
    globalMentions: { rule: globalMention, full: true },
    guildSectionMentions: { rule: guildSectionMention, title: true, full: true },
    channelMentions: { rule: channelMention, title: true, full: true },
    userMentions: { rule: userMention, full: true },
    roleMentions: { rule: roleMention, full: true },
    commandMentions: { rule: commandMention, full: true },
    customEmojis: { rule: customEmoji, title: true, full: true },
    unicodeEmojis: { rule: unicodeEmoji, title: true, full: true },
    placeholders: { rule: placeholder, title: true, full: true },
    text: { rule: text, title: true, full: true }
};

export type MarkdownFeatures = 'title' | 'full';

export type FeatureConfig =
    | MarkdownFeatures
    | (Partial<Record<RuleOptionKey, boolean>> & { extend?: MarkdownFeatures });

const extendable: Record<MarkdownFeatures, RuleOptionKey[]> = {
    full: Object.entries(ruleOptions)
        .filter((pair) => pair[1].full)
        .map((pair) => pair[0] as RuleOptionKey),
    title: Object.entries(ruleOptions)
        .filter((pair) => pair[1].title)
        .map((pair) => pair[0] as RuleOptionKey)
};

const getRules = (features: FeatureConfig) => {
    if (typeof features === 'string')
        return extendable[features].map((key) => ruleOptions[key].rule);

    const { extend, ...ft } = features;
    const enabledKeys = extend
        ? [
            ...extendable[extend].filter((key) => ft[key] !== false),
            ...Object.keys(ruleOptions).filter(
                (key) => ft[key as RuleOptionKey] === true
            )
        ]
        : Object.entries(ft)
            .filter((pair) => pair[1])
            .map((pair) => pair[0]);

    return Object.entries(ruleOptions)
        .filter((pair) => enabledKeys.includes(pair[0]))
        .map((pair) => pair[1].rule);
};

export const getEnabledRuleKeys = (features: FeatureConfig): RuleOptionKey[] => {
    if (typeof features === 'string')
        return extendable[features];

    const { extend, ...ft } = features;
    if (extend)
        return [
            ...extendable[extend].filter((key) => ft[key] !== false),
            ...Object.keys(ruleOptions).filter(
                (key): key is RuleOptionKey => ft[key as RuleOptionKey] === true
            )
        ];

    return Object.entries(ft)
        .filter((pair) => pair[1])
        .map((pair) => pair[0] as RuleOptionKey);
};

/**
 * Emulate what Discord silently does to strings before saving the data
 */
const trimContent = (text: string) => text.trim();

export interface MarkdownProps {
    content: string;
    features?: FeatureConfig;
    initialState?: InitialState;
}

export const Markdown = ({ content, features, initialState }: MarkdownProps) => {
    const parse = createMarkdownParser(getRules(features ?? 'full'), initialState);
    const result = parse(trimContent(content));

    return (
        <Fragment>
            {renderMarkdownNodes(result)}
        </Fragment>
    );
};
