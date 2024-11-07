import { ObjectId } from "mongodb";

import clientPromise from "../../../lib/mongodb";

const client = await clientPromise;
const db = client.db("simplr-events");

export async function POST(request) {

  const { email, address } = await request.json();

  try {
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 409,
      });
    }
    const result = await db.collection("users").insertOne({ email, address });
    return new Response(JSON.stringify({ userId: result.insertedId }), {
      status: 201,
    });
  } catch (error) {
    console.log({ error: JSON.stringify(error) });
    return new Response(JSON.stringify({ error: "Failed to create user" }), {
      status: 500,
    });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");  // Query parameter for fetching a specific user

  try {
    let user;
    if (userId) {
      user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
      if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
      }
    } else {
      user = await db.collection("users").find({}).toArray(); // Fetch all users if no userId specified
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log({ error: JSON.stringify(error) });
    return new Response(JSON.stringify({ error: "Failed to retrieve user(s)" }), { status: 500 });
  }
}
