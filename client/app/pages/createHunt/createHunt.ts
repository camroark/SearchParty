import {Page, NavController, NavParams, LocalStorage, Storage} from 'ionic-angular';
import {TaskPage} from '../tasks/tasks';
import {ConnectionBackend, HTTP_PROVIDERS} from 'angular2/http';
import {TemplateService} from '../../services/template/template-service';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http, Headers} from 'angular2/http';

@Page({
  templateUrl: 'build/pages/createHunt/createHunt.html',
  providers: [
    ConnectionBackend,
    HTTP_PROVIDERS,
    TemplateService
  ],
  directives: [FORM_DIRECTIVES]
})
export class CreateHuntPage {
  local: Storage = new Storage(LocalStorage);
  userLng: number;
  userLat: number;
  userInfo: {};
  geolocation: {};
  data: any;
  businesses: any;
  tasks: any;
  huntID: any;
  selectedItem: any;
  taskNumber: number;
  nameHunt: any;
  name: string;
  requiredInfo: boolean;
  
  constructor(private nav: NavController, navParams: NavParams, private templateService: TemplateService) {
    this.selectedItem = navParams.get('item');
    this.taskNumber;
    this.name;
    this.requiredInfo = false;
    if (localStorage.userLat && localStorage.userLng) {
      this.userLat = localStorage.userLat;
      this.userLng = localStorage.userLng;
    } else {
      if (navigator.geolocation) {
        console.log("getting geolocation")
        navigator.geolocation.watchPosition((position => {
          this.userLat = position.coords.latitude;
          this.userLng = position.coords.longitude;
          this.local.set('userLat', position.coords.latitude);
          this.local.set('userLng', position.coords.longitude);
        }), (error => console.error(error)), {});
      }
    }
}
   nameHunt(event, name) {
      if(name && this.taskNumber) {
         // this.name = name;
         // this.taskNumber = num;
         console.log('Event: ', event);
         console.log("name:" + name);
         this.itemTapped(name, taskNumber);
      } else {
         console.log('Name: ', name);
         console.log('Num: ', num);
         this.requiredInfo = true;
      }
   }

   itemTapped(name, taskNumber) {
     console.log('sending hunt creation info to server...', name);
     this.userInfo = localStorage;
     localStorage.startTimeUnix = Date.now();
     localStorage.startTime = new Date().toLocaleTimeString()
     this.templateService.postData(name, this.userInfo)
       .then(data => {
        this.nav.setRoot(TaskPage, {
           locAddress: data.businesses.location.display_address[0] + ', ' + data.businesses.location.display_address[2],
           huntID: data.huntID,
           currChallenge: data.tasks.content,
           locLat: data.businesses.location.coordinate.latitude,
           locLng: data.businesses.location.coordinate.longitude,
           locName: data.businesses.name,
           previousPlaces: [data.businesses],
           previousTasks: [data.tasks]
        });
       })
        .catch(error => console.error(error));
   }
}