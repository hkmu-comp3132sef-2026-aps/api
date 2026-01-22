import type { SQL } from "drizzle-orm";

import type { SchoolLang } from "#/modules/school/schemas/langs/_common";
import type { School } from "#/schema/school";

import { and, asc, desc, eq, gt, lt } from "drizzle-orm";

import { cacheDB } from "#/configs/cache-db";
import { schools } from "#/schema/school";

type SelectSchoolBySchoolIdAndLangOptions = {
    schoolId: number;
    lang: SchoolLang;
};

const selectSchoolBySchoolIdAndLang = async (
    options: SelectSchoolBySchoolIdAndLangOptions,
): Promise<School | undefined> => {
    const prepared = cacheDB
        .select()
        .from(schools)
        .where(
            and(
                eq(schools.schoolId, options.schoolId),
                eq(schools.lang, options.lang),
            ),
        )
        .prepare();

    return (await prepared.execute())[0];
};

type SelectSchoolsByLangOptions = {
    lang: SchoolLang;
};

const selectSchoolsByLang = async (
    options: SelectSchoolsByLangOptions,
): Promise<School[]> => {
    const prepared = cacheDB
        .select()
        .from(schools)
        .where(eq(schools.lang, options.lang))
        .prepare();

    return await prepared.execute();
};

type SelectSchoolsByLangAndCursorOptions = {
    lang: SchoolLang;
    // forward pagination
    first?: number;
    after?: number;
    // backward pagination
    last?: number;
    before?: number;
};

const selectSchoolsByLangAndCursor = async ({
    lang,
    first,
    after,
    last,
    before,
}: SelectSchoolsByLangAndCursorOptions): Promise<School[]> => {
    const isForward: boolean = typeof first === "number";
    const isBackward: boolean = typeof last === "number";
    const isUnpaginated: boolean = !isForward && !isBackward;

    if (isForward && isBackward) return [];

    const cursorCondition: SQL<unknown> | undefined =
        isForward && after !== void 0
            ? gt(schools.schoolId, after)
            : isBackward && before !== void 0
              ? lt(schools.schoolId, before)
              : void 0;

    const whereCondition: SQL<unknown> | undefined =
        cursorCondition !== void 0
            ? and(eq(schools.lang, lang), cursorCondition)
            : eq(schools.lang, lang);

    const orderBy: SQL<unknown> = isBackward
        ? desc(schools.schoolId)
        : asc(schools.schoolId);

    const query = cacheDB
        .select()
        .from(schools)
        .where(whereCondition)
        .orderBy(orderBy);

    if (!isUnpaginated) {
        const limitValue: number = isForward ? (first ?? 0) : (last ?? 0);
        query.limit(limitValue + 1);
    }

    const rows: School[] = await query;

    return isBackward ? rows.reverse() : rows;
};

export type {
    // school
    SelectSchoolBySchoolIdAndLangOptions,
    // schools
    SelectSchoolsByLangOptions,
    SelectSchoolsByLangAndCursorOptions,
};
export {
    // school
    selectSchoolBySchoolIdAndLang,
    // schools
    selectSchoolsByLang,
    selectSchoolsByLangAndCursor,
};
