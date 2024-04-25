import express from "express"
import { PrismaClient } from "../src/generated/client"

const app = express()

const prisma = new PrismaClient()

app.get("/increment/:id_counter", async (req, res) => {
  let result

  const counter = await prisma.counter.findUnique({
    where: { id: req.params.id_counter as string },
  })

  if (!counter) {
    result = await prisma.counter.create({
      data: { value: 0, label: "Something" },
    })
  } else {
    result = await prisma.counter.update({
      where: { id: req.params.id_counter as string },
      data: { value: { increment: 1 } },
    })
  }

  return res.json({ result })
})

app.listen(4000, () => console.log("Server running on port 4000."))
