import clientPromise from "../mongodb";
import { ObjectId } from "mongodb";

export interface Offer {
    _id?: ObjectId;
    produceId: ObjectId;
    farmerId: ObjectId;
    offerAmount: number;
    status: "pending_payment" | "paid" | "accepted" | "rejected";
    stripeSessionId?: string;
    customerEmail?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const DB_NAME = "farmersDB";
const COLLECTION = "offers";

export async function createOffer(offer: Offer) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION).insertOne({
        ...offer,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return result;
}

export async function getOffersByFarmer(farmerId: string) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection(COLLECTION).find({ farmerId: new ObjectId(farmerId) }).toArray();
}

export async function updateOfferStatus(offerId: string, status: Offer["status"]) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    return db.collection(COLLECTION).updateOne(
        { _id: new ObjectId(offerId) },
        { $set: { status, updatedAt: new Date() } }
    );
}
