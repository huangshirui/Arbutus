import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {ItemDetailPage} from '../item-detail/item-detail';
import {Items} from '../../providers/providers';
import {Item} from '../../models/item';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  currentItems: Item[];

  constructor(public navCtrl: NavController, public items: Items) {
    this.currentItems = this.items.query();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

}
