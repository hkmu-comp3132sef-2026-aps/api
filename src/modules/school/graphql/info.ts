import type { GqlQueryFieldBuilder } from "#/@types/graphql";
import type { SchoolInfo } from "#/modules/school/schemas/zod/info";

import { gql } from "#/configs/graphql";
import { serviceSchoolInfo } from "#/modules/school/services/info";

const GqlSchoolInfo = gql.objectRef<SchoolInfo>("SchoolInfo");

GqlSchoolInfo.implement({
    fields: (t) => ({
        ranAt: t.exposeString("ranAt"),
        updatedAt: t.exposeString("updatedAt"),
    }),
});

const gqlSchoolInfoField = (t: GqlQueryFieldBuilder) => {
    return t.field({
        type: GqlSchoolInfo,
        resolve: async (): Promise<SchoolInfo> => {
            return await serviceSchoolInfo();
        },
    });
};

export { gqlSchoolInfoField };
