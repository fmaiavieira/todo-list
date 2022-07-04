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

  async getById(id: string) {
    return await prisma.boardTask.findUnique({ where: { id } });
  }

  async create(data: BoardTaskCreateData) {
    await prisma.boardTask.create({
      data,
    });
  }

  async update(data: BoardTaskCreateData) {
    await prisma.boardTask.update({
      where: {
        id: data.id,
      },
      data,
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
