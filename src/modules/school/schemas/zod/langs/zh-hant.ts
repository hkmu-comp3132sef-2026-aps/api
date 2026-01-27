import { z } from "zod";

import { schoolSchemaBase } from "#/modules/school/schemas/zod/langs/_common";

const schoolCategoryZhHant = [
    "資助小學",
    "資助中學",
    "資助特殊學校",
    "按位津貼中學",
    "直接資助計劃小學",
    "直接資助計劃中學",
    "英基學校協會（小學）",
    "英基學校協會（中學）",
    "官立小學",
    "官立中學",
    "國際學校（小學）",
    "國際學校（中學）",
    "幼稚園暨幼兒中心",
    "幼稚園",
    "私立小學",
    "私立中學（日校 / 夜校）",
] as const;

const schoolCategoryEnumZhHant = z.enum(schoolCategoryZhHant);

const schoolStudentsGenderZhHant = [
    "男",
    "女",
    "男女",
] as const;

const schoolStudentsGenderEnumZhHant = z.enum(schoolStudentsGenderZhHant);

const schoolSessionZhHant = [
    "上午",
    "下午",
    "夜校",
    "全日",
] as const;

const schoolSessionEnumZhHant = z.enum(schoolSessionZhHant);

const schoolDistrictZhHant = [
    "九龍城區",
    "沙田區",
    "灣仔區",
    "屯門區",
    "元朗區",
    "離島區",
    "葵青區",
    "北區",
    "中西區",
    "大埔區",
    "西貢區",
    "荃灣區",
    "觀塘區",
    "深水埗區",
    "東區",
    "黃大仙區",
    "油尖旺區",
    "南區",
    "觀塘",
] as const;

const schoolDistrictEnumZhHant = z.enum(schoolDistrictZhHant);

const schoolFinanceTypeZhHant = [
    "資助",
    "按位津貼",
    "直接資助計劃",
    "英基學校協會",
    "官立",
    "私立",
    "私立獨立學校計劃",
] as const;

const schoolFinanceTypeEnumZhHant = z.enum(schoolFinanceTypeZhHant);

const schoolLevelZhHant = [
    "幼稚園",
    "幼稚園暨幼兒中心",
    "小學",
    "中學",
] as const;

const schoolLevelEnumZhHant = z.enum(schoolLevelZhHant);

const schoolSchemaZhHant = z.object({
    ...schoolSchemaBase.shape,
    category: schoolCategoryEnumZhHant,
    studentsGender: schoolStudentsGenderEnumZhHant,
    session: schoolSessionEnumZhHant,
    district: schoolDistrictEnumZhHant,
    financeType: schoolFinanceTypeEnumZhHant,
    level: schoolLevelEnumZhHant,
});

type SchoolZhHant = z.infer<typeof schoolSchemaZhHant>;

export type { SchoolZhHant };
export {
    schoolCategoryZhHant,
    schoolCategoryEnumZhHant,
    schoolStudentsGenderZhHant,
    schoolStudentsGenderEnumZhHant,
    schoolSessionZhHant,
    schoolSessionEnumZhHant,
    schoolDistrictZhHant,
    schoolDistrictEnumZhHant,
    schoolFinanceTypeZhHant,
    schoolFinanceTypeEnumZhHant,
    schoolLevelZhHant,
    schoolLevelEnumZhHant,
    schoolSchemaZhHant,
};
