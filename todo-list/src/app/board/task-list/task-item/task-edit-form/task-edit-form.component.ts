import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BoardTask, TaskFormGroup } from '../../../board';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state(
        'opened',
        style({
          minHeight: '315px',
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
        })
      ),
      transition('opened => closed', [animate('0.1s')]),
      transition('closed => opened', [animate('0.1s')]),
    ]),
  ],
})
export class TaskEditFormComponent implements OnInit {
  @Input() task!: BoardTask;
  @Input() openClose!: Boolean;
  @Output() closeForm = new EventEmitter();
  @Output() onEditTask = new EventEmitter<BoardTask>();

  constructor(private fb: FormBuilder) {}

  taskForm = this.fb.group({
    id: [''],
    position: [0],
    status: ['todo'],
    name: [''],
    expire_date: [new Date()],
    description: [''],
  }) as TaskFormGroup;

  ngOnInit() {
    this.taskForm.patchValue(this.task);
    console.log(this.taskForm.value);
  }

  saveTask() {
    this.onEditTask.emit(this.taskForm.value);
    this.closeForm.emit();
  }
}
