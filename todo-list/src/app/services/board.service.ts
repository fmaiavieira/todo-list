import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BoardResponse, BoardTask, Status } from '../board/board';
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

  addTask(task: BoardTask, status: Status) {
    this.board.board[status].items.unshift(task);
  }

  removeTask(id: string, status: Status) {
    console.log(id, status);
    this.board.board[status].items = this.board.board.todo.items.filter(
      (tasks) => tasks.id !== id
    );
  }
}
