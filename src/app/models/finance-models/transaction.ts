export interface TransactionDto {
  id: number;
  accountId: number;
  amount: number;
  description: string;
  memo: string;
  payee: string;
  posted: Date | string;
  transactedAt: Date | string;
}


export class Transaction {
  id: number;
  accountId: number;
  amount: number;
  description: string;
  memo: string;
  payee: string;
  posted: ParsedDate;
  transactedAt: ParsedDate;

  constructor(data: TransactionDto) {
    this.id = data.id;
    this.accountId = data.accountId;
    this.amount = data.amount;
    this.description = data.description;
    this.memo = data.memo;
    this.payee = data.payee;
    this.posted = parseDate(data.posted);
    this.transactedAt = parseDate(data.transactedAt);
  }
}

export interface ParsedDate {
  day: string;
  dayShort: string;
  month: string;
  monthShort: string;
  date: number;
  datePadded: string;
  year: number;
  time: string;
  timestamp: number;
}

const parseDate = (date: Date | string): ParsedDate => {
  const d = new Date(date);
  return {
    day: d.toLocaleDateString('en-US', { weekday: 'long' }),
    dayShort: d.toLocaleDateString('en-US', { weekday: 'short' }),
    month: d.toLocaleDateString('en-US', { month: 'long' }),
    monthShort: d.toLocaleDateString('en-US', { month: 'short' }),
    date: d.getDate(),
    datePadded: d.toLocaleDateString('en-US', { day: '2-digit' }),
    year: d.getFullYear(),
    time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    timestamp: d.getTime(),
  };
};