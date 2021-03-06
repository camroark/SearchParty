//import {Page} from 'ionic-angular';
import {Page, Storage, LocalStorage, NavController, NavParams} from 'ionic-angular';
import {TemplatePage} from '../templates/templates';
import {Http, Headers} from 'angular2/http';
import {FORM_DIRECTIVES} from 'angular2/common';
import {JwtHelper} from 'angular2-jwt';
import {AuthService} from '../../services/auth/auth-service';
import 'rxjs/add/operator/map';

@Page({
  templateUrl: 'build/pages/users/log-in.html',
  directives: [FORM_DIRECTIVES]
})

export class LogIn {
  LOGIN_URL: string = 'https://getsearchparty.com/signin'; 
  SIGNUP_URL: string = 'https://getsearchparty.com/signup';
  authType: string = 'login';
  contentHeader: Headers = new Headers({'Content-Type': 'application/json'});
  error: string;
  jwtHelper: JwtHelper = new JwtHelper();
  local: Storage = new Storage(LocalStorage);
  user: string;

  constructor(private http: Http, private nav: NavController, navParams: NavParams, private auth: AuthService) {
    let token = this.local.get('id_token')._result;
    if(token) {
      this.user = this.jwtHelper.decodeToken(token).username;
    }
  }

  getCoords(){
    navigator.geolocation.getCurrentPosition(position => {
        this.local.set('userLat', position.coords.latitude)
        this.local.set('userLng', position.coords.longitude)
      })
  }

  login(credentials) {
      this.http.post(this.LOGIN_URL, JSON.stringify(credentials), { headers: this.contentHeader })
        .map(res => res.json())
        .subscribe(
          data => {
            this.getCoords()
            this.loadTemplates();
            this.authSuccess(data.token);
            console.log('success');
                },
          err => {
            this.error = err;
            console.log(this.error);
          }
        );
    }

  signup(credentials) {
     this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.contentHeader })
        .map(res => res.json())
        .subscribe(
          data => {
                   this.getCoords();
                   this.authSuccess(data.token);
                   this.loadTemplates();
                 },
          err => this.error = err
        );
    }

  logout() {
    this.local.remove('id_token');
    this.local.remove('userLat');
    this.local.remove('userLng');
    this.user = null;
  }

  authSuccess(token) {
    this.error = null;
    this.local.set('id_token', token);
    this.user = this.jwtHelper.decodeToken(token).username;
    console.log(this.user);
  }

  loadTemplates() {
    this.nav.setRoot(TemplatePage)
  }

}
