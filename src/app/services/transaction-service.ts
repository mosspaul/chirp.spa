import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction, TransactionDto } from '../models/finance-models/transaction';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  http = inject(HttpClient);
	baseUrl = "http://localhost:5287/api/transaction/";

  getAll() {
    return this.http.get<TransactionDto[]>(`${this.baseUrl}all`).pipe(
      map(transactions => transactions.map(t => new Transaction(t)))
    );
  }
}
