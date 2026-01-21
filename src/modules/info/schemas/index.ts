import { z } from "zod";

const infoSchema = z.object({
    version: z.string(),
});

type Info = z.infer<typeof infoSchema>;

export type { Info };
export { infoSchema };
