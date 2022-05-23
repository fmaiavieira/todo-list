import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoardTask } from '../board';
import { STATUS } from '../board';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() boardTasks!: BoardTask[];
  @Input() title!: string;

  @Output() onRemoveTask = new EventEmitter<string>();
  @Output() onAddTask = new EventEmitter<BoardTask>();
  @Output() onMoveTask = new EventEmitter<BoardTask>();

  boardList: BoardTask[] = [];
  isAddingTask = false;
  STATUS = STATUS;

  drop(event: CdkDragDrop<BoardTask[]>) {
    const task = event.item.data;
    task.status = STATUS[event.container.id];
    this.onMoveTask.emit(task);
  }
}