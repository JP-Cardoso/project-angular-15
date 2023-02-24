import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UtilsService } from './utils.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../interfaces/registerUser';
import { LoginUser } from '../interfaces/loginUser';
import { DownloadImage } from '../interfaces/downloadImage';
import { RegisterRevenues } from '../interfaces/registerRevenues';
import { ListRevenues } from '../interfaces/listRevenues';
import { DeleteRevenues } from '../interfaces/deleteRevenue';
import { UpdateRevenues } from '../interfaces/updateRevenues';
import { RegisterDebts } from '../interfaces/registerDebts';
import { ListDebts } from '../interfaces/listDebts';
import { UpdateDebts } from '../interfaces/updateDebts';

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
    const headers = new HttpHeaders().set('imgname', imgName)

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

  registerRevenues(revenue: any): Observable<RegisterRevenues> {
    return this.httpClient.post<RegisterRevenues>(`${environment.BASE_URL}/auth/revenues`, revenue)
    .pipe(
      catchError((err)=> {
        return throwError(() => err)
      })
    )
  }

  getRegisterrevenues(param: any, user: any): Observable<ListRevenues> {
    let headers = new HttpHeaders();

    headers = headers.set('month', param).set('user', user)

    return this.httpClient.get<ListRevenues>(`${environment.BASE_URL}/list/revenues`, {headers: headers})
      .pipe(
        first(),
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

  deleteRevenues(id: string): Observable<DeleteRevenues> {
    return this.httpClient.delete<DeleteRevenues>(`${environment.BASE_URL}/delete/revenue/${id}`)
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

  updateRevenues(id: string, payload: any): Observable<UpdateRevenues> {
    return this.httpClient.put<UpdateRevenues>(`${environment.BASE_URL}/update/revenues/${id}`, payload)
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

  registerDebts(debts: any): Observable<RegisterDebts>{
    return this.httpClient.post<RegisterDebts>(`${environment.BASE_URL}/auth/debts`, debts)
    .pipe(
      catchError((err) => {
        return throwError(() => err)
      })
    )
  }

  getRegisterDebts(param: any, user: any): Observable<ListDebts> {
    let headers = new HttpHeaders()
    headers = headers.set('month', param).set('user', user)

    return this.httpClient.get<ListDebts>(`${environment.BASE_URL}/list/debts`, {headers: headers})
    .pipe(
      first(),
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


  updateDebts(id: string, payload: any): Observable<UpdateDebts> {
    return this.httpClient.put<UpdateDebts>(`${environment.BASE_URL}/update/debts/${id}`, payload)
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


  deleteDebs() {
    
  }

}


