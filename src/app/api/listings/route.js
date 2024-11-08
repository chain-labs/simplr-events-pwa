import { ObjectId } from "mongodb";

import clientPromise from "../../../lib/mongodb";

const dbName = "simplr-events";

export async function POST(request) {
    const client = await clientPromise;
  const db = client.db(dbName);

    const { sellerAddress, ticketId, signature } = await request.json();

  try {
      const user = await db.collection("users").findOne({ address: sellerAddress });
      const existingListing = await db.collection("listings").findOne({ ticketId });
    if (existingListing) {
      await db.collection("listings").deleteMany({ ticketId });
    }
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    console.log({
        userId: user._id,
        ticketId,
        signature,
      })
    const result = await db.collection("listings").insertOne({
      userId: user._id,
      ticketId,
      signature,
    });

    return new Response(JSON.stringify({ listingId: result.insertedId }), { status: 201 });
  } catch (error) {
    console.log({ error: JSON.stringify(error) });
    return new Response(JSON.stringify({ error: "Failed to create listing" }), { status: 500 });
  }
}

export async function GET(request) {
    const client = await clientPromise;
  const db = client.db(dbName);
  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get("ticketId"); // Query parameter to fetch listings for a specific user

  try {
    let listings;
    if (ticketId) {
      listings = await db.collection("listings").findOne({ ticketId: ticketId });
    } else {
      return new Response(JSON.stringify({ error: "Please provide a ticketId to get listings" }), { status: 400 });
    }
    return new Response(JSON.stringify(listings), { status: 200 });
  } catch (error) {
    console.log({ error: JSON.stringify(error) });
    return new Response(JSON.stringify({ error: "Failed to retrieve listings" }), { status: 500 });
  }
}