import { Hono } from "hono";

import { routerSchoolEn } from "#/modules/school/routes/langs/en";
import { routerSchoolZhHant } from "#/modules/school/routes/langs/zh-hant";

const router: Hono = new Hono();

router.route("/en", routerSchoolEn);

router.route("/zh-hant", routerSchoolZhHant);

export { router as routerSchool };
