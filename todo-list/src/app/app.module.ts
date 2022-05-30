import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { MaterialModule } from './material/material.module';
import { TaskItemComponent } from './board/task-list/task-item/task-item.component';
import { TaskListComponent } from './board/task-list/task-list.component';
import { TaskEditFormComponent } from './board/task-list/task-item/task-edit-form/task-edit-form.component';
import { DatabaseService } from './database/database.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TaskItemComponent,
    TaskListComponent,
    TaskEditFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(DatabaseService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
