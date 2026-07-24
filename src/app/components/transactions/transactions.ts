import { Component, computed, inject, signal } from '@angular/core';
import { Transaction } from '../../models/finance-models/transaction';
import { TransactionService } from '../../services/transaction-service';
import { catchError } from 'rxjs';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, X, ArrowUpDown } from 'lucide-angular';
import { FinanceService } from '../../services/finance-service';
import { Account } from '../../models/finance-models/account';

type TransactionType = 'all' | 'income' | 'expense';
type DateRangePreset = 'all' | '7d' | '30d' | '90d' | 'ytd' | 'custom';
type SortOrder = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

const DAY_MS = 24 * 60 * 60 * 1000;

@Component({
  selector: 'app-transactions',
  imports: [NgClass, FormsModule, LucideAngularModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  transactionService = inject(TransactionService);
  financeService = inject(FinanceService);

  readonly icons = { Search, X, ArrowUpDown };

  accounts = signal<Account[]>([]);
  private allTransactions = signal<Transaction[]>([]);

  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  searchTerm = signal('');
  selectedAccountId = signal(0);
  transactionType = signal<TransactionType>('all');
  dateRangePreset = signal<DateRangePreset>('all');
  customFrom = signal('');
  customTo = signal('');
  sortOrder = signal<SortOrder>('date-desc');

  readonly dateRangeOptions: { value: DateRangePreset; label: string }[] = [
    { value: 'all', label: 'All time' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'ytd', label: 'This year' },
    { value: 'custom', label: 'Custom range' },
  ];

  readonly sortOptions: { value: SortOrder; label: string }[] = [
    { value: 'date-desc', label: 'Newest first' },
    { value: 'date-asc', label: 'Oldest first' },
    { value: 'amount-desc', label: 'Amount: high to low' },
    { value: 'amount-asc', label: 'Amount: low to high' },
  ];

  transactions = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const accountId = this.selectedAccountId();
    const type = this.transactionType();
    const range = this.dateRangeBounds();

    let result = this.allTransactions();

    if (accountId !== 0) {
      result = result.filter(t => t.accountId === accountId);
    }

    if (type === 'income') {
      result = result.filter(t => t.amount > 0);
    } else if (type === 'expense') {
      result = result.filter(t => t.amount < 0);
    }

    if (term) {
      result = result.filter(t =>
        t.payee?.toLowerCase().includes(term) ||
        t.description?.toLowerCase().includes(term) ||
        t.memo?.toLowerCase().includes(term)
      );
    }

    if (range) {
      result = result.filter(t =>
        t.transactedAt.timestamp >= range.from && t.transactedAt.timestamp <= range.to
      );
    }

    return this.applySort(result);
  });

  activeFilterCount = computed(() => {
    let count = 0;
    if (this.selectedAccountId() !== 0) count++;
    if (this.transactionType() !== 'all') count++;
    if (this.searchTerm().trim()) count++;
    if (this.dateRangePreset() !== 'all') count++;
    return count;
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
    });
  }

  getTransactions() {
    this.transactionService.getAll().pipe(catchError(error => {
      throw error;
    })).subscribe(transactions => {
      this.allTransactions.set(transactions);
    });
  }

  clearFilters() {
    this.searchTerm.set('');
    this.selectedAccountId.set(0);
    this.transactionType.set('all');
    this.dateRangePreset.set('all');
    this.customFrom.set('');
    this.customTo.set('');
  }

  private dateRangeBounds(): { from: number; to: number } | null {
    const preset = this.dateRangePreset();
    const now = Date.now();

    switch (preset) {
      case '7d':
        return { from: now - 7 * DAY_MS, to: now };
      case '30d':
        return { from: now - 30 * DAY_MS, to: now };
      case '90d':
        return { from: now - 90 * DAY_MS, to: now };
      case 'ytd':
        return { from: new Date(new Date().getFullYear(), 0, 1).getTime(), to: now };
      case 'custom': {
        const from = this.customFrom() ? new Date(this.customFrom()).getTime() : -Infinity;
        const to = this.customTo() ? new Date(this.customTo()).getTime() + DAY_MS - 1 : Infinity;
        return { from, to };
      }
      default:
        return null;
    }
  }

  private applySort(transactions: Transaction[]): Transaction[] {
    const sorted = [...transactions];
    switch (this.sortOrder()) {
      case 'date-asc':
        return sorted.sort((a, b) => a.transactedAt.timestamp - b.transactedAt.timestamp);
      case 'amount-desc':
        return sorted.sort((a, b) => b.amount - a.amount);
      case 'amount-asc':
        return sorted.sort((a, b) => a.amount - b.amount);
      default:
        return sorted.sort((a, b) => b.transactedAt.timestamp - a.transactedAt.timestamp);
    }
  }
}
