import { NextResponse } from "next/server";

import { EmailService } from "@/lib/email-service";
import { getSellerEmailTemplate } from "@/lib/email-templates";

import clientPromise from "../../../lib/mongodb";

const dbName = process.env.MONGODB_DB_NAME;

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const body = (await request.json());

    // Validate required fields
    const requiredFields = ["tokenId", "buyer", "seller"];
    const missingFields = requiredFields.filter(
      field => !body[field]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const sellerUser = await db
      .collection("users")
      .findOne({ address: body.seller });

    const buyerUser = await db
      .collection("users")
      .findOne({ address: body.buyer });

    const emailService = new EmailService();
    const template = getSellerEmailTemplate({
      sellerName: sellerUser.name,
      tokenId: body.tokenId,
      buyerEmailId: buyerUser.email,
      sellerEmailId: sellerUser.email,
      devconEmail: "support@devcon.org",
      expiryHours: 24,
    });

    const result = await emailService.sendEmail(
      sellerUser.email,
      template.subject,
      template.html,
      template.text
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing email request:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
