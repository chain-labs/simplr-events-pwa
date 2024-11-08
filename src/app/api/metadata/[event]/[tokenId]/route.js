import clientPromise from "../../../../../lib/mongodb";

const dbName = "simplr-events";

  
export async function GET(req, { params }) {
  const { event, tokenId } = params;

  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("nftMetadata");

    const response = await collection.findOne({ tokenId, event });

    if (!metadata) {
      return new Response("Metadata not found", { status: 404 });
    }

    return new Response(JSON.stringify(response.metadata), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}