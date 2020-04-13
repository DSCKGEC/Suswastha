import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = false;

  screenHeight: number;
  screenWidth: number;

  public constructor(private titleService: Title ) { 
    this.getScreenSize();
    this.titleService.setTitle( "COVID-19 Admin | Dashboard" );
    if (this.screenWidth > 760) {
      this.sideBarOpen = true;
    }
  }

  ngOnInit(): void {  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  sideBarToggler(e) {
    this.sideBarOpen = !this.sideBarOpen;
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        console.log(this.screenHeight, this.screenWidth);
  }

}
