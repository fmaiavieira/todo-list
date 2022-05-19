import { Component, Input, OnInit } from '@angular/core';
import { BoardTask } from '../../board';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: BoardTask;

  constructor() {}

  ngOnInit(): void {}
}
