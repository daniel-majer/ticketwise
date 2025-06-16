import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from database",
    status: "DONE" as const,
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from database",
    status: "OPEN" as const,
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from database",
    status: "IN_PROGRESS" as const,
  },
];

const seed = async () => {
  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: tickets,
  });
};

seed();
