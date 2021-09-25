import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { CustomizerComponent } from './customizer/customizer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarNoticeComponent } from './sidebar-notice/sidebar-notice.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserPanelComponent } from './sidebar/user-panel.component';
import { AccordionDirective } from './sidemenu/accordion.directive';
import { AccordionAnchorDirective } from './sidemenu/accordionanchor.directive';
import { AccordionItemDirective } from './sidemenu/accordionItem.directive';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { TopmenuPanelComponent } from './topmenu/topmenu-panel.component';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { TranslateComponent } from './widgets/translate.component';
import { UserComponent } from './widgets/user.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AuthLayoutComponent,
    SidebarComponent,
    UserPanelComponent,
    SidemenuComponent,
    AccordionDirective,
    AccordionItemDirective,
    AccordionAnchorDirective,
    SidebarNoticeComponent,
    TopmenuComponent,
    TopmenuPanelComponent,
    HeaderComponent,
    TranslateComponent,
    UserComponent,
    CustomizerComponent,
  ],
  imports: [SharedModule],
})
export class ThemeModule { }
