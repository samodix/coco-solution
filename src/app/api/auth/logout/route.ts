import { NextResponse } from "next/server";
import { deleteCurrentSession, getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const user = await getCurrentUser();

    await deleteCurrentSession();

    if (user) {
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: "LOGOUT",
          entityType: "User",
          entityId: user.id,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
