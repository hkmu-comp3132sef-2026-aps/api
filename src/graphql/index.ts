import type { YogaServerInstance } from "graphql-yoga";

import { maxTokensPlugin } from "@escape.tech/graphql-armor-max-tokens";
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
    plugins: [
        maxTokensPlugin({
            n: 1000,
        }),
    ],
});

export { yogaServer };
