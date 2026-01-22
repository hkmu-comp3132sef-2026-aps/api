import type { SchoolLang } from "#/modules/school/schemas/langs/_common";
import type { SchoolEn } from "#/modules/school/schemas/langs/en";
import type { School } from "#/schema/school";

import { ServiceError } from "#/lib/errors/service";
import { schoolSchemaEn } from "#/modules/school/schemas/langs/en";
import {
    selectSchoolByIdAndLang,
    selectSchoolBySchoolIdAndLang,
} from "#/modules/school/sql/select";

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
    id?: string;
    schoolId?: number;
};

const serviceSchoolReadEn = async (
    options: ServiceSchollReadEnOptions,
): Promise<SchoolEn> => {
    let result: School | undefined = void 0;

    if (options.id) {
        result = await selectSchoolByIdAndLang({
            id: options.id,
            lang: "en" satisfies SchoolLang,
        });
    } else if (options.schoolId) {
        result = await selectSchoolBySchoolIdAndLang({
            schoolId: options.schoolId,
            lang: "en" satisfies SchoolLang,
        });
    }

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
