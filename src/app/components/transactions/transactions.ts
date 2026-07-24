import { Component, inject, signal } from '@angular/core';
import { Transaction } from '../../models/finance-models/transaction';
import { TransactionService } from '../../services/transaction-service';
import { catchError } from 'rxjs';
import { NgClass } from '@angular/common';
import { FinanceService } from '../../services/finance-service';
import { Account } from '../../models/finance-models/account';

@Component({
  selector: 'app-transactions',
  imports: [NgClass],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  transactionService = inject(TransactionService);
  financeService = inject(FinanceService);
  accounts = signal<Account[]>([]);
  transactions = signal<Transaction[]>([]);
  private allTransactions: Transaction[] = [];
  formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD', 
});

  ngOnInit() {
    this.getTransactions();
    this.getAccounts();
   
  }

  getAccounts() {
    this.financeService.getAccounts().pipe(catchError(error => {
      throw error;
    })).subscribe(accounts => {
      this.accounts.set(accounts);
    })
  }

  filterBy(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);
    this.transactions.set(
      id === 0 ? this.allTransactions 
      : 
      this.allTransactions.filter(t => t.accountId === id)
    );
  }

  getTransactions() {
      this.transactionService.getAll().pipe(catchError(error => {
        throw error;
      }))
        .subscribe(trans => {
          let sorted = this.sortByDate(trans);
          this.allTransactions = sorted;
          this.transactions.set(sorted);
        });
    }

    sortByDate(transactions: Transaction[]) {
      return transactions.sort((a, b) =>b.transactedAt.timestamp - a.transactedAt.timestamp);
    }
}
