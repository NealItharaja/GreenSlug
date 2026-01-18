import clientPromise from "../mongodb";
import { ObjectId } from "mongodb";

export interface Produce {
    _id?: ObjectId;
    farmerId: ObjectId;
    name: string;
    category?: string;
    pricePerUnit: number;
    unit: string;
    quantityAvailable: number;
    harvestDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

const DB_NAME = "farmersDB";
const COLLECTION = "produce";

export async function createProduce(produce: Produce) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION).insertOne({
        ...produce,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return result;
}

export async function getProduce() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection(COLLECTION).find({}).toArray();
}

export async function getProduceByFarmer(farmerId: string) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection(COLLECTION).find({ farmerId: new ObjectId(farmerId) }).toArray();
}