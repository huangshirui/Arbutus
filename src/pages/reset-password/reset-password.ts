import {Component} from '@angular/core';
import {NavController, NavParams, MenuController} from 'ionic-angular';

import {LoginPage} from '../login/login'

/*
 Generated class for the ResetPassword page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {

  account: {email: string} = {
    email: ''
  };

  constructor(public navCtrl: NavController,
              public menu: MenuController,
              public navParams: NavParams) {
  }


  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  doResetPassword() {

  }

  login() {
    this.navCtrl.setRoot(LoginPage);
  }

}
