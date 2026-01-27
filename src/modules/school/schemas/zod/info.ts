import { z } from "zod";

const schoolInfoSchema = z.object({
    ranAt: z.iso.datetime().nullable(),
    updatedAt: z.iso.datetime().nullable(),
});

type SchoolInfo = z.infer<typeof schoolInfoSchema>;

export type { SchoolInfo };
export { schoolInfoSchema };
