export interface BoardTaskCreateData {
  id: string;
  position: number;
  status: string;
  name: string;
  expire_date: string;
  description: string;
}
export interface BoardTaskDeleteData {
  id: string;
}

export interface BoardTaskRepository {
  create: (data: BoardTaskCreateData) => Promise<void>;
  update: (data: BoardTaskCreateData) => Promise<void>;
  delete: (data: BoardTaskDeleteData) => Promise<void>;
}
