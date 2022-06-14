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

routes.post("boardtask/create", async (req, res) => {
  const { id, position, status, name, expire_date, description } = req.body;

  await boardTaskUseCase.create({
    id,
    position,
    status,
    name,
    expire_date,
    description,
  });

  return res.status(201).send();
});

routes.post("boardtask/edit", async (req, res) => {
  const { id, position, status, name, expire_date, description } = req.body;

  await boardTaskUseCase.update({
    id,
    position,
    status,
    name,
    expire_date,
    description,
  });

  return res.status(201).send();
});

routes.post("boardtask/delete", async (req, res) => {
  const { id } = req.body;

  await boardTaskUseCase.delete({
    id,
  });

  return res.status(201).send();
});
