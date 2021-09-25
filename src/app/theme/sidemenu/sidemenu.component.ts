import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AuthService, MenuService } from '@core';
import { CommonService } from 'app/services/common.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidemenuComponent {
  // NOTE: Ripple effect make page flashing on mobile
  @Input() ripple = false;
  public menu$ = [];
  
  // menu$ = JSON.parse(this.fetch('assets/data/menus.json?_t=' + Date.now())).menu;
  // menu$ = this.menu.getAll();
  buildRoute = this.menu.buildRoute;

  constructor(private menu: MenuService, private cms: CommonService, private authService: AuthService) {
    cms.getFunction('index/getMenus/'+this.authService.currentUser.user_id).subscribe((res: any) => {
      this.menu$ = res;
      console.log(this.menu$);
    });

  }

  private fetch(url: string) {
    let content: any = null;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.onload = () => (content = xhr.responseText);
    xhr.send();

    return content;
  }
}
