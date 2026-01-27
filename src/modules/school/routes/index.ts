import { Hono } from "hono";

import { startFetchSchoolCron } from "#/modules/school/crons/fetch-school";
import { routerSchoolInfo } from "#/modules/school/routes/info";
import { routerSchoolEn } from "#/modules/school/routes/langs/en";
import { routerSchoolZhHant } from "#/modules/school/routes/langs/zh-hant";

await startFetchSchoolCron();

const router: Hono = new Hono();

router.route("/", routerSchoolInfo);

router.route("/en", routerSchoolEn);

router.route("/zh-hant", routerSchoolZhHant);

export { router as routerSchool };
