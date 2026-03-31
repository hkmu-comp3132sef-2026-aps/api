import type { FindCursor, WithId } from "mongodb";

import type { School } from "#/modules/school/schemas/mongo";
import type { SchoolLang } from "#/modules/school/schemas/zod/_common";

import { schools } from "#/modules/school/schemas/mongo";

type SelectSchoolBySchoolIdAndLangOptions = {
    lang: SchoolLang;
    schoolId: string;
};

const selectSchoolBySchoolIdAndLang = async (
    options: SelectSchoolBySchoolIdAndLangOptions,
): Promise<School | undefined> => {
    const query: School | null = await schools.findOne({
        school_id: options.schoolId,
        lang: options.lang,
    });

    return query ?? void 0;
};

type SelectSchoolsWithCursorOptions = {
    lang: SchoolLang;
    search?: string;
    // forward pagination
    first?: number;
    after?: string;
    // backward pagination
    last?: number;
    before?: string;
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

    const cursor: FindCursor<WithId<School>> = schools
        .find({
            lang,
            ...(isForward &&
                after && {
                    school_id: {
                        $gt: after,
                    },
                }),
            ...(isBackward &&
                before && {
                    school_id: {
                        $lt: before,
                    },
                }),
            ...(search &&
                search.trim().length > 0 && {
                    name: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                }),
        })
        .sort({
            school_id: last ? -1 : 1,
        });

    const limit: number | undefined = isUnpaginated
        ? void 0
        : ((isForward ? first : last) ?? 0);

    if (limit !== void 0) {
        cursor.limit(limit + 1);
    }

    const rows: School[] = await cursor.toArray();

    return isBackward ? rows.reverse() : rows;
};

type CountSchoolsOptions = {
    lang: SchoolLang;
    search?: string;
};

const countSchools = async ({
    lang,
    search,
}: CountSchoolsOptions): Promise<number> => {
    return await schools.countDocuments({
        lang,
        ...(search &&
            search.trim().length > 0 && {
                name: {
                    $regex: search.trim(),
                    $options: "i",
                },
            }),
    });
};

export type {
    // school
    SelectSchoolBySchoolIdAndLangOptions,
    // schools
    SelectSchoolsWithCursorOptions,
    CountSchoolsOptions,
};
export {
    // school
    selectSchoolBySchoolIdAndLang,
    // schools
    selectSchoolsWithCursor,
    countSchools,
};
