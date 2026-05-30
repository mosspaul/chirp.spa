import { Component, inject, signal } from '@angular/core';
import { FinanceService } from '../../services/finance-service';
import { catchError } from 'rxjs';
import { Connection } from '../../models/finance-models/connection';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  financeService = inject(FinanceService);
  connections = signal<Connection[]>([]);

  ngOnInit() {
    this.getAll();
   
  }

  getAll() {
      this.financeService.getAll().pipe(catchError(error => {
        throw error;
      }))
        .subscribe(conns => {
          this.connections.set(conns);
        });
    }
}
