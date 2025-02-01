export interface Content {
    type?: string;
    attrs?: Record<string, any>;
    content?: Content[];
    marks?: Mark[];
    text?: string;
}

export interface Mark {
    type: string;
    attrs?: Record<string, any>;
}
