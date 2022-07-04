import express from "express";
import { PrismaBoardTaskRepository } from "./repositories/prisma/prisma-board-task.repository";
import { BoardTaskUseCase } from "./use-cases/board-task.use-case";

export const routes = express.Router();

const prismaBoardTaskRepository = new PrismaBoardTaskRepository();
const boardTaskUseCase = new BoardTaskUseCase(prismaBoardTaskRepository);

routes.get("/boardtasks", async (req, res) => {
  const boardtasks = await boardTaskUseCase.get();
  console.log(boardtasks);
  return res.status(201).send(boardtasks);
});

routes.post("/boardtask/create", async (req, res) => {
  await boardTaskUseCase.create(req.body);

  return res.status(201).send();
});

routes.put("/boardtask/edit", async (req, res) => {
  await boardTaskUseCase.update(req.body);

  return res.status(201).send();
});

routes.delete("/boardtask/delete/:id", async (req, res) => {
  const id = req.params.id;

  await boardTaskUseCase.delete({
    id,
  });

  return res.status(201).send();
});
