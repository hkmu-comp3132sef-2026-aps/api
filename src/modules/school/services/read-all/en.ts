import type { SchoolLang } from "#/modules/school/schemas/langs/_common";
import type { SchoolEn } from "#/modules/school/schemas/langs/en";
import type { School } from "#/schema/school";

import { z } from "zod";

import { schoolSchemaEn } from "#/modules/school/schemas/langs/en";
import { selectSchoolsWithCursor } from "#/modules/school/sql/select";

type ServiceSchoolReadAllEnOptions = {
    search?: string;
    // forward pagination
    first?: number;
    after?: number;
    // backward pagination
    last?: number;
    before?: number;
};

const serviceSchoolReadAllEn = async (
    options: ServiceSchoolReadAllEnOptions,
): Promise<SchoolEn[]> => {
    const result: School[] = await selectSchoolsWithCursor({
        lang: "en" satisfies SchoolLang,
        search: options.search,
        first: options.first,
        after: options.after,
        last: options.last,
        before: options.before,
    });

    const parsed: SchoolEn[] = await z.array(schoolSchemaEn).parseAsync(result);

    return parsed;
};

export type { ServiceSchoolReadAllEnOptions };
export { serviceSchoolReadAllEn };
