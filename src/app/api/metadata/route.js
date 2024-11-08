import clientPromise from "../../../lib/mongodb";

const dbName = "simplr-events";

export async function POST(req) {
    try {
        // Parse the incoming JSON body
        const body = await req.json();

        // Validate required fields
        const { tokenId,eventContract, name, description, image, attributes } = body;
        if (!tokenId || !name || !description || !image || !attributes) {
            return new Response(
                JSON.stringify({ error: "Missing required fields." }),
                { status: 400 }
            );
        }

        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db(dbName);
        const collection = db.collection("nftMetadata");

        // Check if metadata with the same tokenId already exists
        const existing = await collection.findOne({ tokenId, eventContract });
        if (existing) {
            return new Response(
                JSON.stringify({ error: "Metadata with this tokenId already exists." }),
                { status: 400 }
            );
        }

        // Insert the new metadata
        await collection.insertOne({
            tokenId,
            event: eventContract,
            metadata: {
                tokenId,
                name,
                description,
                image,
                attributes,
            }
        });
  
      return new Response(
        JSON.stringify({ message: "Metadata uploaded successfully." }),
        { status: 201 }
      );
    } catch (error) {
      console.error("Error uploading metadata:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    }
  }