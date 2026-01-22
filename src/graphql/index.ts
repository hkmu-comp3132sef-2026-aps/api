import { createYoga } from "graphql-yoga";

import { gql } from "#/configs/graphql";
import { schoolField, schoolsField } from "#/modules/school/graphql";

gql.queryType({
    fields: (t) => ({
        schools: schoolsField(t),
        school: schoolField(t),
    }),
});

const yogaServer = createYoga({
    schema: gql.toSchema(),
    graphqlEndpoint: "/",
});

export { yogaServer };
