import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { Board, BoardTask, Status, STATUS } from './board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  boardTasks: Board = { todo: [], doing: [], done: [] };

  isFetching = false;
  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.fetchBoard();
  }

  fetchBoard() {
    this.boardService.getBoard().subscribe({
      next: (response: BoardTask[]) => {
        const todo = response.filter((item) => item.status === 'todo');
        const doing = response.filter((item) => item.status === 'doing');
        const done = response.filter((item) => item.status === 'done');

        const boardTasks = { todo, doing, done };

        if (JSON.stringify(this.boardTasks) !== JSON.stringify(boardTasks)) {
          this.boardTasks = boardTasks;
        }
        this.isFetching = false;
      },
      error: () => {
        new Error('Não foi possivel buscar os dados do quadro');
      },
    });
  }

  addTask(task: BoardTask) {
    this.boardTasks[STATUS[task.status]].push(task),
      this.boardService.createTask(task).subscribe({
        next: () => {
          this.fetchBoard();
        },
      });
  }

  moveTask(task: BoardTask) {
    this.boardTasks[STATUS[task.status]].push(task);
    this.boardService.editTask(task).subscribe({
      next: () => {
        this.fetchBoard();
      },
    });
  }

  removeTask(task: BoardTask) {
    this.boardTasks[STATUS[task.status]] = this.boardTasks[
      STATUS[task.status]
    ].filter((value) => {
      return value !== task;
    });

    this.boardService.removeTask(task.id).subscribe({
      next: () => {
        this.fetchBoard();
      },
    });
  }
}
