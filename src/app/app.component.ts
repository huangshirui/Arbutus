import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, Config} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {Settings} from '../providers/providers';

import {FirstRunPage} from '../pages/pages';
import {CardsPage} from '../pages/cards/cards';
import {ContentPage} from '../pages/content/content';
import {LoginPage} from '../pages/login/login';
import {MapPage} from '../pages/map/map';
import {SignupPage} from '../pages/signup/signup';
import {TabsPage} from '../pages/tabs/tabs';
import {TutorialPage} from '../pages/tutorial/tutorial';
import {WelcomePage} from '../pages/welcome/welcome';
import {ListMasterPage} from '../pages/list-master/list-master';
import {MenuPage} from '../pages/menu/menu';
import {SettingsPage} from '../pages/settings/settings';
import {NotificationsPage} from '../pages/notifications/notifications';

import {TranslateService} from 'ng2-translate/ng2-translate';

declare var FCMPlugin;
@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Pages</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    {title: 'Tutorial', component: TutorialPage},
    {title: 'Welcome', component: WelcomePage},
    {title: 'Tabs', component: TabsPage},
    {title: 'Cards', component: CardsPage},
    {title: 'Content', component: ContentPage},
    {title: 'Login', component: LoginPage},
    {title: 'Signup', component: SignupPage},
    {title: 'Map', component: MapPage},
    {title: 'Master Detail', component: ListMasterPage},
    {title: 'Menu', component: MenuPage},
    {title: 'Settings', component: SettingsPage},
    {title: 'Search', component: NotificationsPage}
  ]

  constructor(translate: TranslateService,
              platform: Platform,
              settings: Settings,
              config: Config) {
    // Set the default language for translation strings, and the current language.
    translate.setDefaultLang('en');
    translate.use('en');

    translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      // Check if Cordova/Mobile
      if (platform.is('cordova')) {
        // Firebase FCM
        FCMPlugin.getToken(
          function (token) {
            console.log(token);
            alert(token);
          },
          function (err) {
            console.log('error retrieving token: ' + err);
          }
        );

        FCMPlugin.onNotification(
          function(data){
            if(data.wasTapped){
              //Notification was received on device tray and tapped by the user.
              alert( JSON.stringify(data) );
            }else{
              //Notification was received in foreground. Maybe the user needs to be notified.
              alert( JSON.stringify(data) );
            }
          },
          function(msg){
            console.log('onNotification callback successfully registered: ' + msg);
          },
          function(err){
            console.log('Error registering onNotification callback: ' + err);
          }
        );
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
