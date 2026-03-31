const encodeCursor = (value: string): string =>
    Buffer.from(value.toString(), "utf-8").toString("base64");

const decodeCursor = (cursor: string): string =>
    Buffer.from(cursor, "base64").toString("utf-8");

export { encodeCursor, decodeCursor };
