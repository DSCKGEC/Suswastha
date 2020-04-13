import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import * as firebaseApp from 'firebase/app';
import * as geofirex from 'geofirex';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  geo = geofirex.init(firebaseApp);
  points: Observable<any>;

  radius = new BehaviorSubject(0.5);

  

  constructor(
    private db: AngularFireDatabase
  ) { 
  }

  getMarkers(lat, lng, rad){
    const center = this.geo.point(lat, lng);
    const field = 'pos';

    this.points = this.radius.pipe(
      switchMap(r => {
        return this.geo.query('bearings').within(center, r, field, { log: true });
      }),
      shareReplay(1)
    );
  }

  update(v) {
    this.radius.next(v);
  }
}