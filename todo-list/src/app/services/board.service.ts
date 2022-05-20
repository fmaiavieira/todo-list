import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BoardResponse, BoardTask } from '../board/board';
import * as FAKEDATA from '../board/fake-data.json';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private _board = new BehaviorSubject<BoardResponse>(FAKEDATA);

  constructor() {}

  getBoard(): Observable<BoardResponse> {
    return this._board;
  }

  get board(): BoardResponse {
    return this._board.getValue();
  }

  set board(value: BoardResponse) {
    this._board.next(value);
  }

  addTask(task: BoardTask) {
    this.board.board.todo.items.unshift(task);
  }

  removeTask(id: string) {
    this.board.board.todo.items = this.board.board.todo.items.filter(
      (tasks) => tasks.id !== id
    );
  }
}
