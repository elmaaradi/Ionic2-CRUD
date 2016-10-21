import { Component } from '@angular/core';
import {NavController, ModalController, Storage, LocalStorage, ToastController, NavParams } from 'ionic-angular';
import {ModalPagePage} from "../modal-page/modal-page";
import {Page1} from "../page1/page1";
import {MyService} from "../../providers/my-service/my-service";

/*
  Generated class for the AdminPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/admin/admin.html',
  providers : [MyService]
})
export class AdminPage {
  data : any;
  public getsession : any;
  public name : any;
  x : any;
  id : any;
  title : any;
  desc : any;
  check : any;
  public local: Storage;
  constructor(private navCtrl: NavController, private modalCtrl : ModalController, private service : MyService, private toastCtrl : ToastController, private navParam :NavParams) {
    this.data = {};
    this.local = new Storage(LocalStorage);
    this.id = navParam.get('id');
    this.title = navParam.get('title');
    this.desc = navParam.get('desc');
    this.check = navParam.get('check');
    console.log(this.id);

  }


  ionViewWillEnter(){
    this.service.checkToken().then((key)=>{
      this.x = key;
      if( this.x == null){
        let modal = this.modalCtrl.create(ModalPagePage);
        modal.present();
        this.navCtrl.setRoot(Page1);
      }else{
        this.name =this.local.get('username');
        this.name.then((value)=>{
          this.name = value;
        });
      }
    })
    this.fillData();
  }

  fillData(){
    if(this.id !== 'undefined'){
      this.data.title = this.title;
      this.data.desc = this.desc;
      this.data.check = this.check;
    }else{
      this.data.title = "";
      this.data.desc = "";
    }
  }
  insert(){
    let title = this.data.title;
    let description = this.data.desc;
    let check = this.data.check;
    let data = JSON.stringify({title, description});
      this.service.postInsert(data)
          .subscribe(data =>{
            console.log(data);
            let toast = this.toastCtrl.create({
              message: 'Data Inserted successfully',
              duration: 2000
            });
            toast.present();
            this.data.title = "";
            this.data.desc = "";
          }, err=>{
            console.log(err);
          })
  }

  update(){
    let title = this.data.title;
    let description = this.data.desc;
    let id = this.id;
    let check = this.data.check;
    let data = JSON.stringify({id,title, description});
    this.service.postUpdate(data)
        .subscribe(data =>{
          console.log(data);
          let toast = this.toastCtrl.create({
            message: 'Data Updated successfully',
            duration: 2000
          });
          toast.present();
          this.navCtrl.setRoot(Page1);
        }, err=>{
          console.log(err);
        })
  }

}
