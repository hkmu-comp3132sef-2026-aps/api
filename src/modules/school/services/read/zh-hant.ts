import type { School } from "#/modules/school/schemas/mongo";
import type { SchoolLang } from "#/modules/school/schemas/zod/_common";
import type { SchoolZhHant } from "#/modules/school/schemas/zod/zh-hant";

import { ServiceError } from "#/lib/errors/service";
import { schoolSchemaZhHant } from "#/modules/school/schemas/zod/zh-hant";
import { selectSchoolBySchoolIdAndLang } from "#/modules/school/sql/select";

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
    schoolId: number;
};

const serviceSchoolReadZhHant = async (
    options: ServiceSchollReadZhHantOptions,
): Promise<SchoolZhHant> => {
    const result: School | undefined = await selectSchoolBySchoolIdAndLang({
        schoolId: options.schoolId,
        lang: "zh-hant" satisfies SchoolLang,
    });

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
