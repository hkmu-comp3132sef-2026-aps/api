import type { InferSelectModel } from "drizzle-orm";

import { sqliteTable } from "drizzle-orm/sqlite-core";
import { v7 as uuid } from "uuid";

const schools = sqliteTable("schools", (t) => ({
    id: t
        .text()
        .$default((): string => uuid())
        .primaryKey()
        .notNull(),
    lang: t.text().notNull(),
    schoolId: t.integer().notNull(),
    category: t.text().notNull(),
    name: t.text().notNull(),
    address: t.text().notNull(),
    longitude: t.integer().notNull(),
    latitude: t.integer().notNull(),
    easting: t.integer().notNull(),
    northing: t.integer().notNull(),
    studentsGender: t.text().notNull(),
    session: t.text().notNull(),
    district: t.text().notNull(),
    financeType: t.text().notNull(),
    level: t.text().notNull(),
    telephone: t.text().notNull(),
    fax: t.text().notNull(),
}));

type School = InferSelectModel<typeof schools>;

export type { School };
export { schools };
