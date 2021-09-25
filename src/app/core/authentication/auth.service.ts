import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Token, User } from './interface';
import { guest } from './user';
import { environment } from '@env/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private rooturl = environment.rootUrl;
  private user$ = new BehaviorSubject<User>(guest);

  private userReq$ = this.http.get<User>('/me');

  constructor(private http: HttpClient, private helper: JwtHelperService, private router: Router, private token: TokenService) {
    // this.token
    //   .change()
    //   .pipe(switchMap(() => (this.check() ? this.userReq$ : of(guest))))
    //   .subscribe(user => this.user$.next(Object.assign({}, guest, user)));

    // this.token
    //   .refresh()
    //   .pipe(switchMap(() => this.refresh()))
    //   .subscribe();
  }

  // check() {
  //   return this.token.valid();
  // }

 
  // userlogin(credentials: any): Observable<any> {
  //   return this.http.post<Token>(this.rooturl + 'login/userlogin', credentials)
  //     .pipe(
  //       tap(token => this.token.set(token)),
  //       map((res: any) => {
  //         const result = res;
  //         if (result && result.token) {
  //           localStorage.setItem('token', result.token);
  //         }
  //         return res;
  //       })
  //     );
  // }

  // refresh() {
  //   return this.http.post<Token>('/auth/refresh', {}).pipe(
  //     tap(token => this.token.set(token, true)),
  //     map(() => this.check())
  //   );
  // }

  // logout() {
  //   return this.http.post('/auth/logout', {}).pipe(
  //     tap(() => this.token.clear()),
  //     map(() => !this.check())
  //   );
  // }

  user() {
    return this.user$.pipe(share());
  }

  userlogin(credentials: any): Observable<any> {
    return this.http.post(this.rooturl + 'login/userlogin', credentials)
      .pipe(
        map((res: any) => {
          const result = res;
          if (result && result.token) {
            localStorage.setItem('token', result.token);
          }
          return res;
        })
      );
  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    else {
      return false;
    }
  }
  get currentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const isExpired = this.helper.isTokenExpired(token);
      if (!isExpired) {
        return this.helper.decodeToken(token);
      } else {
        this.logout();
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
