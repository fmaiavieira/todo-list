import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { BoardService } from '../services/board.service';
import { Board } from './board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  board!: Board;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.boardService
      .getBoard()
      .pipe(pluck('board'))
      .subscribe({
        next: (response: Board) => {
          this.board = response;
        },
        error: () => {
          new Error('Não foi possivel buscar os dados do quadro');
        },
      });
  }
}
