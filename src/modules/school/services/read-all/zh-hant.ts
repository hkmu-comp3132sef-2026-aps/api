import type { SchoolLang } from "#/modules/school/schemas/langs/_common";
import type { SchoolZhHant } from "#/modules/school/schemas/langs/zh-hant";
import type { School } from "#/schema/school";

import { z } from "zod";

import { schoolSchemaZhHant } from "#/modules/school/schemas/langs/zh-hant";
import { selectSchoolsByLang } from "#/modules/school/sql/select";

const serviceSchoolReadAllZhHant = async (): Promise<SchoolZhHant[]> => {
    const result: School[] = await selectSchoolsByLang({
        lang: "zh-hant" satisfies SchoolLang,
    });

    const parsed: SchoolZhHant[] = await z
        .array(schoolSchemaZhHant)
        .parseAsync(result);

    return parsed;
};

export { serviceSchoolReadAllZhHant };
