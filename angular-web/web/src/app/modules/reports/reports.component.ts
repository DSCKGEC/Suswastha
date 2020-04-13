import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReportService } from 'src/app/services/report.service';
import { DataSource } from '@angular/cdk/collections';
import { DashboardService } from 'src/app/services/dashboard.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public geoData: any;

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }


  addDetails = {
    name: '',
    subject: '',
    content: '',
    lat: '',
    lng: '',
    pos: {
      geopoint: '',
      geohash: '',
    },
    contact: '',
    created: '',
    resolved: '',
    location: ''
  }

  constructor(
    private afs: AngularFirestore,
    private report: ReportService,
    private dashboardService: DashboardService
  ) {  }

  ngOnInit(): void {

  }
  displayedColumns = ['subject', 'content', 'location', 'contact', 'resolved'];
  dataSource = new ReportDataSource(this.report);

  addReport() {
    this.dashboardService
      .geoCode(this.addDetails.location)
      .subscribe(data => {
        this.geoData = data;
        // console.log(this.geoData);
        this.addDetails.lat = this.geoData.results[0].geometry.location.lat;
        this.addDetails.lng = this.geoData.results[0].geometry.location.lng;
        this.addDetails.created = new Date().toISOString();
        // console.log([this.geoLat, this.geoLng]);   
        this.report.addReport(this.addDetails);
        console.log('Details Added');     
      });
    
  }

  resolve() {
    //Code for Resetting Yes
  }
}

export class ReportDataSource extends DataSource<any> {

  constructor(private report: ReportService) {
    super()
  }

  connect() {
    return this.report.getReports();
  }

  disconnect() {

  }
}