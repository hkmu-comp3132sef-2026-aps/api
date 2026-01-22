const encodeCursor = (value: number): string =>
    Buffer.from(value.toString(), "utf8").toString("base64");

const decodeCursor = (cursor: string): number =>
    Number(Buffer.from(cursor, "base64").toString("utf8"));

export { encodeCursor, decodeCursor };
