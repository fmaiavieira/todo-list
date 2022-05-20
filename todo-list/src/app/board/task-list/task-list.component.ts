import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { BoardList } from '../board';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() boardList!: BoardList;

  isAddingTask = false;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {}

  onAddTask() {
    this.isAddingTask = true;
  }

  onRemoveTask(id: string) {
    this.boardService.removeTask(id);
  }
}
