import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.removeItem('loginHash');
    sessionStorage.clear();
    //sessionStorage.removeItem('loginHash');
    this.cookieService.deleteAll();
    this.cookieService.delete('user_email');
    this.router.navigateByUrl('/login');
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
