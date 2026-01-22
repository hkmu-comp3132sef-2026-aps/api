type ReplaceDash<T extends string> = T extends `${infer A}-${infer B}`
    ? `${A}_${ReplaceDash<B>}`
    : T;

type UppercaseString<T extends string> = Uppercase<T>;

type GqlEnumKey<T extends string> = UppercaseString<ReplaceDash<T>>;

const enumsToGqlEnums = <T extends readonly string[]>(
    values: T,
): GqlEnumKey<T[number]>[] => {
    return values.map(
        (value) =>
            value.toUpperCase().replaceAll("-", "_") as GqlEnumKey<T[number]>,
    ) as GqlEnumKey<T[number]>[];
};

const enumToGqlEnum = <T extends string>(value: T): GqlEnumKey<T> => {
    return value.toUpperCase().replaceAll("-", "_") as GqlEnumKey<T>;
};

const gqlEnumToEnum = <T extends string>(value: GqlEnumKey<T>): T => {
    return value.toLowerCase().replaceAll("_", "-") as T;
};

export type { GqlEnumKey };
export { enumsToGqlEnums, enumToGqlEnum, gqlEnumToEnum };
