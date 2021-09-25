import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/authentication/auth.service';
import * as CryptoJS from 'crypto-js';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  public showusername: boolean = true;
  public showpassword: boolean = true;
  public showdeptlist: boolean = false;
  public showloginbtn: boolean = true;
  public showgobtn: boolean = false;

  public deptlist: any = [];

  menuItems: any[] = [
    {
      label: 'Sign Up',
      icon: 'login',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'About',
      icon: 'help',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Pricing',
      icon: 'attach_money',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'Docs',
      icon: 'notes',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Showcase',
      icon: 'slideshow',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'Blog',
      icon: 'rss_feed',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    },
  ];
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      deptlist: [null],
      remember_me: [false],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('remember_me');
  }

  login() {
    const password = CryptoJS.AES.encrypt(this.loginForm.get('password')!.value, 'ds_key');
    this.loginForm.patchValue({ password: `${password}` });
    
    this.auth.userlogin(this.loginForm.value)
      .pipe(filter(authenticated => authenticated))
      .subscribe((res: any) => {
        if (res.success === true && res.deptlist.length == 1) {
          this.loginForm.reset();
          this.router.navigate(['/helpdesk/ticketgeneration']);

          Swal.fire('Login Successful!!!', '', 'success');
        } else if (res.success === true && res.deptlist.length > 1) {
          this.showdeptlist = true;
          this.showgobtn = true;
          this.showloginbtn = false;
          this.showpassword = false;
          this.showusername = false;
          
          this.deptlist = res.deptlist;
          this.loginForm.controls["deptlist"].setValidators(Validators.required);
          this.loginForm.controls['deptlist'].updateValueAndValidity();

          this.loginForm.controls["username"].clearValidators;
          this.loginForm.controls['username'].updateValueAndValidity();

          this.loginForm.controls["password"].clearValidators;
          this.loginForm.controls['password'].updateValueAndValidity();
        }
        else {
          Swal.fire('Login Failed!!!', '', 'error');
        }
      });
  }

  AfterDeptSelection(){
    this.loginForm.reset();
    this.router.navigate(['/helpdesk/ticketgeneration']);
  }

  isValidInput(fieldName: any): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }
}
