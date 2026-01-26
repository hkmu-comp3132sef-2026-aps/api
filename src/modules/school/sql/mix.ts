import type { PlanUpsertSchoolsResult } from "#/modules/school/sql/select";

import { and, eq } from "drizzle-orm";

import { writeDB } from "#/configs/cache-db";
import { schools } from "#/schema/school";

const insertOrUpdateSchoolBySchoolIdAndLang = async (
    options: PlanUpsertSchoolsResult[],
): Promise<void> => {
    await writeDB.transaction(async (tx) => {
        await Promise.all(
            options.map((option) => {
                if (option.type === "insert") {
                    return tx.insert(schools).values({
                        ...option.data,
                        lang: option.lang,
                        schoolId: option.schoolId,
                    });
                } else if (option.type === "update") {
                    return tx
                        .update(schools)
                        .set(option.data)
                        .where(
                            and(
                                eq(schools.schoolId, option.schoolId),
                                eq(schools.lang, option.lang),
                            ),
                        );
                } else {
                    return Promise.resolve();
                }
            }),
        );
    });
};

export { insertOrUpdateSchoolBySchoolIdAndLang };
