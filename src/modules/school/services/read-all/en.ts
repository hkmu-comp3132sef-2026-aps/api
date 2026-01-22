import type { SchoolLang } from "#/modules/school/schemas/langs/_common";
import type { SchoolEn } from "#/modules/school/schemas/langs/en";
import type { School } from "#/schema/school";

import { z } from "zod";

import { schoolSchemaEn } from "#/modules/school/schemas/langs/en";
import { selectSchoolsByLang } from "#/modules/school/sql/select";

const serviceSchoolReadAllEn = async (): Promise<SchoolEn[]> => {
    const result: School[] = await selectSchoolsByLang({
        lang: "en" satisfies SchoolLang,
    });

    const parsed: SchoolEn[] = await z.array(schoolSchemaEn).parseAsync(result);

    return parsed;
};

export { serviceSchoolReadAllEn };
