import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getRequestBodyGracefully, sendNextError } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  listingId: z.coerce.number().int().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await getRequestBodyGracefully(request);
    const parsedBody = bodySchema.parse(body);

    try {
      await db.savedListings.create({
        data: {
          listingId: parsedBody.listingId,
          userId: session?.user?.id,
        },
      });
    } catch (err: any) {
      if (err.code === "P2002") {
        // This code fires when "Unique constraint fails"
        // If we get this error code, it means that the listing is already saved.
        // so in that case, we delete it instead.
        await db.savedListings.delete({
          where: {
            userId_listingId: {
              userId: session?.user?.id,
              listingId: parsedBody.listingId,
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
