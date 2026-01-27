import { z } from "zod";

const schoolLang = [
    "en",
    "zh-hant",
] as const;

const schoolLangSchema = z.enum(schoolLang);

type SchoolLang = z.infer<typeof schoolLangSchema>;

const schoolSchemaBase = z.object({
    school_id: z.number(),
    lang: schoolLangSchema,
    // ...category
    name: z.string(),
    address: z.string(),
    longitude: z.number(),
    latitude: z.number(),
    easting: z.number(),
    northing: z.number(),
    // ...students_gender
    // ...session
    // ...district
    // ...finance_type
    // ...level
    telephone: z.string(),
    fax: z.string(),
});

export type { SchoolLang };
export { schoolLang, schoolLangSchema, schoolSchemaBase };
