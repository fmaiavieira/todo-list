import { Component, OnInit } from '@angular/core';
import { Board, BoardTask } from './board';
import { BoardModel } from './board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  boardTasks!: Board;

  isFetching = false;
  constructor(private boardModel: BoardModel) {}

  ngOnInit(): void {
    this.boardModel.fetchBoard();
    this.boardModel.isFetching$.subscribe({
      next: (isFetching) => (this.isFetching = isFetching),
    });
    this.boardModel.boardTasks$.subscribe({
      next: (boardTasks) => (this.boardTasks = boardTasks),
    });
  }

  addTask(task: BoardTask) {
    this.boardModel.addTask(task);
  }

  moveTask(data: { task: BoardTask; index: number; previousStatus: string }) {
    this.boardModel.moveTask(data);
  }

  removeTask(task: BoardTask) {
    this.boardModel.removeTask(task);
  }

  editTask(task: BoardTask) {
    this.boardModel.editTask(task);
  }
}
