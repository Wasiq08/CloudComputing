import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UIService } from './core/services/ui/ui.service';
import { RoutingInfoService } from './core/services/routInfo/route.info.service';
import { IAuthService } from './core/services/auth/iauth.service';
import { UserService } from './core/services/user/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoggedIn = false;

  constructor(
    private _router: Router,
    private _uiService: UIService,
    // public message: MessagingService,
    private _userService: UserService,
    private _routingInfo: RoutingInfoService,
    @Inject('IAuthService') private _authService: IAuthService,
  ) {
  }

  ngOnInit(): void {
    // this._uiService.initCaptions();

    // this._messaging.getPermission();

    // this._uiService.getProfile();

    // this._routingInfo.init(); // init public navigation

    // get loggedin status
    this.isLoggedIn = this._authService.isLoggedIn();

    console.log("test in app login", this.isLoggedIn)
    if (this.isLoggedIn) {

      this._userService.getStatus().subscribe(
        (res) => {
          // console.log("res", res);
        },
        (err) => {
          // console.log('err', err);
        }
      );
    }

    // get updates
    this._authService.loginStatusChanged.subscribe(
      (user) => {
        this.isLoggedIn = this._authService.isLoggedIn();
        console.log("ABC login", this.isLoggedIn);

      }
    );

    this._router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
