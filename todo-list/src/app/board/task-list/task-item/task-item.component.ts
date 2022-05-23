import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BoardTask } from '../../board';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: BoardTask;
  @Output() remove = new EventEmitter<string>();
}
