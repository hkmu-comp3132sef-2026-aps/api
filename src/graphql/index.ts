import type { YogaServerInstance } from "graphql-yoga";

import { maxTokensPlugin } from "@escape.tech/graphql-armor-max-tokens";
import { useResponseCache } from "@graphql-yoga/plugin-response-cache";
import { useContentEncoding } from "@whatwg-node/server";
import { createYoga } from "graphql-yoga";

import { gql } from "#/configs/graphql";
import { gqlInfoField } from "#/modules/info/graphql";
import {
    gqlSchoolField,
    gqlSchoolsConnectionField,
} from "#/modules/school/graphql/school";

gql.globalConnectionFields((t) => ({
    totalCount: t.int({
        nullable: false,
        resolve: (parent) => parent.totalCount,
    }),
}));

gql.queryType({
    fields: (t) => ({
        info: gqlInfoField(t),
        school: gqlSchoolField(t),
        schoolsConnection: gqlSchoolsConnectionField(t),
    }),
});

const yogaServer: YogaServerInstance<object, object> = createYoga({
    schema: gql.toSchema(),
    graphqlEndpoint: "/",
    plugins: [
        // token limitation
        maxTokensPlugin({
            n: 1000,
        }),
        // response caching
        useResponseCache({
            session: () => null,
            ttl: 1000 * 60 * 60, // 1 hour
        }),
        // response compression
        useContentEncoding(),
    ],
});

export { yogaServer };
