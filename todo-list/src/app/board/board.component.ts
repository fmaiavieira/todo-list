import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';
import { Board, BoardTask } from './board';

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

        this.boardTasks = { todo, doing, done };
        this.isFetching = false;

        console.log(this.boardTasks);
      },
      error: () => {
        new Error('Não foi possivel buscar os dados do quadro');
      },
    });
  }

  addTask(task: BoardTask) {
    this.boardService.createTask(task).subscribe({
      next: () => {
        this.fetchBoard();
      },
    });
  }

  moveTask(task: BoardTask) {
    this.boardService.editTask(task).subscribe({
      next: () => {
        this.fetchBoard();
      },
    });
  }

  removeTask(id: string) {
    this.boardService.removeTask(id).subscribe({
      next: () => {
        this.fetchBoard();
      },
    });
  }
}
