import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as sdac from 'museblockchain-js';

import { AlertService } from './alert.service';
import { UIService } from './ui.service';

import { environment } from '../../environments/environment';
import { SdacKeys } from '../models/sdac-keys';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { firestore } from 'firebase';


@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private alert: AlertService,
    private userService: UserService,
    private ui: UIService
  ) {

    // Persistence
    this.user$ = this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.userService.getUser(user.uid);
      } else {
        return Observable.of(null);
      }
    });

    this.user$.subscribe((user: User) => {

      // Set User
      if (user) {
        this.user = user;
      } else {
        this.ui.hideLoading();
      }

    });

  }

  private url = environment.apiUrl + 'auth/';
  user: User = new User();
  user$: Observable<User>;

  register(user: User) {

    this.ui.showLoading();

    // Sdac API Register
    this.http.post(this.url + 'register', user).subscribe((response: any) => {

      // Firebase Login
      this.afAuth.auth.signInWithCustomToken(response.token).then((userRecord) => {

        // Email Verification
        userRecord.user.sendEmailVerification().then(result => {

          // Hide Loader
          this.ui.hideLoading();

          // Success Message
          this.alert.showCustomMessage('Success', 'A confirmation email has been sent, please verify your address before login.');

          // Redirect
          this.router.navigateByUrl('/login');

        }).catch(error => {
          this.ui.hideLoading();
          this.alert.showErrorMessage(error);
        });

      }).catch(error => {
        this.ui.hideLoading();
        this.alert.showErrorMessage(error);
      });

    }, error => {

      this.ui.hideLoading();

      if (error.error.error && error.error.error.message) {
        this.alert.showErrorMessage(error.error.error.message);
      } else if (error.error.error) {
        this.alert.showErrorMessage(error.error.error);
      } else {
        this.alert.showErrorMessage(error.error);
      }

    });

  }

  login(user: User) {

    this.ui.showLoading();

    // Sdac API Login
    this.http.post(this.url + 'login', user).subscribe((response: any) => {

      this.afAuth.auth.setPersistence('session').then(() => {

        this.afAuth.auth.signInWithCustomToken(response.token).then(authUser => {

          const auth = this;

          // Get Invite Key
          this.afs.collection('keys').doc('invite').ref.get().then(function (keyDoc) {

            // Get user Informations & Update it in client
            auth.userService.getUser(authUser.user.uid).subscribe((res: User) => {

              // Set User
              auth.user = new User(res.id, res.username, res.email, res.key, res.roles);
              // auth.user.createdAt = firestore.Timestamp.now();
              auth.user.encryptPassword(user.password);

              // if (key && key !== '') {
              //   if (key === keyDoc.data().key) {
              //     auth.user.roles.management = true;
              //   }
              // }

              auth.user$ = Observable.of(auth.user);
              auth.userService.updateUser(auth.user).subscribe((usr: User) => {

                // Redirect
                auth.ui.hideLoading();
                auth.router.navigateByUrl('/');

              }, error => {
                auth.ui.hideLoading();
                auth.alert.showErrorMessage(error);
              });

            });

          }).catch(function (error) {
            console.log('Error getting document:', error);
          });

        }).catch(error => {
          this.ui.hideLoading();
          this.alert.showErrorMessage(error);
        });

      }).catch(error => {
        this.ui.hideLoading();
        this.alert.showErrorMessage(error);
      });

    }, error => {

      this.ui.hideLoading();

      if (error.error.error && error.error.error.message) {
        this.alert.showErrorMessage(error.error.error.message);
      } else if (error.error.error) {
        this.alert.showErrorMessage(error.error.error);
      } else {
        this.alert.showErrorMessage(error.error);
      }

    });

  }

  email(email: string) {

    this.ui.showLoading();

    // Sdac API Resend Email
    this.http.post(this.url + 'email', {email: email}).subscribe((response: any) => {

      // Firebase Login
      this.afAuth.auth.signInWithCustomToken(response.token).then((userRecord) => {

        // Email Verification
        userRecord.user.sendEmailVerification().then(result => {

          // Hide Loader
          this.ui.hideLoading();

          // Success Message
          this.alert.showCustomMessage('Success', 'A confirmation email has been sent, please verify your address before login.');

          // Redirect
          this.router.navigateByUrl('/login');

        }).catch(error => {
          this.ui.hideLoading();
          this.alert.showErrorMessage(error);
        });

      }).catch(error => {
        this.ui.hideLoading();
        this.alert.showErrorMessage(error);
      });

    }, error => {

      this.ui.hideLoading();

      if (error.error.error && error.error.error.message) {
        this.alert.showErrorMessage(error.error.error.message);
      } else if (error.error.error) {
        this.alert.showErrorMessage(error.error.error);
      } else {
        this.alert.showErrorMessage(error.error);
      }

    });

  }

  logout() {

    // Reset Session
    this.afAuth.auth.signOut().then(result => {

      // Reset Session
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('password');

      // Reset User
      this.user$ = Observable.of(null);
      this.user = new User();

      // Redirect
      this.router.navigateByUrl('/login');

    });

  }

  // region Roles

  isUser(user: User): boolean {
    const allowed = ['admin', 'management', 'user'];
    return this.checkAuthorization(user, allowed);
  }

  isManagement(user: User): boolean {
    const allowed = ['admin', 'management'];
    return this.checkAuthorization(user, allowed);
  }

  isAdmin(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {

    if (!user || !user.id) {
      return false;
    }

    for (const role of allowedRoles) {
      if (user && user.roles && user.roles[role]) {
        if (user.roles[role]) {
          return true;
        }
      }
    }

    return false;
  }

  updateRole(key: string) {

    this.ui.showLoading();

          const auth = this;
          const alert = this.alert;

          // Get Invite Key
          this.afs.collection('keys').doc('invite').ref.get().then(function (keyDoc) {

            // Get user Informations & Update it in client
            auth.userService.getUser(auth.user.id).subscribe((res: User) => {

              // if (key && key !== '') {
                if (key === keyDoc.data().key) {
                  auth.user.roles.management = true;
                  auth.user.roles.user = false;
                  auth.user$ = Observable.of(auth.user);
                  auth.userService.updateUser(auth.user).subscribe((usr: User) => {
                  
                
                // Redirect
                // auth.ui.hideLoading();
                auth.router.navigateByUrl('/post-content');
              });
              // this.alert.showCustomMessage('Success!', 'Your invitation key has been validated.');    
            } else {
              
              alert.showCustomMessage('Invalid Invitation Key', 'Please enter a valid invitation key.');
              // auth.ui.hideLoading();
            }
            });
            auth.ui.hideLoading();
          });
        }


  // endregion

  // region SDAC

  setSocket() {
    sdac.config.set('websocket', 'wss://api.muse.blckchnd.com');
  }

  getPrivateKeys(username, password): Promise<void | SdacKeys> {

    // Set Socket
    this.setSocket();

    // Get Keys
    return new Promise<SdacKeys>(function (resolve, reject) {

      const keys = sdac.auth.getPrivateKeys(username, password, ['owner', 'active', 'basic', 'memo']);

      if (!keys) {
        reject('Failed to load keys.');
      }

      resolve(keys);

    }).catch((err) => {
      this.alert.showErrorMessage('getPrivateKeys(): ' + err);
    });

  }

  updateAccountKeys(username, password, newPassword): Promise<void | boolean> {
    return this.getPrivateKeys(username, newPassword).then((keys: SdacKeys) => {
      const that = this;
      const user = this.user;
      const alert = this.alert;
      this.setSocket();

      new Promise<boolean>(function (resolve, reject) {
          sdac.updateAccountKeys(username, password, keys.ownerPubkey, keys.activePubkey, keys.basicPubkey, keys.memoPubkey, (code, message) => {
          if (code === 0) {
            user.encryptPassword(newPassword);
            that.userService.updateUser(user).subscribe(usr => {
              alert.showCustomMessage('Password Changed!', 'Your password has been successfully changed.'); // TODO: Set messages in a resource file
              resolve(true);
            });

          } else {
            reject(message);
          }

        });

      }).catch((err) => {
        this.alert.showErrorMessage('updateAccountKeys(): ' + err);
      });

    });

  }

  // endregion

}
