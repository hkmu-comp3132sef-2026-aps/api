import type { SchoolLang } from "#/modules/school/schemas/langs/_common";
import type { SchoolRaw } from "#/modules/school/schemas/raw";

import cron from "node-cron";
import { z } from "zod";

import { schoolSchemaRaw } from "#/modules/school/schemas/raw";
import { insertOrUpdateSchoolBySchoolIdAndLang } from "#/modules/school/sql/mix";
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

    for (let i: number = 0; i < parsed.length; i++) {
        const data: SchoolRaw | undefined = parsed[i];

        if (!data) continue;

        // en

        await insertOrUpdateSchoolBySchoolIdAndLang({
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

        await insertOrUpdateSchoolBySchoolIdAndLang({
            schoolId: data["SCHOOL NO."],
            lang: "zh-hant" satisfies SchoolLang,
            data: {
                category: data.中文類別,
                name: data.中文名稱,
                address: data.中文地址,
                longitude: data.經度,
                latitude: data.緯度,
                easting: data.坐標東,
                northing: data.坐標北,
                studentsGender: data.就讀學生性別,
                session: data.學校授課時間,
                district: data.分區,
                financeType: data.資助種類,
                level: data.學校類型,
                telephone: data.聯絡電話,
                fax: data.傳真號碼,
            },
        });
    }

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
