import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage, LocalStorage, NavController} from "ionic-angular";

/*
  Generated class for the MyService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MyService {
  public local : Storage;
  private mydata: any;
  public getsession : any; 

  constructor(private http: Http, private navCtrl : NavController ) {
    this.local = new Storage(LocalStorage)
  }

  postLogin(data){
   let link = "http://textkhmer.com/api/securelogin.php";
     return this.http.post(link,data)
      .map(res => res.json())
  }
  
  checkToken(){
     return this.getsession =this.local.get('token');
  }

  getData(){
    let link ="http://textkhmer.com/api/select.php";
    return this.http.get(link)
        .map(res => res.json())
  }
  postInsert(data){
    let link ="http://textkhmer.com/api/insert.php";
    return this.http.post(link , data)
        .map(res => res.json())
  }
  postUpdate(data){
    let link ="http://textkhmer.com/api/update.php";
    return this.http.post(link , data)
        .map(res => res.json())
  }
  postDelete(data){
    let link ="http://textkhmer.com/api/delete.php";
    return this.http.post(link , data)
        .map(res => res.json())
  }



}

