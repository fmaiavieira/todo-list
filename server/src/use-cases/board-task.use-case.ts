import { PrismaBoardTaskRepository } from "../repositories/prisma/prisma-board-task.repository";
import {
  BoardTaskCreateData,
  BoardTaskDeleteData,
} from "../repositories/types/board-task-repository";

export class BoardTaskUseCase {
  constructor(private prismaBoardTaskRepository: PrismaBoardTaskRepository) {}

  async get() {
    return await this.prismaBoardTaskRepository.get();
  }

  async create(request: BoardTaskCreateData) {
    const { id, position, status, name, expire_date, description } = request;
    console.log(id, position, status, name, expire_date, description);
    await this.prismaBoardTaskRepository.create({
      id,
      position,
      status,
      name,
      expire_date,
      description,
    });
  }

  async update(request: BoardTaskCreateData) {
    const { id, position, status, name, expire_date, description } = request;
    console.log(id, position, status, name, expire_date, description);
    await this.prismaBoardTaskRepository.update({
      id,
      position,
      status,
      name,
      expire_date,
      description,
    });
  }

  async delete(request: BoardTaskDeleteData) {
    const { id } = request;
    console.log(id);
    await this.prismaBoardTaskRepository.delete({
      id,
    });
  }
}
