import { prisma } from "../../prisma";
import {
  BoardTaskCreateData,
  BoardTaskDeleteData,
  BoardTaskRepository,
} from "../types/board-task-repository";

export class PrismaBoardTaskRepository implements BoardTaskRepository {
  async get() {
    return await prisma.boardTask.findMany();
  }

  async create({
    id,
    position,
    status,
    name,
    expire_date,
    description,
  }: BoardTaskCreateData) {
    await prisma.boardTask.create({
      data: {
        id,
        position,
        status,
        name,
        expire_date,
        description,
      },
    });
  }

  async update({
    id,
    position,
    status,
    name,
    expire_date,
    description,
  }: BoardTaskCreateData) {
    await prisma.boardTask.update({
      where: {
        id,
      },
      data: {
        id,
        position,
        status,
        name,
        expire_date,
        description,
      },
    });
  }

  async delete({ id }: BoardTaskDeleteData) {
    await prisma.boardTask.delete({
      where: {
        id,
      },
    });
  }
}
