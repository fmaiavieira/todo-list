import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { BoardTask } from '../../board';

@Component({
  selector: 'app-task-item-form',
  templateUrl: './task-item-form.component.html',
  styleUrls: ['./task-item-form.component.scss'],
})
export class TaskItemFormComponent {
  @Output() closeForm = new EventEmitter();
  @Output() onAddTask = new EventEmitter<BoardTask>();

  constructor(private fb: FormBuilder) {}

  taskForm = this.fb.group({
    id: [uuid.v4()],
    status: ['todo'],
    name: ['', Validators.required],
    exipire_date: [''],
    description: [''],
  });

  addTask() {
    this.onAddTask.emit(this.taskForm.value);
    this.closeForm.emit();
  }
}
