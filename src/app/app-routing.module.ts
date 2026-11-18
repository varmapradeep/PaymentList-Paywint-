import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PaymentsComponent } from "./payments/payments.component";

const routes: Routes = [
  { path: "Payments", component: PaymentsComponent },
  { path: "", redirectTo: "Payments", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
