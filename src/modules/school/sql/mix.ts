import type { Omit } from "ts-vista";

import type { SchoolLang } from "#/modules/school/schemas/langs/_common";

import { and, eq } from "drizzle-orm";

import { cacheDB } from "#/configs/cache-db";
import { type School, schools } from "#/schema/school";

type InsertOrUpdateSchoolBySchoolIdAndLangOptions = {
    schoolId: number;
    lang: SchoolLang;
    data: Omit<School, "id" | "lang" | "schoolId">;
};

const insertOrUpdateSchoolBySchoolIdAndLang = async (
    options: InsertOrUpdateSchoolBySchoolIdAndLangOptions,
): Promise<void> => {
    const preparedEn = cacheDB
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
        await cacheDB
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
        await cacheDB
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
