import type { SchoolLang } from "#/modules/school/schemas/langs/_common";
import type { School } from "#/schema/school";

import { and, eq } from "drizzle-orm";

import { cacheDB } from "#/configs/cache-db";
import { schools } from "#/schema/school";

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

const selectSchools = async (): Promise<School[]> => {
    const prepared = cacheDB.select().from(schools).prepare();

    return await prepared.execute();
};

type SelectSchoolByIdAndLangOptions = {
    id: string;
    lang: SchoolLang;
};

const selectSchoolByIdAndLang = async (
    options: SelectSchoolByIdAndLangOptions,
): Promise<School | undefined> => {
    const prepared = cacheDB
        .select()
        .from(schools)
        .where(and(eq(schools.id, options.id), eq(schools.lang, options.lang)))
        .prepare();

    return (await prepared.execute())[0];
};

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

type SelectSchoolBySchoolIdOptions = {
    schoolId: number;
};

const selectSchoolBySchoolId = async (
    options: SelectSchoolBySchoolIdOptions,
): Promise<School | undefined> => {
    const prepared = cacheDB
        .select()
        .from(schools)
        .where(and(eq(schools.schoolId, options.schoolId)))
        .prepare();

    return (await prepared.execute())[0];
};

export type {
    SelectSchoolsByLangOptions,
    SelectSchoolByIdAndLangOptions,
    SelectSchoolBySchoolIdAndLangOptions,
    SelectSchoolBySchoolIdOptions,
};
export {
    selectSchoolsByLang,
    selectSchools,
    selectSchoolByIdAndLang,
    selectSchoolBySchoolIdAndLang,
    selectSchoolBySchoolId,
};
