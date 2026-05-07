const toStringValue = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);

    try {
        return JSON.stringify(value);
    } catch {
        return String(value);
    }
};

const escapeCsvValue = (value, separator) => {
    const raw = toStringValue(value);
    const escaped = raw.replaceAll('"', '""');

    const mustQuote =
        escaped.includes(separator) ||
        escaped.includes('\n') ||
        escaped.includes('\r') ||
        escaped.includes('"');

    return mustQuote ? `"${escaped}"` : escaped;
};

export const getColumnsFromObjects = (items, { preferredColumns = [] } = {}) => {
    const union = new Set();

    (items || []).forEach((item) => {
        if (!item || typeof item !== 'object') return;
        Object.keys(item).forEach((key) => union.add(key));
    });

    const preferred = preferredColumns.filter((key) => union.has(key));
    const rest = Array.from(union)
        .filter((key) => !preferredColumns.includes(key))
        .sort((a, b) => a.localeCompare(b));

    const columns = [...preferred, ...rest];
    return columns.length > 0 ? columns : [...preferredColumns];
};

export const objectsToCsv = (
    items,
    {
        columns = getColumnsFromObjects(items, {
            preferredColumns: ['id', 'title', 'genre', 'year', 'rating', 'poster'],
        }),
        separator = ',',
        includeHeaders = true,
    } = {}
) => {
    const lines = [];

    if (includeHeaders) {
        lines.push(columns.map((c) => escapeCsvValue(c, separator)).join(separator));
    }

    (items || []).forEach((item) => {
        const row = columns.map((col) => escapeCsvValue(item?.[col], separator)).join(separator);
        lines.push(row);
    });

    // Excel-friendly line breaks
    return lines.join('\r\n');
};

export const objectsToCsvUtf8 = (items, options) => {
    // UTF-8 BOM so Excel opens accents correctly
    return `\ufeff${objectsToCsv(items, options)}`;
};
