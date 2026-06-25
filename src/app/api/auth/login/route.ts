import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Identifiants invalides." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user || !user.passwordHash) {
      await prisma.auditLog.create({
        data: {
          action: "LOGIN_FAILED",
          entityType: "User",
          metadata: JSON.stringify({ email: email, reason: "user_not_found" }),
        },
      });
      return NextResponse.json(
        { error: "Identifiants invalides." },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: "Identifiants invalides." },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: "LOGIN_FAILED",
          entityType: "User",
          entityId: user.id,
          metadata: JSON.stringify({ reason: "wrong_password" }),
        },
      });
      return NextResponse.json(
        { error: "Identifiants invalides." },
        { status: 401 }
      );
    }

    await createSession(user.id, request);

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "LOGIN_SUCCESS",
        entityType: "User",
        entityId: user.id,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    console.error("Login error:", e);
    return NextResponse.json(
      { error: "Erreur interne." },
      { status: 500 }
    );
  }
}
