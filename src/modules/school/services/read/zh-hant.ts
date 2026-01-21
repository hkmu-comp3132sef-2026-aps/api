import type { SchoolLang } from "#/modules/school/schemas/langs/_common";
import type { SchoolZhHant } from "#/modules/school/schemas/langs/zh-hant";
import type { School } from "#/schema/school";

import { and, eq } from "drizzle-orm";

import { cacheDB } from "#/configs/cache-db";
import { ServiceError } from "#/lib/errors/service";
import { schoolSchemaZhHant } from "#/modules/school/schemas/langs/zh-hant";
import { schools } from "#/schema/school";

enum ServiceSchoolReadZhHantErrorCode {
    NOT_FOUND = "not_found",
}

enum ServiceSchoolReadZhHantErrorMessage {
    NOT_FOUND = "School not found",
}

const getErrorMessage = (
    code: ServiceSchoolReadZhHantErrorCode,
): ServiceSchoolReadZhHantErrorMessage => {
    switch (code) {
        case ServiceSchoolReadZhHantErrorCode.NOT_FOUND:
            return ServiceSchoolReadZhHantErrorMessage.NOT_FOUND;
    }
};

type ServiceSchollReadZhHantOptions = {
    id: string;
};

const serviceSchoolReadZhHant = async (
    options: ServiceSchollReadZhHantOptions,
): Promise<SchoolZhHant> => {
    const prepared = cacheDB
        .select()
        .from(schools)
        .where(
            and(
                eq(schools.id, options.id),
                eq(schools.lang, "zh-hant" satisfies SchoolLang),
            ),
        )
        .prepare();

    const result: School | undefined = (await prepared.execute())[0];

    if (!result) {
        const code: ServiceSchoolReadZhHantErrorCode =
            ServiceSchoolReadZhHantErrorCode.NOT_FOUND;

        throw new ServiceError()
            .setStatus(404)
            .setCode(code)
            .setMessage(getErrorMessage(code));
    }

    const parsed: SchoolZhHant = await schoolSchemaZhHant.parseAsync(result);

    return parsed;
};

export type { ServiceSchollReadZhHantOptions };
export {
    ServiceSchoolReadZhHantErrorCode,
    ServiceSchoolReadZhHantErrorMessage,
    serviceSchoolReadZhHant,
};
