import type { Omit } from "ts-vista";

import type { SchoolLang } from "#/modules/school/schemas/langs/_common";

import { and, eq } from "drizzle-orm";

import { readDB, writeDB } from "#/configs/cache-db";
import { type School, schools } from "#/schema/school";

const isSameData = <T extends Record<string, unknown>>(
    current: T,
    next: Partial<T>,
): boolean => {
    for (let i: number = 0; i < Object.keys(next).length; i++) {
        const key: keyof T = Object.keys(next)[i] as keyof T;

        if (current[key] !== next[key]) {
            console.log(
                "Difference found in key:",
                key,
                "Current:",
                current[key],
                "Next:",
                next[key],
            );
            return false;
        }
    }

    return true;
};

type InsertOrUpdateSchoolBySchoolIdAndLangOptions = {
    schoolId: number;
    lang: SchoolLang;
    data: Omit<School, "id" | "lang" | "schoolId">;
};

const insertOrUpdateSchoolBySchoolIdAndLang = async (
    options: InsertOrUpdateSchoolBySchoolIdAndLangOptions,
): Promise<void> => {
    const preparedEn = readDB
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

        await writeDB
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
        await writeDB
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
