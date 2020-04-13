import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject } from 'rxjs';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

interface Post {
  email: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firebaseDb: AngularFirestore,
    private router: Router,
    private cookieService: CookieService
  ) { }

  addUser(user_name, user_email, password) {
    this.signup(user_email, password);
    let data = {
      name: user_name,
      email: user_email,
      role: 'A'
    };
    let id = this.pushData(data);

    if (id) {
      return true;
    } else {
      return false;
    }
  }

  /* FireBase Functions */

  pushData(data) {
    let addData = this.firebaseDb.collection('users').add(data).then(ref => {
      console.log('Added document with ID: ', ref.id);
      // id = ref.id;
    });;
    return addData;
  }

  getCollection$(): Observable<Post[]> {
    const path = 'users';
    return this.firebaseDb.collection<Post>(path).valueChanges();
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        if (userCredential) {
          console.log(userCredential);
          this.cookieService.delete('user_email');
          this.cookieService.set('user_email', userCredential.user.email);
          //get role & name here          
          this.firebaseDb.collection('users', ref =>
            ref.where('email', '==', email)
          );
          this.cookieService.set('user_role', 'A');
          // this.cookieService.set('user_name', 'Dipan Roy');
          //Redirect
          this.router.navigate(['/']);
        }
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        alert(err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}
