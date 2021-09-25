import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketgenerationComponent } from './ticketgeneration/ticketgeneration.component';

const routes: Routes = [
  { path: '', component: TicketgenerationComponent },
  { path: 'ticketgeneration', component: TicketgenerationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpdeskRoutingModule {}
