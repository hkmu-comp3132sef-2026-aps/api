import type { SchoolLang } from "#/modules/school/schemas/langs/_common";
import type { SchoolZhHant } from "#/modules/school/schemas/langs/zh-hant";
import type { School } from "#/schema/school";

import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { cacheDB } from "#/configs/cache-db";
import { schoolSchemaZhHant } from "#/modules/school/schemas/langs/zh-hant";
import { schools } from "#/schema/school";

const serviceSchoolReadAllZhHant = async (): Promise<SchoolZhHant[]> => {
    const prepared = cacheDB
        .select()
        .from(schools)
        .where(
            and(
                eq(schools.lang, "zh-hant" satisfies SchoolLang),
                // more...
            ),
        )
        .prepare();

    const result: School[] = await prepared.execute();

    const parsed: SchoolZhHant[] = await z
        .array(schoolSchemaZhHant)
        .parseAsync(result);

    return parsed;
};

export { serviceSchoolReadAllZhHant };
