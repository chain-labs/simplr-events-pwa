import { MongoClient, ServerApiVersion } from "mongodb";

// import { envVars } from "./envVars";
const username = encodeURIComponent(process.env.MONGODB_USER);
const password = encodeURIComponent(process.env.MONGODB_PWD);
const cluster = process.env.MONGODB_CLUSTER;
let uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority&appName=simplr-events`;

console.log({ uri });
const options = { useNewUrlParser: true, useUnifiedTopology: true, serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
}};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;