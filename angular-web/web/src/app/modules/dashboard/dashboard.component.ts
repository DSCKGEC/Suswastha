import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public geoData: any;
  public geoLat: number;
  public geoLng: number;
  public geoHash: any;
  public rad: any;
  public loc: any;
  public updated: boolean;

  constructor(
    private cookieService: CookieService,
    private dashboardService: DashboardService,
    private router: Router
  ) { 
    const role = this.cookieService.get('user_role');
    if(role != 'A'){
      router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

  addArea(event){
    event.preventDefault();
    const target = event.target;

    const location = target.querySelector('#location').value;
    const radius = target.querySelector('#radius').value;

    this.dashboardService
      .geoCode(location)
      .subscribe(data => {
        this.geoData = data;
        // console.log(this.geoData);
        this.geoLat = this.geoData.results[0].geometry.location.lat;
        this.geoLng = this.geoData.results[0].geometry.location.lng;
        // console.log([this.geoLat, this.geoLng]);        
      });

    this.rad = radius;
    this.loc = location;

    // this.geoHash = this.dashboardService.geoHash(this.geoLat, this.geoLng, parseInt(radius))?this.dashboardService.geoHash(this.geoLat, this.geoLng, parseInt(radius)):"NA";
  }

  setArea(event){
    event.preventDefault();
    // console.log("C");
    this.updated = true;
    let ret = this.dashboardService.sendData(this.geoLat, this.geoLng, this.rad, this.loc, 0.95);
    (<HTMLFormElement>document.getElementById("add-area")).reset();
      console.log(ret);
  }

  cancelE(event){
    event.preventDefault();
    // const target = event.target;
    // target.querySelector('#location').value = '';
    // target.querySelector('#radius').value = '';
    (<HTMLFormElement>document.getElementById("add-area")).reset();
    this.loc = null;
  }
  
}
