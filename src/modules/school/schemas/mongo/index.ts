import type { Collection } from "mongodb";

import { db } from "#/configs/database";

const COLLECTION_NAME: string = "schools" as const;

type School = {
    lang: "en" | "zh-hant";
    schoolId: number;
    category: string;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
    easting: number;
    northing: number;
    studentsGender: string;
    session: string;
    district: string;
    financeType: string;
    level: string;
    telephone: string;
    fax: string;
};

const schools: Collection<School> = db.collection<School>(COLLECTION_NAME);

export type { School };
export { schools };
