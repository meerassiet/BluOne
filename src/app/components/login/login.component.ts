import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  validUser;
  validPassword;

  loginUsers = [
    { "email": "banu.meera@gmail.com", "password": "s12345" },
    { "email": "bluOne@gmail.com", "password": "b12345" }
  ];

  constructor(public formBuilder: FormBuilder,
    public router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/branchlist']);
    }
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    else {
      this.validUser = false;
      this.validPassword = false;
      this.loginUsers.forEach(user => {
        if (user.email == this.loginForm.value.email) {
          this.validUser = true;
          if (user.password == this.loginForm.value.password) {
            this.validPassword = true;
            localStorage.setItem("currentUser", user.email);
            this.router.navigate(['/branchlist']);
          }
        }
      });
      if (!this.validUser)
        alert("User does not exist");
      else if (!this.validPassword)
        alert("Invalid Password");
    }
  }
}
