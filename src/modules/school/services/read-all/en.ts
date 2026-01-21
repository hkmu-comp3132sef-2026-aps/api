import type { SchoolLang } from "#/modules/school/schemas/langs/_common";
import type { SchoolEn } from "#/modules/school/schemas/langs/en";
import type { School } from "#/schema/school";

import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { cacheDB } from "#/configs/cache-db";
import { schoolSchemaEn } from "#/modules/school/schemas/langs/en";
import { schools } from "#/schema/school";

const serviceSchoolReadAllEn = async (): Promise<SchoolEn[]> => {
    const prepared = cacheDB
        .select()
        .from(schools)
        .where(
            and(
                eq(schools.lang, "en" satisfies SchoolLang),
                // more...
            ),
        )
        .prepare();

    const result: School[] = await prepared.execute();

    const parsed: SchoolEn[] = await z.array(schoolSchemaEn).parseAsync(result);

    return parsed;
};

export { serviceSchoolReadAllEn };
