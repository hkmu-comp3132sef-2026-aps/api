import type { Omit } from "ts-vista";

import type { SchoolLang } from "#/modules/school/schemas/langs/_common";

import { and, eq } from "drizzle-orm";

import { db } from "#/configs/cache-db";
import { type School, schools } from "#/schema/school";

const isSameData = (
    current: School,
    next: InsertOrUpdateSchoolBySchoolIdAndLangOptions["data"],
): boolean => {
    return (Object.keys(next) as Array<keyof typeof next>).every((key) =>
        Object.is(current[key], next[key]),
    );
};

type InsertOrUpdateSchoolBySchoolIdAndLangOptions = {
    schoolId: number;
    lang: SchoolLang;
    data: Omit<School, "id" | "lang" | "schoolId">;
};

const insertOrUpdateSchoolBySchoolIdAndLang = async (
    options: InsertOrUpdateSchoolBySchoolIdAndLangOptions,
): Promise<void> => {
    const preparedEn = db
        .select()
        .from(schools)
        .where(
            and(
                eq(schools.schoolId, options.schoolId),
                eq(schools.lang, options.lang),
            ),
        )
        .limit(1)
        .prepare();

    const current: School | undefined = (await preparedEn.execute())[0];

    if (current) {
        if (isSameData(current, options.data)) return void 0;

        await db
            .update(schools)
            .set(options.data)
            .where(
                and(
                    eq(schools.schoolId, options.schoolId),
                    eq(schools.lang, options.lang),
                ),
            )
            .execute();
    } else {
        await db
            .insert(schools)
            .values({
                ...options.data,
                lang: options.lang,
                schoolId: options.schoolId,
            })
            .execute();
    }
};

export type { InsertOrUpdateSchoolBySchoolIdAndLangOptions };
export { insertOrUpdateSchoolBySchoolIdAndLang };
