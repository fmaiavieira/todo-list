import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
import { BoardList, BoardTask } from '../board';
import { STATUS } from '../board';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() boardList!: BoardList;

  isAddingTask = false;

  STATUS = STATUS;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {}

  onAddTask() {
    this.isAddingTask = true;
  }

  onRemoveTask(id: string) {
    this.boardService.removeTask(id, STATUS[this.boardList.title]);
  }

  drop(event: CdkDragDrop<BoardTask[]>) {
    console.log(event);
    this.boardService.addTask(event.item.data, STATUS[event.container.id]);
    this.boardService.removeTask(
      event.item.data.id,
      STATUS[event.previousContainer.id]
    );
  }
}
