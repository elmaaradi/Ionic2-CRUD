import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Admin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class Admin {
data : any;
constructor(public navCtrl: NavController) {

  this.data = {};
  this.data.title = "";
  this.data.desc = "";
  }

}
