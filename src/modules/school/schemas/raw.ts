import { z } from "zod";

import {
    schoolCategoryEnumEn,
    schoolDistrictEnumEn,
    schoolFinanceTypeEnumEn,
    schoolLevelEnumEn,
    schoolSessionEnumEn,
    schoolStudentsGenderEnumEn,
} from "#/modules/school/schemas/langs/en";
import {
    schoolCategoryEnumZhHant,
    schoolDistrictEnumZhHant,
    schoolFinanceTypeEnumZhHant,
    schoolLevelEnumZhHant,
    schoolSessionEnumZhHant,
    schoolStudentsGenderEnumZhHant,
} from "#/modules/school/schemas/langs/zh-hant";

const schoolSchemaRaw = z.object({
    "SCHOOL NO.": z.number(),
    "ENGLISH CATEGORY": schoolCategoryEnumEn,
    中文類別: schoolCategoryEnumZhHant,
    "ENGLISH NAME": z.string(),
    中文名稱: z.string(),
    "ENGLISH ADDRESS": z.string(),
    中文地址: z.string(),
    LONGITUDE: z.number(),
    經度: z.number(),
    LATITUDE: z.number(),
    緯度: z.number(),
    EASTING: z.number(),
    坐標東: z.number(),
    NORTHING: z.number(),
    坐標北: z.number(),
    "STUDENTS GENDER": schoolStudentsGenderEnumEn,
    就讀學生性別: schoolStudentsGenderEnumZhHant,
    SESSION: schoolSessionEnumEn,
    學校授課時間: schoolSessionEnumZhHant,
    DISTRICT: schoolDistrictEnumEn,
    分區: schoolDistrictEnumZhHant,
    "FINANCE TYPE": schoolFinanceTypeEnumEn,
    資助種類: schoolFinanceTypeEnumZhHant,
    "SCHOOL LEVEL": schoolLevelEnumEn,
    學校類型: schoolLevelEnumZhHant,
    TELEPHONE: z.string(),
    聯絡電話: z.string(),
    "FAX NUMBER": z.string(),
    傳真號碼: z.string(),
});

type SchoolRaw = z.infer<typeof schoolSchemaRaw>;

export type { SchoolRaw };
export { schoolSchemaRaw };
