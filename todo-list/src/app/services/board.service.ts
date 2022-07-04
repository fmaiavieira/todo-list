import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BoardTask } from '../board/board';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private boardUrl = 'http://localhost:3333/';

  constructor(private http: HttpClient) {}

  getBoard(): Observable<BoardTask[]> {
    return this.http.get<BoardTask[]>(this.boardUrl + 'boardtasks').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  createTask(task: BoardTask): Observable<BoardTask> {
    console.log(
      this.http
        .post<BoardTask>(this.boardUrl + 'boardtask/create', task)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error);
            return throwError(error);
          })
        )
        .subscribe({ next: (res) => console.log(res) })
    );

    return this.http
      .post<BoardTask>(this.boardUrl + 'boardtask/create', task)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  removeTask(id: string): Observable<any> {
    return this.http.delete(this.boardUrl + 'boardtask/delete/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  editTask(task: BoardTask): Observable<any> {
    return this.http.put(this.boardUrl + 'boardtask/edit', task).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
