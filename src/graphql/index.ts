import { createYoga } from "graphql-yoga";

import { gql } from "#/configs/graphql";
import { schoolField, schoolsConnectionField } from "#/modules/school/graphql";

gql.queryType({
    fields: (t) => ({
        school: schoolField(t),
        schoolsConnection: schoolsConnectionField(t),
    }),
});

const yogaServer = createYoga({
    schema: gql.toSchema(),
    graphqlEndpoint: "/",
});

export { yogaServer };
