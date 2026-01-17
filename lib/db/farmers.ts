import clientPromise from "../mongodb";
import { ObjectId } from "mongodb";

export interface Farmer {
    _id?: ObjectId;
    name: string;
    email: string;
    phone?: string;
    farmName: string;
    location?: { city: string; state: string; country: string };
    createdAt?: Date;
    updatedAt?: Date;
}

const DB_NAME = "farmersDB";
const COLLECTION = "farmers";

export async function createFarmer(farmer: Farmer) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION).insertOne({
        ...farmer,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return result;
}


export async function getFarmers() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection(COLLECTION).find({}).toArray();
}

export async function getFarmerById(id: string) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
}
