import type { AnyBulkWriteOperation } from "mongodb";

import type { School } from "#/modules/school/schemas/mongo";
import type { SchoolLang } from "#/modules/school/schemas/zod/langs/_common";

import { school } from "#/modules/school/schemas/mongo";

type InsertSchoolPlan = {
    type: "insert";
    schoolId: number;
    lang: SchoolLang;
    data: Omit<School, "id" | "lang" | "schoolId">;
};

type UpdateSchoolPlan = {
    type: "update";
    schoolId: number;
    lang: SchoolLang;
    data: Omit<School, "id" | "lang" | "schoolId">;
};

type UpsertSchoolPlan = InsertSchoolPlan | UpdateSchoolPlan;

const upsertSchoolsByPlans = async (
    options: UpsertSchoolPlan[],
): Promise<void> => {
    const result: AnyBulkWriteOperation<School>[] = [];

    for (let i: number = 0; i < options.length; i++) {
        const option: UpsertSchoolPlan | undefined = options[i];

        if (!option) continue;

        if (option.type === "insert") {
            result.push({
                insertOne: {
                    document: {
                        ...option.data,
                        schoolId: option.schoolId,
                        lang: option.lang,
                    },
                },
            });
        } else if (option.type === "update") {
            result.push({
                updateOne: {
                    filter: {
                        schoolId: option.schoolId,
                        lang: option.lang,
                    },
                    update: {
                        $set: {
                            ...option.data,
                        },
                    },
                },
            });
        }
    }

    if (result.length === 0) return void 0;

    await school.bulkWrite(result);
};

export type { UpsertSchoolPlan };
export { upsertSchoolsByPlans };
