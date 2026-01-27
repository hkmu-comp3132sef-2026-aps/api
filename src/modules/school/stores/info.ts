import type { SchoolInfo } from "#/modules/school/schemas/zod/info";

import { createStore } from "zustand/vanilla";

const schoolInfoStore = createStore<SchoolInfo>(() => ({
    ranAt: null,
    updatedAt: null,
}));

export { schoolInfoStore };
