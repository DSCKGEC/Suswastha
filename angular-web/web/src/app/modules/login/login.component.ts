import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router,
    private titleService: Title,
  ) {
    this.titleService.setTitle( "COVID-19 Admin | Login" );
   }

  ngOnInit(): void {
  }

  loginUser(event) {
    let created;
    event.preventDefault();
    const target = event.target;

    const email = target.querySelector('#email').value;
    const password = target.querySelector('#password').value;
    
    this.authService.login(email, password);
  }
}
