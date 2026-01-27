import type { Collection } from "mongodb";

import { db } from "#/configs/database";

const COLLECTION_NAME: string = "schools" as const;

type School = {
    school_id: number;
    lang: "en" | "zh-hant";
    category: string;
    name: string;
    address: string;
    longitude: number;
    latitude: number;
    easting: number;
    northing: number;
    students_gender: string;
    session: string;
    district: string;
    finance_type: string;
    level: string;
    telephone: string;
    fax: string;
};

const schools: Collection<School> = db.collection<School>(COLLECTION_NAME);

export type { School };
export { schools };
