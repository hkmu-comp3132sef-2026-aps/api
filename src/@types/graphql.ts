type GqlQueryFieldBuilder = PothosSchemaTypes.QueryFieldBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<{
        Connection: {
            totalCount: number;
        };
    }>,
    object
>;

type GqlEdge<T> = {
    cursor: string;
    node: T;
};

type GqlPageInfo = {
    startCursor?: string;
    endCursor?: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

type GqlConnection<T> = {
    totalCount: number;
    edges: GqlEdge<T>[];
    pageInfo: GqlPageInfo;
};

export type { GqlQueryFieldBuilder, GqlEdge, GqlPageInfo, GqlConnection };
