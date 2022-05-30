import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BoardTask, TaskFormGroup } from '../../../board';

@Component({
  selector: 'app-task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.scss'],
})
export class TaskEditFormComponent implements OnInit {
  @Input() task!: BoardTask;
  @Output() closeForm = new EventEmitter();
  @Output() onEditTask = new EventEmitter<BoardTask>();

  constructor(private fb: FormBuilder) {}

  taskForm = this.fb.group({
    id: [''],
    position: [0],
    status: ['todo'],
    name: [''],
    expire_date: [''],
    description: [''],
  }) as TaskFormGroup;

  ngOnInit() {
    this.taskForm.patchValue(this.task);
  }

  saveTask() {
    this.onEditTask.emit(this.taskForm.value);
    this.closeForm.emit();
  }
}
