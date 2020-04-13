import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userEmail: any;
  userName: any;
  userType: any;
  userImage: any;

  constructor(
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    if(this.cookieService.get('user_email'))
      this.userEmail = this.cookieService.get('user_email');
    else
      this.userEmail = 'administrator@dckgec.ml';

    if(this.cookieService.get('user_name')){
      this.userName = this.cookieService.get('user_name');
    } else {
      this.userName = 'Administrator';
    }
  }

}
