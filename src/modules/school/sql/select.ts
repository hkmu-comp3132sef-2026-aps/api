import type { SQL } from "drizzle-orm";

import type { SchoolLang } from "#/modules/school/schemas/langs/_common";
import type { School } from "#/schema/school";

import { and, asc, desc, eq, gt, like, lt, sql } from "drizzle-orm";

import { readDB } from "#/configs/cache-db";
import { schools } from "#/schema/school";

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

type PlanUpsertSchoolsOptions = {
    schoolId: number;
    lang: SchoolLang;
    data: Omit<School, "id" | "lang" | "schoolId">;
};

type PlanInsertSchoolsResult = {
    type: "insert";
    schoolId: number;
    lang: SchoolLang;
    data: Omit<School, "id" | "lang" | "schoolId">;
};

type PlanUpdateSchoolsResult = {
    type: "update";
    schoolId: number;
    lang: SchoolLang;
    data: Omit<School, "id" | "lang" | "schoolId">;
};

type PlanUpsertSchoolsResult =
    | PlanInsertSchoolsResult
    | PlanUpdateSchoolsResult;

const buildUpsertSchoolsPlan = async (
    options: PlanUpsertSchoolsOptions,
): Promise<PlanUpsertSchoolsResult | undefined> => {
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

        return {
            type: "update",
            schoolId: options.schoolId,
            lang: options.lang,
            data: options.data,
        };
    } else {
        return {
            type: "insert",
            schoolId: options.schoolId,
            lang: options.lang,
            data: options.data,
        };
    }
};

type SelectSchoolBySchoolIdAndLangOptions = {
    schoolId: number;
    lang: SchoolLang;
};

const selectSchoolBySchoolIdAndLang = async (
    options: SelectSchoolBySchoolIdAndLangOptions,
): Promise<School | undefined> => {
    const prepared = readDB
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

type SelectSchoolsWithCursorOptions = {
    lang: SchoolLang;
    search?: string;
    // forward pagination
    first?: number;
    after?: number;
    // backward pagination
    last?: number;
    before?: number;
};

const selectSchoolsWithCursor = async ({
    lang,
    search,
    first,
    after,
    last,
    before,
}: SelectSchoolsWithCursorOptions): Promise<School[]> => {
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

    const searchCondition: SQL<unknown> | undefined =
        search && search.trim().length > 0
            ? // ilike approach for SQLite
              like(sql`lower(${schools.name})`, `%${search.toLowerCase()}%`)
            : void 0;

    const whereCondition: SQL<unknown> | undefined = and(
        eq(schools.lang, lang),
        cursorCondition,
        searchCondition,
    );

    const orderBy: SQL<unknown> = isBackward
        ? desc(schools.schoolId)
        : asc(schools.schoolId);

    const query = readDB
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
    PlanUpsertSchoolsOptions,
    PlanUpsertSchoolsResult,
    // school
    SelectSchoolBySchoolIdAndLangOptions,
    // schools
    SelectSchoolsWithCursorOptions,
};
export {
    buildUpsertSchoolsPlan,
    // school
    selectSchoolBySchoolIdAndLang,
    // schools
    selectSchoolsWithCursor,
};
