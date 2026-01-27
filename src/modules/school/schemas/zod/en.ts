import { z } from "zod";

import { schoolSchemaBase } from "#/modules/school/schemas/zod/_common";

const schoolCategoryEn = [
    "Aided Primary Schools",
    "Aided Secondary Schools",
    "Aided Special Schools",
    "Caput Secondary Schools",
    "Direct Subsidy Scheme Primary Schools",
    "Direct Subsidy Scheme Secondary Schools",
    "English Schools Foundation (Primary)",
    "English Schools Foundation (Secondary)",
    "Government Primary Schools",
    "Government Secondary Schools",
    "International Schools (Primary)",
    "International Schools (Secondary)",
    "Kindergarten-cum-child Care Centres",
    "Kindergartens",
    "Private Primary Schools",
    "Private Secondary Schools (Day/Evening)",
] as const;

const schoolCategoryEnumEn = z.enum(schoolCategoryEn);

const schoolStudentsGenderEn = [
    "BOYS",
    "GIRLS",
    "CO-ED",
] as const;

const schoolStudentsGenderEnumEn = z.enum(schoolStudentsGenderEn);

const schoolSessionEn = [
    "A.M.",
    "P.M.",
    "EVENING",
    "WHOLE DAY",
] as const;

const schoolSessionEnumEn = z.enum(schoolSessionEn);

const schoolDistrictEn = [
    "KOWLOON CITY",
    "SHA TIN",
    "WAN CHAI",
    "TUEN MUN",
    "YUEN LONG",
    "ISLANDS",
    "KWAI TSING",
    "NORTH",
    "CENTRAL AND WESTERN",
    "TAI PO",
    "SAI KUNG",
    "TSUEN WAN",
    "KWUN TONG",
    "SHAM SHUI PO",
    "EASTERN",
    "WONG TAI SIN",
    "YAU TSIM MONG",
    "SOUTHERN",
    "SHUM SHUI PO",
] as const;

const schoolDistrictEnumEn = z.enum(schoolDistrictEn);

const schoolFinanceTypeEn = [
    "AIDED",
    "CAPUT",
    "DIRECT SUBSIDY SCHEME",
    "ENGLISH SCHOOLS FOUNDATION",
    "GOVERNMENT",
    "PRIVATE",
    "PRIVATE INDEPENDENT SCH SCHEME",
] as const;

const schoolFinanceTypeEnumEn = z.enum(schoolFinanceTypeEn);

const schoolLevelEn = [
    "KINDERGARTEN",
    "KINDERGARTEN-CUM-CHILD CARE CENTRES",
    "PRIMARY",
    "SECONDARY",
] as const;

const schoolLevelEnumEn = z.enum(schoolLevelEn);

const schoolSchemaEn = z.object({
    ...schoolSchemaBase.shape,
    category: schoolCategoryEnumEn,
    students_gender: schoolStudentsGenderEnumEn,
    session: schoolSessionEnumEn,
    district: schoolDistrictEnumEn,
    finance_type: schoolFinanceTypeEnumEn,
    level: schoolLevelEnumEn,
});

type SchoolEn = z.infer<typeof schoolSchemaEn>;

export type { SchoolEn };
export {
    schoolCategoryEn,
    schoolCategoryEnumEn,
    schoolStudentsGenderEn,
    schoolStudentsGenderEnumEn,
    schoolSessionEn,
    schoolSessionEnumEn,
    schoolDistrictEn,
    schoolDistrictEnumEn,
    schoolFinanceTypeEn,
    schoolFinanceTypeEnumEn,
    schoolLevelEn,
    schoolLevelEnumEn,
    schoolSchemaEn,
};
