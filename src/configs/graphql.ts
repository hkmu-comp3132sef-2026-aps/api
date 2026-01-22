import SchemaBuilder from "@pothos/core";
import RelayPlugin from "@pothos/plugin-relay";

const gql = new SchemaBuilder({
    plugins: [
        RelayPlugin,
    ],
});

type Gql = typeof gql;

export type { Gql };
export { gql };
