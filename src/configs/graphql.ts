import SchemaBuilder from "@pothos/core";

const gql = new SchemaBuilder({});

type Gql = typeof gql;

export type { Gql };
export { gql };
