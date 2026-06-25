-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'MEMBER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "GameAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ownerId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "gameType" TEXT NOT NULL DEFAULT 'DOFUS_3',
    "server" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "subscriptionStatus" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "subscriptionExpiresAt" DATETIME,
    "hasTwoFactor" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "GameAccount_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameAccountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "server" TEXT,
    "buildElement" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "role" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "profession1" TEXT,
    "profession2" TEXT,
    "profession3" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Character_gameAccountId_fkey" FOREIGN KEY ("gameAccountId") REFERENCES "GameAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "leaderCharacterId" TEXT,
    "objective" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Team_leaderCharacterId_fkey" FOREIGN KEY ("leaderCharacterId") REFERENCES "Character" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamId" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "roleInTeam" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeamMember_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameAccountId" TEXT NOT NULL,
    "startsAt" DATETIME,
    "endsAt" DATETIME NOT NULL,
    "amount" REAL,
    "currency" TEXT NOT NULL DEFAULT 'MAD',
    "paymentMethod" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Subscription_gameAccountId_fkey" FOREIGN KEY ("gameAccountId") REFERENCES "GameAccount" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'OTHER',
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "status" TEXT NOT NULL DEFAULT 'TODO',
    "deadline" DATETIME,
    "relatedAccountId" TEXT,
    "relatedCharacterId" TEXT,
    "relatedTeamId" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Goal_relatedAccountId_fkey" FOREIGN KEY ("relatedAccountId") REFERENCES "GameAccount" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Goal_relatedCharacterId_fkey" FOREIGN KEY ("relatedCharacterId") REFERENCES "Character" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Goal_relatedTeamId_fkey" FOREIGN KEY ("relatedTeamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "GameAccount_ownerId_idx" ON "GameAccount"("ownerId");

-- CreateIndex
CREATE INDEX "GameAccount_status_idx" ON "GameAccount"("status");

-- CreateIndex
CREATE INDEX "GameAccount_server_idx" ON "GameAccount"("server");

-- CreateIndex
CREATE INDEX "Character_gameAccountId_idx" ON "Character"("gameAccountId");

-- CreateIndex
CREATE INDEX "Character_className_idx" ON "Character"("className");

-- CreateIndex
CREATE INDEX "Character_level_idx" ON "Character"("level");

-- CreateIndex
CREATE INDEX "Team_status_idx" ON "Team"("status");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_teamId_characterId_key" ON "TeamMember"("teamId", "characterId");

-- CreateIndex
CREATE INDEX "Subscription_gameAccountId_idx" ON "Subscription"("gameAccountId");

-- CreateIndex
CREATE INDEX "Subscription_endsAt_idx" ON "Subscription"("endsAt");

-- CreateIndex
CREATE INDEX "Goal_status_idx" ON "Goal"("status");

-- CreateIndex
CREATE INDEX "Goal_priority_idx" ON "Goal"("priority");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_idx" ON "AuditLog"("entityType");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");
