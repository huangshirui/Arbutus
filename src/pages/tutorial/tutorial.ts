import {Component} from '@angular/core';
import {Storage} from '@ionic/storage'

import {MenuController, NavController} from 'ionic-angular';

import {LoginPage} from '../login/login'

import {TranslateService} from 'ng2-translate/ng2-translate';


export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  ver: String = "1";
  slides: Slide[];
  showSkip = true;

  constructor(public navCtrl: NavController,
              public menu: MenuController,
              public storage: Storage,
              translate: TranslateService) {
    translate.get(["TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
    ])
      .subscribe((values) => {
        console.log('Loaded values', values);
        this.slides = [
          {
            title: values.TUTORIAL_SLIDE1_TITLE,
            description: values.TUTORIAL_SLIDE1_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-1.png',
          },
          {
            title: values.TUTORIAL_SLIDE2_TITLE,
            description: values.TUTORIAL_SLIDE2_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-2.png',
          },
          {
            title: values.TUTORIAL_SLIDE3_TITLE,
            description: values.TUTORIAL_SLIDE3_DESCRIPTION,
            image: 'assets/img/ica-slidebox-img-3.png',
          }
        ];
      });
  }

  startApp() {
    this.navCtrl.setRoot(LoginPage, {}, {
      animate: true,
      direction: 'forward'
    });
    this.storage.ready().then(() => {
      this.storage.set('tutorialVersion', this.ver);
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

  ionViewWillEnter() {
    this.storage.ready().then(() => {
      this.storage.get('tutorialVersion').then((val) => {
        if (val == this.ver) {
          this.navCtrl.setRoot(LoginPage, {}, {
            animate: true,
            direction: 'forward'
          });
        }
      })
    });
  }

}
