import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { Board, BoardTask, STATUS } from './board';

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
    this.boardTasks[STATUS[task.status]].push(task);
    task.position = this.boardTasks[STATUS[task.status]].indexOf(task);
    this.boardService.createTask(task).subscribe({
      next: () => {
        // this.fetchBoard();
      },
    });
  }

  moveTask({ task, index }: { task: BoardTask; index: number }) {
    this.boardTasks[STATUS[task.status]].splice(index, 0, task);
    this.boardTasks[STATUS[task.status]].forEach((el) => {
      el.position = this.boardTasks[STATUS[task.status]].indexOf(el);
      this.boardService.editTask(el).subscribe({
        next: () => {
          // this.fetchBoard();
        },
      });
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
        // this.fetchBoard();
      },
    });
  }

  editTask(task: BoardTask) {
    const oldTaskIndex = this.boardTasks[STATUS[task.status]].findIndex(
      (item) => item.id === task.id
    );
    this.boardTasks[STATUS[task.status]][oldTaskIndex] = task;
    this.boardService.editTask(task).subscribe({
      next: () => {
        // this.fetchBoard();
      },
    });
  }

  private orderByPosition(a: number, b: number) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
}
