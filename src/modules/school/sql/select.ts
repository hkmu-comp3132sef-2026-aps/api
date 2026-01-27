import type { FindCursor, WithId } from "mongodb";

import type { School } from "#/modules/school/schemas/mongo";
import type { SchoolLang } from "#/modules/school/schemas/zod/langs/_common";

import { school } from "#/modules/school/schemas/mongo";

type SelectSchoolBySchoolIdAndLangOptions = {
    schoolId: number;
    lang: SchoolLang;
};

const selectSchoolBySchoolIdAndLang = async (
    options: SelectSchoolBySchoolIdAndLangOptions,
): Promise<School | undefined> => {
    const query: School | null = await school.findOne({
        schoolId: options.schoolId,
        lang: options.lang,
    });

    return query ?? void 0;
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

    const cursor: FindCursor<WithId<School>> = school
        .find({
            lang,
            ...(isForward &&
                after && {
                    schoolId: {
                        $gt: after,
                    },
                }),
            ...(isBackward &&
                before && {
                    schoolId: {
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
            schoolId: last ? -1 : 1,
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

const selectSchools = async (): Promise<School[]> => {
    const rows: School[] = await school.find({}).toArray();
    return rows;
};

export type {
    // school
    SelectSchoolBySchoolIdAndLangOptions,
    // schools
    SelectSchoolsWithCursorOptions,
};
export {
    // school
    selectSchoolBySchoolIdAndLang,
    // schools
    selectSchoolsWithCursor,
    selectSchools,
};
