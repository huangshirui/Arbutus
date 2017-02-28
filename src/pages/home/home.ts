import { Component } from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  location: string = "2";
  lamp: string = "3";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private popoverCtrl: PopoverController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  selectLocation(ev) {

    let popover = this.popoverCtrl.create(PopoverPage, {
    });

    popover.present({
      ev: ev
    });
  }
}

@Component({
  template: `
    <ion-list radio-group [(ngModel)]="location">
      <ion-item>
        <ion-label>汤臣一品</ion-label>
        <ion-radio value="1"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-label>翠湖天地</ion-label>
        <ion-radio value="2"></ion-radio>
      </ion-item>
    </ion-list>
  `
})
export class PopoverPage {

  constructor(private navParams: NavParams) {

  }

  ngOnInit() {
    if (this.navParams.data) {
    }
  }

}

