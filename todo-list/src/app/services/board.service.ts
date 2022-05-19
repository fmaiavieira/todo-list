import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BoardResponse, BoardTask } from '../board/board';
import * as FAKEDATA from '../board/fake-data.json';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private boardUrl = 'api/board';
  constructor(private http: HttpClient) {}

  getBoard(): Observable<BoardResponse> {
    const board = of(FAKEDATA);
    return board;
  }

  addTask(task: BoardTask) {
    console.log(task);
  }
}
