import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  catchError, debounceTime, distinctUntilChanged,
  of, retry, startWith, switchMap,
} from "rxjs";
import { Payment, PaymentsService } from "../payments.service";

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"],
})
export class PaymentsComponent implements OnInit {
  searchform!: FormGroup;
  paymnetlist: Payment[] = [];
  errorMessage = "";

  constructor(private paymentservice: PaymentsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchform = this.fb.group({ searchdata: [""] });

    this.searchform.get("searchdata")!.valueChanges.pipe(
      startWith(""),                      
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((text: string) =>
        this.paymentservice.searchByCustomer(text).pipe(
          retry(3),                       
          catchError((err) => {
            this.errorMessage = "Could not load payments";
            console.error(err);
            return of([] as Payment[]);   
          }),
        ),
      ),
    ).subscribe((list) => {
      this.errorMessage = "";
      this.paymnetlist = list;
    });
  }
}