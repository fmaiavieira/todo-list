import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardService } from '../services/board.service';
import { Board, BoardTask, STATUS } from './board';

@Injectable({ providedIn: 'root' })
export class BoardModel {
  private _boardTasks$ = new BehaviorSubject<Board>({
    todo: [],
    doing: [],
    done: [],
  });
  private _isFetching$ = new BehaviorSubject<boolean>(false);

  get boardTasks() {
    return this._boardTasks$.getValue();
  }

  get boardTasks$() {
    return this._boardTasks$;
  }

  get isFetching$() {
    return this._isFetching$;
  }

  constructor(public boardService: BoardService) {}

  fetchBoard() {
    this._isFetching$.next(true);
    this.boardService.getBoard().subscribe({
      next: (response: BoardTask[]) => {
        const todo = response
          .filter((item) => item.status === 'todo')
          .sort((a, b) => this.orderByPosition(a.position, b.position));
        const doing = response
          .filter((item) => item.status === 'doing')
          .sort((a, b) => this.orderByPosition(a.position, b.position));
        const done = response
          .filter((item) => item.status === 'done')
          .sort((a, b) => this.orderByPosition(a.position, b.position));

        const boardTasks = { todo, doing, done };

        if (JSON.stringify(this.boardTasks) !== JSON.stringify(boardTasks)) {
          this._boardTasks$.next(boardTasks);
        }
        this._isFetching$.next(false);
      },
      error: () => {
        new Error('Não foi possivel buscar os dados do quadro');
        this._isFetching$.next(false);
      },
    });
  }

  addTask(task: BoardTask) {
    this.boardTasks[STATUS[task.status]].push(task);
    task.position = this.boardTasks[STATUS[task.status]].indexOf(task);
    this.boardService.createTask(task).subscribe();
  }

  moveTask({
    task,
    index,
    previousStatus,
  }: {
    task: BoardTask;
    index: number;
    previousStatus: string;
  }) {
    this.boardTasks[STATUS[previousStatus]] = this.boardTasks[
      STATUS[previousStatus]
    ].filter((value) => {
      return value.id !== task.id;
    });

    this.boardTasks[STATUS[task.status]].splice(index, 0, task);
    this.boardTasks[STATUS[task.status]].forEach((el) => {
      el.position = this.boardTasks[STATUS[task.status]].indexOf(el);
      console.log(el);
      this.boardService.editTask(el).subscribe();
    });
  }

  removeTask(task: BoardTask) {
    this.boardTasks[STATUS[task.status]] = this.boardTasks[
      STATUS[task.status]
    ].filter((value) => {
      return value !== task;
    });

    this.boardService.removeTask(task.id).subscribe();
  }

  editTask(task: BoardTask) {
    const oldTaskIndex = this.boardTasks[STATUS[task.status]].findIndex(
      (item) => item.id === task.id
    );
    this.boardTasks[STATUS[task.status]][oldTaskIndex] = task;
    this.boardService.editTask(task).subscribe();
  }

  private orderByPosition(a: number, b: number) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
}
