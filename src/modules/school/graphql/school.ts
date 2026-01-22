import type { GqlQueryFieldBuilder } from "#/@types/graphql";
import type { School } from "#/schema/school";

import { gql } from "#/configs/graphql";
import { decodeCursor, encodeCursor } from "#/lib/graphql/cursor";
import { enumsToGqlEnums, gqlEnumToEnum } from "#/lib/graphql/enum";
import { schoolLang } from "#/modules/school/schemas/langs/_common";
import {
    selectSchoolBySchoolIdAndLang,
    selectSchoolsByLangAndCursor,
} from "#/modules/school/sql/select";

const GqlSchoolLang = gql.enumType("SchoolLang", {
    values: enumsToGqlEnums(schoolLang),
});

const GqlSchool = gql.objectRef<School>("School");

GqlSchool.implement({
    fields: (t) => ({
        id: t.exposeString("id"),
        lang: t.exposeString("lang"),
        schoolId: t.exposeInt("schoolId"),
        category: t.exposeString("category"),
        name: t.exposeString("name"),
        address: t.exposeString("address"),
        longitude: t.exposeFloat("longitude"),
        latitude: t.exposeFloat("latitude"),
        easting: t.exposeInt("easting"),
        northing: t.exposeInt("northing"),
        studentsGender: t.exposeString("studentsGender"),
        session: t.exposeString("session"),
        district: t.exposeString("district"),
        financeType: t.exposeString("financeType"),
        level: t.exposeString("level"),
        telephone: t.exposeString("telephone"),
        fax: t.exposeString("fax"),
    }),
});

const gqlSchoolField = (t: GqlQueryFieldBuilder) => {
    return t.field({
        type: GqlSchool,
        args: {
            schoolId: t.arg.int({
                required: true,
            }),
            lang: t.arg({
                type: GqlSchoolLang,
                required: true,
            }),
        },
        resolve: async (_, args): Promise<School | undefined> => {
            return await selectSchoolBySchoolIdAndLang({
                schoolId: args.schoolId,
                lang: gqlEnumToEnum(args.lang),
            });
        },
    });
};

const gqlSchoolsConnectionField = (t: GqlQueryFieldBuilder) => {
    return t.connection({
        type: GqlSchool,
        args: {
            lang: t.arg({
                type: GqlSchoolLang,
                required: true,
            }),
        },
        resolve: async (_, args) => {
            const isForward: boolean = typeof args.first === "number";

            const rows: School[] = await selectSchoolsByLangAndCursor({
                lang: gqlEnumToEnum(args.lang),
                first: args.first ?? void 0,
                after: args.after ? decodeCursor(args.after) : void 0,
                last: args.last ?? void 0,
                before: args.before ? decodeCursor(args.before) : void 0,
            });

            const limit: number = isForward
                ? (args.first ?? Number.MAX_SAFE_INTEGER)
                : (args.last ?? Number.MAX_SAFE_INTEGER);

            const hasExtraRow: boolean = rows.length > limit;
            const items: School[] = hasExtraRow ? rows.slice(0, limit) : rows;

            if (items.length === 0)
                return {
                    edges: [],
                    pageInfo: {
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                };

            const startCursor: string | null =
                items.length > 0
                    ? encodeCursor((items[0] as School).schoolId)
                    : null;

            const endCursor: string | null =
                items.length > 0
                    ? encodeCursor((items[items.length - 1] as School).schoolId)
                    : null;

            const hasNextPage: boolean =
                hasExtraRow && items.length < rows.length;

            const hasPreviousPage: boolean = hasExtraRow && items.length > 0;

            return {
                edges: items.map((school: School) => ({
                    cursor: encodeCursor(school.schoolId),
                    node: school,
                })),
                pageInfo: {
                    startCursor,
                    endCursor,
                    hasNextPage,
                    hasPreviousPage,
                },
            };
        },
    });
};

export { gqlSchoolField, gqlSchoolsConnectionField };
