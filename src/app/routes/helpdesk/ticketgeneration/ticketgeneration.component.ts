import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core';
import { CommonService } from 'app/services/common.service';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-ticketgeneration',
  templateUrl: './ticketgeneration.component.html',
  styleUrls: ['./ticketgeneration.component.scss']
})
export class TicketgenerationComponent implements OnInit {

  form: FormGroup = this.fb.group({
    modules: [null, Validators.required],
    category: [null, Validators.required],
    isreproducible: [null],
    priority: [null],
    department: [null, Validators.required],
    user_selected: [null, Validators.required],
    issue_description: [null, Validators.required],
    contact_no: [null, [Validators.pattern("[6789][0-9]{9}"), Validators.required]],
    reference: [null],
    user_id:[this.authService.currentUser.user_id],
    function_name: ['createHelpDeskTicket']
  });

  public modules: any = [];
  public category: any = [];
  public reproducible: any = [];
  public priority: any = [];
  public userlist: any = [];
  public department: any = [];
  public userlist_bydeptid: any = [];

  constructor(
    private cms: CommonService,
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getModulesCategoryReproduciblePriority(3);
    this.getModulesCategoryReproduciblePriority(4);
    this.getModulesCategoryReproduciblePriority(5);
    this.getModulesCategoryReproduciblePriority(1);
    this.getDept();
  }

  getDept() {
    this.cms.getFunction('common/getFunction/getDept').subscribe((res: any) => {
      this.department = res;
    });
  }
  getEmployeeByDept(event) {
    this.cms.getFunction('common/getFunction/getDept_users/' + event).subscribe((res: any) => {
      this.userlist_bydeptid = res;
    });
  }

  getModulesCategoryReproduciblePriority(code_type_id: any) {
    this.cms.getFunction('common/getFunction/getModulesCategoryReproduciblePriority/' + code_type_id).subscribe((res: any) => {
      if (code_type_id == 3) {
        this.category = res;
      } else if (code_type_id == 4) {
        this.modules = res;
      } else if (code_type_id == 5) {
        this.reproducible = res;
      } else
        if (code_type_id == 1) {
          this.priority = res;
        }
    });
  }

  isValidInput(fieldName: any): boolean {
    return this.form.controls[fieldName].invalid &&
      (this.form.controls[fieldName].dirty || this.form.controls[fieldName].touched);
  }

  resetform() {
    this.form.reset();
  }
  createTicket() {
    console.log(this.form.value);
    this.cms.save('insert/save', this.form.value).subscribe((res: any) => {
       console.log(res);
    });
  }
}
