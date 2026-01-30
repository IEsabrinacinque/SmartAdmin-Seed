import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import {
  LoginResponseMock,
  LOGIN_RESPONSE_OK,
  LOGIN_RESPONSE_ERROR
} from '@/app/mock-backend/auth/login-response.mock';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // 🔧 quando passerai al backend reale
  private readonly API_URL = '/api/auth/login';

  // 🔧 switch centrale, da mettere a false quando avrò il back reale , chiamata reale al back
  private readonly USE_MOCK = true;

  constructor(private http: HttpClient) {}

  /**
   * 🔐 LOGIN
   */
  login(username: string, password: string): Observable<LoginResponseMock> {

    if (this.USE_MOCK) {
      return this.loginMock(username, password);
    }

    return this.loginReal(username, password);
  }

  // ============================
  // 🔹 MOCK
  // ============================

  private loginMock(
    username: string,
    password: string
  ): Observable<LoginResponseMock> {

    if (username === 'admin' && password === 'admin') {
      return of(LOGIN_RESPONSE_OK);
    }

    return of(LOGIN_RESPONSE_ERROR);
  }

  // ============================
  // 🔹 REAL BACKEND (PRONTO)
  // ============================

  private loginReal(
    username: string,
    password: string
  ): Observable<LoginResponseMock> {

    const payload = {
      username,
      password,
      // 👇 dominio / host lo leggeremo da window.location
      host: window.location.host
    };

    return this.http.post<LoginResponseMock>(
      this.API_URL,
      payload
    );
  }
}
