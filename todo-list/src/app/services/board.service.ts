import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BoardTask } from '../board/board';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private boardUrl = 'api/board/';

  constructor(private http: HttpClient) {}

  getBoard(): Observable<BoardTask[]> {
    return this.http.get<BoardTask[]>(this.boardUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  createTask(task: BoardTask): Observable<BoardTask> {
    return this.http.post<BoardTask>(this.boardUrl, task).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  removeTask(id: string): Observable<any> {
    return this.http.delete(this.boardUrl + id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  editTask(task: BoardTask): Observable<any> {
    return this.http.put(this.boardUrl + task.id, task).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
