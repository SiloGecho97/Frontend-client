import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthenticationService } from '@app/_services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  routing: boolean;
  title: any;
  opened: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.routing = true;
          window.scrollTo(0, 0);
          break;
        }
        case event instanceof NavigationEnd: {
          this.title = this.route.snapshot.firstChild.data.title;
        }
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.routing = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {}

  logout() {
    this.authenticationService.logout();
  }

  toggleSidenav() {
    this.opened = !this.opened;
  }

}
