import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';

declare var M:any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }
  empId: string='';
  empName:string='';
  position:string='';
  office:string='';
  salary:number = 0;
  employee: Employee = {
    _id: '',
    name: '',
    position: '',
    office: '',
    salary: 0
  };
  employees: Employee[] = [];

  ngOnInit(): void {
    // this.employeeService.selectedEmployee = this.employee;
    // this.employeeService.employees = this.employees;
    this.resetForm();
    this.refreshEmployeeList();
  }

  onSubmit(form:NgForm){
    if(form.value._id=="" || form.value._id==null){
      this.employeeService.postEmployee(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({html:'Saved successfully', classes:'rounded'})
      })
    }
    else{
      this.employeeService.putEmployee(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({html:'Updated successfully', classes:'rounded'})
      })
    }
  }

  resetForm(form?:NgForm){
    if(form){
      form.reset();
      this.employeeService.selectedEmployee = {
        _id: "",
        name: "",
        position: "",
        office: "",
        salary: 0
      }
      this.employee = this.employeeService.selectedEmployee;
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee) {
    this.employee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if(confirm('Are you sure to delete this record?')==true){
      this.employeeService.deleteEmployee(_id).subscribe((res)=>{
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({html:'Deleted successfully', classes:'rounded'})
      })
    }
  }

}
