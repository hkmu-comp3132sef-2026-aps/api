import type { SchoolInfo } from "#/modules/school/schemas/zod/info";

import { schoolInfoStore } from "#/modules/school/stores/info";

const serviceSchoolInfo = async (): Promise<SchoolInfo> => {
    const { ranAt, updatedAt } = schoolInfoStore.getState();

    return {
        ranAt,
        updatedAt,
    };
};

export { serviceSchoolInfo };
