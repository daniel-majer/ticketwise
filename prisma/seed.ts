import { hash } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  { email: "admin@admin.com", username: "admin", emailVerified: true },
  { email: "example@example.com", username: "example", emailVerified: true },
];

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from database",
    status: "DONE" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 1000, // in cents
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from database",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 1000, // in cents
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from database",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 1000, // in cents
  },
];

const comments = [
  { content: "First comment from DB" },
  { content: "Second comment from DB" },
  { content: "Third comment from DB" },
];

const seed = async () => {
  await prisma.comment.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.user.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.organization.deleteMany();

  const dbOrganizations = await prisma.organization.create({
    data: { name: "Organization 1" },
  });

  const passwordHash = await hash("password");

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({ ...user, passwordHash })),
  });

  await prisma.membership.createMany({
    data: [
      {
        //for debugging purposes
        //only one user is added to the organization
        organizationId: dbOrganizations.id,
        userId: dbUsers[0].id,
        isActive: true,
        membershipRole: "MEMBER",
      },
      {
        organizationId: dbOrganizations.id,
        userId: dbUsers[1].id,
        isActive: false,
        membershipRole: "ADMIN",
      },
    ],
  });

  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[0].id,
    })),
  });

  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      ...comment,
      userId: dbUsers[1].id,
      ticketId: dbTickets[0].id,
    })),
  });
};

seed();
