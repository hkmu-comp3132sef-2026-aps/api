import type { GqlQueryFieldBuilder } from "#/@types/graphql";
import type { Info } from "#/modules/info/schemas";

import { gql } from "#/configs/graphql";
import { serviceInfo } from "#/modules/info/services";

const GqlInfo = gql.objectRef<Info>("Info");

GqlInfo.implement({
    fields: (t) => ({
        version: t.exposeString("version"),
    }),
});

const gqlInfoField = (t: GqlQueryFieldBuilder) => {
    return t.field({
        type: GqlInfo,
        resolve: async (): Promise<Info> => {
            return await serviceInfo();
        },
    });
};

export { gqlInfoField };
