import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seed...");

  // Nettoyer les données existantes
  await prisma.authSession.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.team.deleteMany();
  await prisma.character.deleteMany();
  await prisma.gameAccount.deleteMany();
  await prisma.user.deleteMany();

  // ===========================================
  // USERS (avec mots de passe hashés)
  // ===========================================
  const adminPasswordHash = await bcrypt.hash("Admin123!", 12);
  const memberPasswordHash = await bcrypt.hash("Ami123!", 12);

  const admin = await prisma.user.create({
    data: {
      name: "Abdessamad",
      email: "admin@example.local",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      isActive: true,
    },
  });

  const member = await prisma.user.create({
    data: {
      name: "Ami Test",
      email: "ami@example.local",
      passwordHash: memberPasswordHash,
      role: "MEMBER",
      isActive: true,
    },
  });

  console.log("  ✓ 2 users créés (admin@example.local / Admin123!)");
  console.log("  ✓ 2 users créés (ami@example.local / Ami123!)");

  // ===========================================
  // GAME ACCOUNTS
  // ===========================================
  const account1 = await prisma.gameAccount.create({
    data: {
      ownerId: admin.id,
      label: "Compte Principal Abdessamad",
      gameType: "DOFUS_3",
      server: "Meriana",
      email: "admin@example.local",
      status: "ACTIVE",
      subscriptionStatus: "ACTIVE",
      subscriptionExpiresAt: new Date("2026-12-31"),
      hasTwoFactor: true,
      notes: "Compte principal — tous les personnages principaux",
    },
  });

  const account2 = await prisma.gameAccount.create({
    data: {
      ownerId: member.id,
      label: "Compte Test Ami",
      gameType: "DOFUS_3",
      server: "Eliatrope",
      status: "ACTIVE",
      subscriptionStatus: "EXPIRED",
      subscriptionExpiresAt: new Date("2026-01-15"),
      hasTwoFactor: false,
      notes: "Compte de test pour les démonstrations",
    },
  });

  console.log("  ✓ 2 comptes Dofus créés");

  // ===========================================
  // CHARACTERS
  // ===========================================
  const iop = await prisma.character.create({
    data: {
      gameAccountId: account1.id,
      name: "StormBlade",
      className: "Iop",
      level: 200,
      server: "Meriana",
      buildElement: "FEU",
      role: "ROX",
      profession1: "Forgeron d'armes",
      profession2: null,
      status: "ACTIVE",
      notes: "Iop feu principal, stuff complet",
    },
  });

  const eni = await prisma.character.create({
    data: {
      gameAccountId: account1.id,
      name: "HealQueen",
      className: "Eniripsa",
      level: 195,
      server: "Meriana",
      buildElement: "EAU",
      role: "HEAL",
      profession1: "Alchimiste",
      profession2: "Paysan",
      status: "ACTIVE",
    },
  });

  await prisma.character.create({
    data: {
      gameAccountId: account2.id,
      name: "ArrowStrike",
      className: "Cra",
      level: 180,
      server: "Eliatrope",
      buildElement: "AIR",
      role: "PVM",
      profession1: "Bucheron",
      status: "ACTIVE",
    },
  });

  console.log("  ✓ 3 personnages créés");

  // ===========================================
  // TEAMS
  // ===========================================
  const team1 = await prisma.team.create({
    data: {
      name: "Team PvM Meriana",
      leaderCharacterId: iop.id,
      objective: "Farm DON et succès",
      status: "ACTIVE",
      notes: "Équipe principale pour le contenu PvM",
    },
  });

  await prisma.teamMember.createMany({
    data: [
      { teamId: team1.id, characterId: iop.id, position: 1, roleInTeam: "DPS" },
      { teamId: team1.id, characterId: eni.id, position: 2, roleInTeam: "Healer" },
    ],
  });

  console.log("  ✓ 1 team créée avec 2 membres");

  // ===========================================
  // SUBSCRIPTIONS
  // ===========================================
  await prisma.subscription.create({
    data: {
      gameAccountId: account1.id,
      startsAt: new Date("2026-01-01"),
      endsAt: new Date("2026-12-31"),
      amount: 59.88,
      currency: "MAD",
      paymentMethod: "Carte bancaire",
      status: "ACTIVE",
      notes: "Abonnement annuel",
    },
  });

  console.log("  ✓ 1 abonnement créé");

  // ===========================================
  // GOALS
  // ===========================================
  await prisma.goal.create({
    data: {
      title: "Atteindre niveau 200 sur tous les persos",
      type: "LEVELING",
      priority: "HIGH",
      status: "IN_PROGRESS",
      deadline: new Date("2026-06-30"),
      relatedAccountId: account1.id,
      relatedCharacterId: iop.id,
      notes: "Iop déjà 200, Eniripsa en cours",
    },
  });

  await prisma.goal.create({
    data: {
      title: "Farm 10M Kamas",
      type: "KAMAS",
      priority: "MEDIUM",
      status: "TODO",
      relatedAccountId: account1.id,
      relatedTeamId: team1.id,
    },
  });

  console.log("  ✓ 2 objectifs créés");

  // ===========================================
  // AUDIT LOGS
  // ===========================================
  await prisma.auditLog.createMany({
    data: [
      {
        userId: admin.id,
        action: "SEED_INIT",
        entityType: "system",
        metadata: JSON.stringify({ message: "Seed initial exécuté" }),
      },
      {
        userId: admin.id,
        action: "CREATE",
        entityType: "GameAccount",
        entityId: account1.id,
        metadata: JSON.stringify({ label: account1.label }),
      },
    ],
  });

  console.log("  ✓ 2 audit logs créés");

  console.log("\n✅ Seed terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
