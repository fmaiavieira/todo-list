import { Component, Input, OnInit } from '@angular/core';
import { BoardList } from '../board';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() boardList!: BoardList;

  isAddingTask = false;

  constructor() {}

  ngOnInit(): void {}

  addTask() {
    this.isAddingTask = true;
  }
}
