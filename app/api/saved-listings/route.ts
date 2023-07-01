import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getRequestBodyGracefully, sendNextError } from "@/lib/utils";

const bodySchema = z.object({
  listingId: z.coerce.number().int().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await getRequestBodyGracefully(request);
    const parsedBody = bodySchema.parse(body);

    try {
      await db.savedListings.create({
        data: {
          listing_id: parsedBody.listingId,
          user_id: session?.user?.id,
        },
      });
    } catch (err: any) {
      if (err.code === "P2002") {
        // This code fires when "Unique constraint fails"
        // If we get this error code, it means that the listing is already saved.
        // so in that case, we delete it instead.
        await db.savedListings.delete({
          where: {
            user_id_listing_id: {
              user_id: session?.user?.id,
              listing_id: parsedBody.listingId,
            },
          },
        });
      }
    }

    return NextResponse.json({});
  } catch (err) {
    return sendNextError(err);
  }
}
