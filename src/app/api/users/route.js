import clientPromise from "../../../lib/mongodb";

const dbName = "simplr-events";

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db(dbName);
  
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
  const client = await clientPromise;
  const db = client.db(dbName);

  const searchParams = request.nextUrl.searchParams;
  const userAddress = searchParams.get("address");

  try {
    let user;
    if (userAddress) {
      user = await db.collection("users").findOne({ address: userAddress });
      if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
      }
    } else {
      return new Response(JSON.stringify({ error: "Please provide an address" }), { status: 400 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log({ error: JSON.stringify(error) });
    return new Response(JSON.stringify({ error: "Failed to retrieve user(s)" }), { status: 500 });
  }
}
