import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {MyService} from "../../providers/my-service/my-service";
import {ModalPagePage} from "../modal-page/modal-page";
import {AdminPage} from "../admin/admin";

@Component({
  templateUrl: 'build/pages/page1/page1.html',
  providers : [MyService]
})
export class Page1 {
  xs : any[];
  mytoken : any;
  constructor(public navCtrl: NavController, private service : MyService, private toastCtrl : ToastController) {
  }
  ionViewWillEnter(){
    this.loadData();
  }
  loadData(){
    this.service.getData()
        .subscribe( data => {
          this.xs = data;
        }, err=>{
          console.log(err);
        });
  }
  delete(id:number){
      this.service.checkToken().then((key)=>{
          this.mytoken = key;
          if(this.mytoken === null){
            this.navCtrl.push(ModalPagePage);
          }else{
            let data = JSON.stringify({'id':id});
            this.service.postDelete(data)
                .subscribe(data =>{
                  let toast = this.toastCtrl.create({
                    message: 'Data Deleted successfully',
                    duration: 1000,
                    position : 'bottom'
                  });
                  toast.present();
                  this.xs = data;
                }, err => {
                  console.log(err);
                })
          }
      });
  }

  update(id,title,desc){
    this.service.checkToken().then((key)=>{
      this.mytoken = key;
      if(this.mytoken === null){
        this.navCtrl.push(ModalPagePage);
      }else{
        this.navCtrl.push(AdminPage, {'id':id, 'title':title, 'desc':desc});
      }
    }); 
  }
}
