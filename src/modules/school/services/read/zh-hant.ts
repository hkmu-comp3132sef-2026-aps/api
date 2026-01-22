import type { SchoolLang } from "#/modules/school/schemas/langs/_common";
import type { SchoolZhHant } from "#/modules/school/schemas/langs/zh-hant";
import type { School } from "#/schema/school";

import { ServiceError } from "#/lib/errors/service";
import { schoolSchemaZhHant } from "#/modules/school/schemas/langs/zh-hant";
import {
    selectSchoolByIdAndLang,
    selectSchoolBySchoolIdAndLang,
} from "#/modules/school/sql/select";

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
    id?: string;
    schoolId?: number;
};

const serviceSchoolReadZhHant = async (
    options: ServiceSchollReadZhHantOptions,
): Promise<SchoolZhHant> => {
    let result: School | undefined = void 0;

    if (options.id) {
        result = await selectSchoolByIdAndLang({
            id: options.id,
            lang: "zh-hant" satisfies SchoolLang,
        });
    } else if (options.schoolId) {
        result = await selectSchoolBySchoolIdAndLang({
            schoolId: options.schoolId,
            lang: "zh-hant" satisfies SchoolLang,
        });
    }

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
