import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private afs: AngularFirestore
  ) { }

  addReport(reportData) {
    this.afs.collection('reports').add(reportData).then(() => {
      console.log('Report Added!');
    })
  }
 
  getReports() {
    return this.afs.collection('reports', ref => ref.orderBy('created')).valueChanges();
  }
}
