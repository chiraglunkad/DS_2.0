import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HelpdeskRoutingModule } from './helpdesk-routing.module';
import { TicketgenerationComponent } from './ticketgeneration/ticketgeneration.component';

const COMPONENTS = [TicketgenerationComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    HelpdeskRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC,
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class HelpdeskModule { }
