import type { SchoolLang } from "#/modules/school/schemas/langs/_common";
import type { SchoolRaw } from "#/modules/school/schemas/raw";
import type { PlanUpsertSchoolsResult } from "#/modules/school/sql/select";

import cron from "node-cron";
import { z } from "zod";

import { schoolSchemaRaw } from "#/modules/school/schemas/raw";
import { insertOrUpdateSchoolBySchoolIdAndLang } from "#/modules/school/sql/mix";
import { buildUpsertSchoolsPlan } from "#/modules/school/sql/select";
import { schoolInfoStore } from "#/modules/school/stores/info";

const URL_SCHOOL_DATA =
    "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.json" as const;

const fetchSchool = async (): Promise<void> => {
    // fetch data

    schoolInfoStore.setState({
        ranAt: new Date().toISOString(),
    });

    const response: Response = await fetch(URL_SCHOOL_DATA);

    if (!response.ok) throw new Error("failed to fetch school data");

    // parse data

    const raw: unknown = await response.json();

    const parsed: SchoolRaw[] = await z.array(schoolSchemaRaw).parseAsync(raw);

    // save data

    const result: PlanUpsertSchoolsResult[] = [];

    for (let i: number = 0; i < parsed.length; i++) {
        const data: SchoolRaw | undefined = parsed[i];

        if (!data) continue;

        // en

        const resultEn: PlanUpsertSchoolsResult | undefined =
            await buildUpsertSchoolsPlan({
                schoolId: data["SCHOOL NO."],
                lang: "en" satisfies SchoolLang,
                data: {
                    category: data["ENGLISH CATEGORY"],
                    name: data["ENGLISH NAME"],
                    address: data["ENGLISH ADDRESS"],
                    longitude: data.LONGITUDE,
                    latitude: data.LATITUDE,
                    easting: data.EASTING,
                    northing: data.NORTHING,
                    studentsGender: data["STUDENTS GENDER"],
                    session: data.SESSION,
                    district: data.DISTRICT,
                    financeType: data["FINANCE TYPE"],
                    level: data["SCHOOL LEVEL"],
                    telephone: data.TELEPHONE,
                    fax: data["FAX NUMBER"],
                },
            });

        resultEn && result.push(resultEn);

        // zh-hant

        const resultZhHant: PlanUpsertSchoolsResult | undefined =
            await buildUpsertSchoolsPlan({
                schoolId: data["SCHOOL NO."],
                lang: "en" satisfies SchoolLang,
                data: {
                    category: data["ENGLISH CATEGORY"],
                    name: data["ENGLISH NAME"],
                    address: data["ENGLISH ADDRESS"],
                    longitude: data.LONGITUDE,
                    latitude: data.LATITUDE,
                    easting: data.EASTING,
                    northing: data.NORTHING,
                    studentsGender: data["STUDENTS GENDER"],
                    session: data.SESSION,
                    district: data.DISTRICT,
                    financeType: data["FINANCE TYPE"],
                    level: data["SCHOOL LEVEL"],
                    telephone: data.TELEPHONE,
                    fax: data["FAX NUMBER"],
                },
            });

        resultZhHant && result.push(resultZhHant);
    }

    await insertOrUpdateSchoolBySchoolIdAndLang(result);

    schoolInfoStore.setState({
        updatedAt: new Date().toISOString(),
    });
};

const tryFetchSchool = async (): Promise<void> => {
    try {
        await fetchSchool();
    } catch (err: unknown) {
        console.error(err);
    }
};

const startFetchSchoolCron = async (): Promise<void> => {
    await tryFetchSchool();

    // run each hour
    cron.schedule("0 * * * *", tryFetchSchool);
};

export { startFetchSchoolCron };
