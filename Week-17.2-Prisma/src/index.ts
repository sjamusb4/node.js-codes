// import { prisma } from "./lib/prisma";

// async function createUser(username: string, password: string) {
//   try {
//     const user = await prisma.user.create({
//       data: { username, password },
//     });

//     console.log("Created user:", user);
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function getAllUser() {
//   try {
//     const allUsers = await prisma.user.findMany({});
//     console.log("All users:", allUsers);
//   } catch (error) {
//     console.error(error);
//   }
// }
// async function main() {
//   //await createUser("ABC", "ASDF");
//   await getAllUser();
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

import "dotenv/config";
import express from "express";
import { prisma } from "./lib/prisma";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON
app.use(express.json());

app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.create({ data: { username, password } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// run scripts
// tsx src/index.ts
// npx tsx watch src/index.ts
// npx nodemon --exec tsx src/index.ts
