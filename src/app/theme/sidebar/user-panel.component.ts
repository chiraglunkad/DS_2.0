import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/authentication/auth.service';
import { User } from '@core/authentication/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  // template: `
  //   <div class="matero-user-panel" fxLayout="column" fxLayoutAlign="center center">
  //     <img class="matero-user-panel-avatar" [src]="user.avatar" alt="avatar" width="64" />
  //     <h5 class="matero-user-panel-email">`+ this.username + `</h5>
  //     <div class="matero-user-panel-icons">
  //       <a routerLink="/profile/overview" mat-icon-button>
  //         <mat-icon class="icon-20">account_circle</mat-icon>
  //       </a>
  //       <a routerLink="/profile/settings" mat-icon-button>
  //         <mat-icon class="icon-20">settings</mat-icon>
  //       </a>
  //       <a (click)="logout()" mat-icon-button>
  //         <mat-icon class="icon-20">exit_to_app</mat-icon>
  //       </a>
  //     </div>
  //   </div>
  // `,
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {
  user: User;
  public username: any = "";
  public email: any = "";

  constructor(private router: Router, private auth: AuthService, private authService: AuthService) { }

  ngOnInit(): void {
    this.auth.user().subscribe(user => (this.user = user));
    this.username = this.authService.currentUser.name;
    this.username = this.authService.currentUser.name;
    this.email = this.authService.currentUser.email;
  }

  logout() {
    // this.auth.logout().subscribe(() => this.router.navigateByUrl('/auth/login'));
  }
}
