import {Component} from '@angular/core';
import {NavController, ToastController, MenuController, LoadingController} from 'ionic-angular';

import {TranslateService} from 'ng2-translate/ng2-translate';

import {MainPage} from '../../pages/pages';
import {User} from '../../providers/user';
import {ResetPasswordPage} from '../reset-password/reset-password'
import {SignupPage} from '../signup/signup'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {email: string, password: string} = {
    email: '',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
              public user: User,
              public toastCtrl: ToastController,
              public menu: MenuController,
              public loadingCtrl: LoadingController,
              public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
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

  // Attempt to login in through our User service
  doLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    loading.present();
    this.user.login(this.account)
      .then((value) => {
        this.account = {
          email: '',
          password: ''
        };
        this.navCtrl.push(MainPage)
      }, (error) => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      })
  }

  resetPassword() {
    this.navCtrl.setRoot(ResetPasswordPage);
  }

  signUp() {
    this.navCtrl.setRoot(SignupPage);
  }
}
