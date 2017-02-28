import {Component} from '@angular/core';
import {NavController, ToastController, MenuController, LoadingController} from 'ionic-angular';

import {TranslateService} from 'ng2-translate/ng2-translate';

import {MainPage} from '../../pages/pages';
import {User} from '../../providers/user';
import {LoginPage} from "../login/login";

/*
 Generated class for the Signup page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {name: string, email: string, password: string} = {
    name: '',
    email: '',
    password: ''
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
              public user: User,
              public toastCtrl: ToastController,
              public menu: MenuController,
              public loadingCtrl: LoadingController,
              public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  doSignup() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
    // Attempt to login in through our User service
    this.user.signup(this.account)
      .then((value) => {
        this.navCtrl.push(MainPage);
      }, (error) => {
        loading.dismiss();
        // Unable to sign up
        let toast = this.toastCtrl.create({
          message: this.signupErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
  }
}
