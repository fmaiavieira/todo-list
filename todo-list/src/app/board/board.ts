export interface BoardTask {
  id: string;
  status: string;
  name: string;
  exipire_date: string;
  description: string;
}

export interface Board {
  todo: BoardTask[];
  doing: BoardTask[];
  done: BoardTask[];
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
