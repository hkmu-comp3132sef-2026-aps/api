import type { SchoolLang } from "#/modules/school/schemas/langs/_common";
import type { SchoolZhHant } from "#/modules/school/schemas/langs/zh-hant";
import type { ServiceSchoolReadAllEnOptions } from "#/modules/school/services/read-all/en";
import type { School } from "#/schema/school";

import { z } from "zod";

import { schoolSchemaZhHant } from "#/modules/school/schemas/langs/zh-hant";
import { selectSchoolsWithCursor } from "#/modules/school/sql/select";

type ServiceSchoolReadAllZhHantOptions = ServiceSchoolReadAllEnOptions;

const serviceSchoolReadAllZhHant = async (
    options: ServiceSchoolReadAllZhHantOptions,
): Promise<SchoolZhHant[]> => {
    const result: School[] = await selectSchoolsWithCursor({
        lang: "zh-hant" satisfies SchoolLang,
        search: options.search,
        first: options.first,
        after: options.after,
        last: options.last,
        before: options.before,
    });

    const parsed: SchoolZhHant[] = await z
        .array(schoolSchemaZhHant)
        .parseAsync(result);

    return parsed;
};

export type { ServiceSchoolReadAllZhHantOptions };
export { serviceSchoolReadAllZhHant };
