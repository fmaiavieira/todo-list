export interface BoardTask {
  id: string;
  name: string;
  exipire_date: string;
  description: string;
}
export interface BoardList {
  title: string;
  items: BoardTask[];
}

export interface Board {
  todo: BoardList;
  doing: BoardList;
  done: BoardList;
}

export interface BoardResponse {
  board: Board;
}

export enum Status {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
}

export const STATUS: {
  [key: string]: Status;
} = {
  'TO DO': Status.TODO,
  DOING: Status.DOING,
  DONE: Status.DONE,
};
