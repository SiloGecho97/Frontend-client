import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {


  constructor(private authenticationService: AuthenticationService,) { }

  ngOnInit(): void {
  }

}
