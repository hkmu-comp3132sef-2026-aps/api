import SchemaBuilder from "@pothos/core";
import RelayPlugin from "@pothos/plugin-relay";

const gql = new SchemaBuilder<{
    Connection: {
        totalCount: number;
    };
}>({
    plugins: [
        RelayPlugin,
    ],
});

type GQL = typeof gql;

export type { GQL };
export { gql };
