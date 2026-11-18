import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, map, Observable } from "rxjs";
export type PaymentStatus = "completed" | "pending" | "failed" | "refunded";
export type PaymentMethod = "ach" | "wire" | "card" | "check";

export interface Payment {
  id: string;
  reference: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  createdAt: string;
  description: string;
  fee: number;
}

@Injectable({
  providedIn: "root",
})
export class PaymentsService {
  constructor(private http: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>("assets/Payment.json").pipe(
      delay(600),
      map((rows) => {
        if (Math.random() < 0.2) throw new Error("Failed to load payments");
        return rows;
      }),
    );
  }
  searchByCustomer(name: string): Observable<Payment[]> {
    const text = (name ?? "").trim().toLowerCase();

    return this.getPayments().pipe(
      map((rows) =>
        !text
          ? rows
          : rows.filter((p) => p.customerName.toLowerCase().includes(text)),
      ),
    );
  }

}
