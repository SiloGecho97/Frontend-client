import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() title: string;
  @Output() logoutClicked = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  logout() {
    this.logoutClicked.emit();
  }

}
