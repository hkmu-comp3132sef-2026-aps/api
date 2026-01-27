import type { School } from "#/modules/school/schemas/mongo";
import type { SchoolLang } from "#/modules/school/schemas/zod/_common";
import type { SchoolEn } from "#/modules/school/schemas/zod/en";

import { ServiceError } from "#/lib/errors/service";
import { schoolSchemaEn } from "#/modules/school/schemas/zod/en";
import { selectSchoolBySchoolIdAndLang } from "#/modules/school/sql/select";

enum ServiceSchoolReadEnErrorCode {
    NOT_FOUND = "not_found",
}

enum ServiceSchoolReadEnErrorMessage {
    NOT_FOUND = "School not found",
}

const getErrorMessage = (
    code: ServiceSchoolReadEnErrorCode,
): ServiceSchoolReadEnErrorMessage => {
    switch (code) {
        case ServiceSchoolReadEnErrorCode.NOT_FOUND:
            return ServiceSchoolReadEnErrorMessage.NOT_FOUND;
    }
};

type ServiceSchollReadEnOptions = {
    schoolId: number;
};

const serviceSchoolReadEn = async (
    options: ServiceSchollReadEnOptions,
): Promise<SchoolEn> => {
    const result: School | undefined = await selectSchoolBySchoolIdAndLang({
        schoolId: options.schoolId,
        lang: "en" satisfies SchoolLang,
    });

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
