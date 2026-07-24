import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Connection } from '../models/finance-models/connection';
import { Account } from '../models/finance-models/account';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  http = inject(HttpClient);
	baseUrl = "http://localhost:5287/api/finance";

  getAll() {
    return this.http.get<Connection[]>(`${this.baseUrl}/all`);
  }

  getAccounts() {
    return this.http.get<Account[]>(`${this.baseUrl}/accounts`);
  }
}
