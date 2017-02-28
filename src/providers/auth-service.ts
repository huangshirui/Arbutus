import {Injectable} from '@angular/core';
import {AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods, AngularFire} from 'angularfire2';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;
  private firebase;

  constructor(public auth$: AngularFireAuth, public af: AngularFire) {
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  signInWithPassword(accountInfo: any): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
        email: accountInfo.email,
        password: accountInfo.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      });
  }

  signOut(): void {
    this.auth$.logout();
  }

  signUp(accountInfo: any): firebase.Promise<FirebaseAuthState> {
    return this.auth$.createUser({
      email: accountInfo.email,
      password: accountInfo.password
    });
  }

  resetPassword(email: string): firebase.Promise<FirebaseAuthState> {
    return this.firebase.auth().sendPasswordResetEmail(email);
  }

  displayName(): string {
    if (this.authState != null) {
      return this.authState.facebook.displayName;
    } else {
      return '';
    }
  }
}
