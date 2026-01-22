import type { School } from "#/schema/school";

import { gql } from "#/configs/graphql";
import { enumsToGqlEnums, gqlEnumToEnum } from "#/lib/graphql/enum";
import { schoolLang } from "#/modules/school/schemas/langs/_common";
import {
    selectSchoolBySchoolIdAndLang,
    selectSchoolsByLang,
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

const schoolsField = (
    t: PothosSchemaTypes.QueryFieldBuilder<
        PothosSchemaTypes.ExtendDefaultTypes<object>,
        object
    >,
) => {
    return t.field({
        type: [
            GqlSchool,
        ],
        args: {
            lang: t.arg({
                type: GqlSchoolLang,
                required: true,
            }),
        },
        resolve: async (_, args): Promise<School[]> => {
            return await selectSchoolsByLang({
                lang: gqlEnumToEnum(args.lang),
            });
        },
    });
};

const schoolField = (
    t: PothosSchemaTypes.QueryFieldBuilder<
        PothosSchemaTypes.ExtendDefaultTypes<object>,
        object
    >,
) => {
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

export { schoolsField, schoolField };
