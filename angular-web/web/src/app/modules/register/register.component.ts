import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private cookieService: CookieService) { }

  authError: any;

  ngOnInit(): void {
  }

  registerUser(event) {
    let created;
    event.preventDefault();
    const target = event.target;
    const name = target.querySelector('#name').value;
    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    const cpassword = target.querySelector('#cpassword').value;
    let errors = false;

    if(password != cpassword) {
      this.authError = "Password & Confirm Password does not match, Please try again!";
      errors = true;
      return;
    }
    if(errors == false) {
      created = this.authService.addUser(name, email, password);
      if(created){
        this.authError = "Account Successfully Created";
      } else {
        this.authError = "Account creation unsuccessful, Please try again.";
      }
    } else {
      created = null;
      this.authError = "Server Error, Please Try Again!";
    }
  }
}
