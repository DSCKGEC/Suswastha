import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import * as firebaseApp from 'firebase/app';
import * as geofirex from 'geofirex';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  max = 30;
  min = 1;
  step = 1;
  thumbLabel = true;
  value = 5;
  vertical = false;

  zoom = 14;
  
  geo = geofirex.init(firebaseApp);
  points: Observable<any>;

  radius = new BehaviorSubject(5);

  lat: number;
  lng: number;
  dbRef: any = [];
  rad: number;

  constructor(
    private db: AngularFirestore,
  ) {
    // this.db.collection('severity').valueChanges().subscribe(val => {
    //   this.dbRef.push(val);
    // });
    // console.log(this.dbRef);
    this.rad = 5; //Default Radius
  }

  ngOnInit(): void {
    this.getUserLocation();
    this.changeRadius(this.rad);
  }

  setMarkers(lat, lng){
    const center = this.geo.point(lat, lng);
    // const center = this.geo.point(22.6924, 88.4653);
    const field = 'pos';

    this.points = this.radius.pipe(
      switchMap(r => {
        return this.geo.query('severity').within(center, r, field, { log: true });
      }),
      shareReplay(1)
    );
  }

  update(v) {
    this.radius.next(v);
  }

  changeRadius(r){
    this.radius = new BehaviorSubject(r);
  }

  onInputChange(event: MatSliderChange) {
    this.changeRadius(event.value);
    this.setMarkers(this.lat, this.lng);
    this.zoom = (15 - (event.value/5));
  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.setMarkers(position.coords.latitude, position.coords.longitude);
      })
    }
  }

}
