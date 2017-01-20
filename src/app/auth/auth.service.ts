import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import 'rxjs/Rx';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService implements CanActivate {
  JWT_KEY: string = 'retain_token';
  JWT: string = '111';
  headers: Headers = new Headers({
    'Content-type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(
    private router: Router,
    private http: Http
  ) {
    const token = window.localStorage.getItem(this.JWT_KEY);

    if (token) {
      this.setJwt(token);
    }

    const cred = {
      'username': 'alex@mail.ru',
      'password': 'alex@mail.ru',
      'grant_type': 'password',
      'client_id': '11',
      'client_secret': '2IirYIUE41VPUMq2lcZ5XnJKFGNTIwEgg5huNa88',
      'scope': ''
    };

    this.authenticate('http://vk-post/oauth/token', cred).subscribe((res) => {
      console.log(res)
    });
  }

  setJwt(jwt: string) {
    window.localStorage.setItem(this.JWT_KEY, jwt);
    this.setHeaders({Authorization: `Bearer ${jwt}`});
  }

  isAuthorization(): boolean {
    return Boolean(this.JWT);
  }

  canActivate(): boolean {
    const canActivate = this.isAuthorization();
    this.onCanActivate(canActivate);
    return canActivate;
  }

  onCanActivate(canActivate: boolean) {
    if (!canActivate) {
      this.router.navigate(['', 'auth']);
    }
  }

  setHeaders(headers) {
    console.log(headers);
    Object.keys(headers)
      .forEach(header => this.headers.set(header, headers[header]));
  }

  authenticate(path, credits): Observable<any> {
    return this.http.post(path, credits, {headers: this.headers})
      .do((res: any) => this.setJwt(res))
      .map((res: any) => {
        console.log(res);
        return res.data;
      });
  }
}
