import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedHeaderService} from './service/shared-header.service';
import {TranslateService} from '@ngx-translate/core';
import {TokenStorageService} from './service/token-storage.service';
import {Login} from './entities/login';
import {HomepageService} from './service/homepage.service';
import {ChangePassword} from './entities/change-password';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {

  emailToResetPassword = '';
  changePassword: ChangePassword = new ChangePassword();
  isChangeSuccess = false;
  isChangeFail = false;

  homePage = true;
  info: any;
  form: any = {};
  isLoginSuccess = false;
  isLoginFailed = false;
  loginFailMess = '';
  private loginInfo: Login = new Login();

  currentComponent: string;

  constructor(private data: SharedHeaderService, private translation: TranslateService,
              private token: TokenStorageService, private homepageService: HomepageService,
              private userService: UserService) {
    translation.setDefaultLang('vn');
  }

  checkLogin() {
    if (this.token.getUsername()) {
      return true;
    }  else {
      return false;
    }
  }

  ngOnInit() {
    this.isChangeFail = false;
    this.isChangeSuccess = false;
    this.homePage = true;
    this.data.currentMessage.subscribe(message => this.currentComponent = message);
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername()
    };
  }

  letChangePassword() {
    this.changePassword.username = this.token.getUsername();

    this.userService.changePassword(this.changePassword).subscribe(data => {
      this.isChangeSuccess = true;
      this.isChangeFail = false;
      console.log(data);
    }, error1 => {
      this.isChangeSuccess = false;
      this.isChangeFail = true;
      console.log(error1);
    });

  }

  resetPassword() {
    this.homepageService.resetPassword(this.emailToResetPassword).subscribe( data => {
      console.log(data);
    }, error1 => {
      console.log(error1);
    });
  }

  homePageSelect() {
    this.homePage = true;
  }

  managerPageSelect() {
    this.homePage = false;
  }

  login() {
    this.setLoginDefault();

    this.homepageService.login(this.loginInfo).subscribe(data => {
      this.token.saveToken(data.accessToken);
      this.token.saveUsername(data.username);

      this.isLoginSuccess = true;

      this.isLoginFailed = false;
      window.location.reload();
    }, error1 => {
      this.isLoginFailed = true;
      this.loginFailMess = 'Login failed';
    });
  }

  setLoginDefault() {
    this.isLoginSuccess = false;
    this.isLoginFailed = false;
    this.loginFailMess = '';
  }


  logout() {
    this.token.signOut();
    window.location.reload();
  }

  changeToVi() {
    this.translation.setDefaultLang('vn');
  }

  changeToEn() {
    this.translation.setDefaultLang('en');
  }

}
