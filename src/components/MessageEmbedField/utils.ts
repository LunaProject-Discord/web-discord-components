import { MessageEmbedFieldColumn } from './index';

const MAX_FIELDS_PER_ROW = 3;
const FIELD_GRID_SIZE = 12;

export const getFieldGridColumn = (fields: boolean[], index: number): MessageEmbedFieldColumn => {
    const isInline = fields[index];
    if (!isInline)
        return { start: 1, end: FIELD_GRID_SIZE + 1 };

    let startingField = index;
    while (startingField > 0 && fields[startingField - 1])
        startingField -= 1;

    let totalInlineFields = 0;
    while (fields.length > startingField + totalInlineFields && fields[startingField + totalInlineFields])
        totalInlineFields += 1;

    const indexInSequence = index - startingField;
    const currentRow = indexInSequence / MAX_FIELDS_PER_ROW;
    const indexOnRow = indexInSequence % MAX_FIELDS_PER_ROW;
    const totalOnLastRow = totalInlineFields % MAX_FIELDS_PER_ROW || MAX_FIELDS_PER_ROW;
    const fullRows = (totalInlineFields - totalOnLastRow) / MAX_FIELDS_PER_ROW;
    const totalOnRow = currentRow >= fullRows ? totalOnLastRow : MAX_FIELDS_PER_ROW;

    const columnSpan = FIELD_GRID_SIZE / totalOnRow;
    const start = indexOnRow * columnSpan + 1;
    const end = start + columnSpan;

    return { start, end };
};
