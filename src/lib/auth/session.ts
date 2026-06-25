import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "dofus-business-session";
const SESSION_DURATION_DAYS = 7;

function hashSessionToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function isSessionExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

export async function createSession(userId: string, request?: Request) {
  const token = generateSessionToken();
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);

  const ipAddress = request?.headers?.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const userAgent = request?.headers?.get("user-agent") || null;

  const session = await prisma.authSession.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
      ipAddress,
      userAgent,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_DAYS * 24 * 60 * 60,
  });

  return session;
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) return null;

  const tokenHash = hashSessionToken(token);

  const session = await prisma.authSession.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!session) return null;
  if (isSessionExpired(session.expiresAt)) {
    await prisma.authSession.delete({ where: { id: session.id } });
    return null;
  }
  if (!session.user.isActive) return null;

  return session.user;
}

export async function deleteCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) return;

  const tokenHash = hashSessionToken(token);

  await prisma.authSession.deleteMany({ where: { tokenHash } });

  cookieStore.delete(SESSION_COOKIE_NAME);
}
