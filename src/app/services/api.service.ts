import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UtilsService } from './utils.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../interfaces/registerUser';
import { LoginUser } from '../interfaces/loginUser';
import { DownloadImage } from '../interfaces/downloadImage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
    private utilsService: UtilsService,
    private localStorageService: LocalstorageService   
  ) { }

  registerUser(user: any): Observable<RegisterUser> {
    const formData = new FormData();

    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('age', user.age)
    formData.append('image', user.image)
    formData.append('password', user.password)
    formData.append('confirmPassword', user.confirmPassword)

   
    return this.httpClient.post<RegisterUser>(`${environment.BASE_URL}/auth/register/user`, formData)
    .pipe(
      catchError((err) => {
        if(err.status === 0 && err.status !== 404) {
          this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente')
        } else if(err.status === 404) {
          // msg vindo do back
          this.utilsService.showError(err.error.message);

        } else {
         this.utilsService.showError('Ocorreu um erro no servidor, tente novamente mais tarde!');
        }
        return throwError(() => err) 
      })
    )
  }

  loginUser(user: any): Observable<LoginUser> {
    return this.httpClient.post<LoginUser>(`${environment.BASE_URL}/auth/login`, user)
      .pipe(
        retry(2),
        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente')
          } else if(err.status === 404) {
            // msg vindo do back
            this.utilsService.showError(err.error.message);
  
          } else {
           this.utilsService.showError('Ocorreu um erro no servidor, tente novamente mais tarde!');
          }
          return throwError(() => err) 
        })
      )
  }

  downloadImage(imgName: string): Observable<DownloadImage> {
    const headers = new HttpHeaders().set('imgName', imgName)

    return this.httpClient.get<DownloadImage>(`${environment.BASE_URL}/download/image`, {headers})
      .pipe(
        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente')
          } else if(err.status === 404) {
            // msg vindo do back
            this.utilsService.showError(err.error.message);
  
          } else {
           this.utilsService.showError('Ocorreu um erro no servidor, tente novamente mais tarde!');
          }
          return throwError(() => err) 
        })
      )
  }
}
