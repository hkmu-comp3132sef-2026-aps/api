import type { Info } from "#/modules/info/schemas";

import { VERSION } from "#/consts/env";

const serviceInfo = async (): Promise<Info> => {
    return {
        version: VERSION,
    };
};

export { serviceInfo };
