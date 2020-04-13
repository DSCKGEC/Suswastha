import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import Geohash from 'latlon-geohash';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
// const geohash = require('angular-geohash');

@Injectable({
  providedIn: 'root'
})



export class DashboardService {

  apiKey = environment.googleMapsKey;
  public currentRank: string;

  constructor(
    private http: HttpClient,
    private firebaseDb: AngularFirestore
    ) { }

  geoCode(location){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ location + '&key=' + this.apiKey);
  }

  geoHash(lat,lng,precision){
    return Geohash.encode(lat,lng,precision);
  }

  sendData(lat, lng, radius, location, ranker){
    let geoHash = this.geoHash(lat, lng, 6);

    this.firebaseDb.collection('severity').doc(location).valueChanges().subscribe(val=>{
      this.currentRank = val["rank"];
      // console.log(parseFloat(this.currentRank));
    });
    var rankVal = (this.currentRank?parseFloat(this.currentRank):1) * 0.95;
    //var rankVal = 0.95;
    // console.log(rankVal);
    let data = {
      location: location,
      geo: new firebase.firestore.GeoPoint(lat, lng),
      radius: Number(radius),
      pos: {
        geohash: geoHash,
        geopoint: new firebase.firestore.GeoPoint(lat, lng),
      },
      rank: rankVal,
      // lastUpdated: firebase.database.ServerValue.TIMESTAMP //change
      lastUpdated: new Date().toISOString()
    };

    let addData = this.firebaseDb.collection('severity').doc(location).set(data);
    

    return addData;
  }
}
