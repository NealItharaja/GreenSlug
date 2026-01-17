import clientPromise from "../mongodb";
import { ObjectId } from "mongodb";

export interface Customer {
    _id?: ObjectId;
    name: string;
    email: string;
    phone?: string;
    address?: { street: string; city: string; state: string; country: string };
    createdAt?: Date;
    updatedAt?: Date;
}

const DB_NAME = "farmersDB";
const COLLECTION = "customers";


export async function createCustomer(customer: Customer) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION).insertOne({
        ...customer,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return result;
}


export async function getCustomers() {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection(COLLECTION).find({}).toArray();
}

export async function getCustomerById(id: string) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
}
