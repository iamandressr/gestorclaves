import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Password } from '../models/password.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token'); // Asegúrate de guardarlo al login
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token || ''}`,
        'Content-Type': 'application/json',
      }),
    };
  }

  getPasswords(): Observable<Password[]> {
    return this.http.get<Password[]>(`${this.baseUrl}/passwords`, this.getAuthHeaders());
  }

  addPassword(password: Password): Observable<Password> {
    return this.http.post<Password>(`${this.baseUrl}/passwords`, password, this.getAuthHeaders());
  }

  updatePassword(id: string, password: Password): Observable<Password> {
    return this.http.put<Password>(`${this.baseUrl}/passwords/${id}`, password, this.getAuthHeaders());
  }

  deletePassword(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/passwords/${id}`, this.getAuthHeaders());
  }

  login(username: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth/login`, { username, password });
  }
}
