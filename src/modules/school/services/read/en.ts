import type { SchoolLang } from "#/modules/school/schemas/langs/_common";
import type { SchoolEn } from "#/modules/school/schemas/langs/en";
import type { School } from "#/schema/school";

import { and, eq } from "drizzle-orm";

import { cacheDB } from "#/configs/cache-db";
import { ServiceError } from "#/lib/errors/service";
import { schoolSchemaEn } from "#/modules/school/schemas/langs/en";
import { schools } from "#/schema/school";

enum ServiceSchoolReadEnErrorCode {
    NOT_FOUND = "not_found",
    UNKNOWN = "unknown",
}

enum ServiceSchoolReadEnErrorMessage {
    NOT_FOUND = "School not found",
    UNKNOWN = "Unknown error",
}

const getErrorMessage = (
    code: ServiceSchoolReadEnErrorCode,
): ServiceSchoolReadEnErrorMessage => {
    switch (code) {
        case ServiceSchoolReadEnErrorCode.NOT_FOUND:
            return ServiceSchoolReadEnErrorMessage.NOT_FOUND;
        case ServiceSchoolReadEnErrorCode.UNKNOWN:
            return ServiceSchoolReadEnErrorMessage.UNKNOWN;
    }
};

type ServiceSchollReadEnOptions = {
    id: string;
};

const serviceSchoolReadEn = async (
    options: ServiceSchollReadEnOptions,
): Promise<SchoolEn> => {
    const prepared = cacheDB
        .select()
        .from(schools)
        .where(
            and(
                eq(schools.id, options.id),
                eq(schools.lang, "en" satisfies SchoolLang),
            ),
        )
        .prepare();

    const result: School | undefined = (await prepared.execute())[0];

    if (!result) {
        const code: ServiceSchoolReadEnErrorCode =
            ServiceSchoolReadEnErrorCode.NOT_FOUND;

        throw new ServiceError()
            .setStatus(404)
            .setCode(code)
            .setMessage(getErrorMessage(code));
    }

    const parsed: SchoolEn = await schoolSchemaEn.parseAsync(result);

    return parsed;
};

export type { ServiceSchollReadEnOptions };
export {
    ServiceSchoolReadEnErrorCode,
    ServiceSchoolReadEnErrorMessage,
    serviceSchoolReadEn,
};
