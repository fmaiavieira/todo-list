import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BoardService } from 'src/app/services/board.service';
import * as uuid from 'uuid';
import { Status } from '../../board';

@Component({
  selector: 'app-task-item-form',
  templateUrl: './task-item-form.component.html',
  styleUrls: ['./task-item-form.component.scss'],
})
export class TaskItemFormComponent implements OnInit {
  @Input() boardStatus!: Status;
  @Output() closeForm = new EventEmitter();
  constructor(private boardService: BoardService, private fb: FormBuilder) {}

  taskForm = this.fb.group({
    id: [uuid.v4()],
    name: ['', Validators.required],
    exipire_date: [''],
    description: [''],
  });

  ngOnInit(): void {}

  createTask() {
    this.boardService.addTask(this.taskForm.value, this.boardStatus);
    this.closeForm.emit();
  }
}
