import type { YogaServerInstance } from "graphql-yoga";

import { createYoga } from "graphql-yoga";

import { gql } from "#/configs/graphql";
import { gqlInfoField } from "#/modules/info/graphql";
import { gqlSchoolInfoField } from "#/modules/school/graphql/info";
import {
    gqlSchoolField,
    gqlSchoolsConnectionField,
} from "#/modules/school/graphql/school";

gql.queryType({
    fields: (t) => ({
        info: gqlInfoField(t),
        schoolInfo: gqlSchoolInfoField(t),
        school: gqlSchoolField(t),
        schoolsConnection: gqlSchoolsConnectionField(t),
    }),
});

const yogaServer: YogaServerInstance<object, object> = createYoga({
    schema: gql.toSchema(),
    graphqlEndpoint: "/",
});

export { yogaServer };
