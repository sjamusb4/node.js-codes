import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter, log: ["query"] });

// log: ["query"] will log all the queries made to the database,
// which can be helpful for debugging and understanding how Prisma interacts with your database.
