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
    await this.prismaBoardTaskRepository.create(request);
  }

  async update(request: BoardTaskCreateData) {
    await this.prismaBoardTaskRepository.update(request);
  }

  async delete(request: BoardTaskDeleteData) {
    const { id } = request;
    await this.prismaBoardTaskRepository.delete({
      id,
    });
  }
}
