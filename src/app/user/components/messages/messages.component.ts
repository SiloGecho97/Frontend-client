import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import * as moment from "moment";
import { UserService } from '@app/_services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  phoneNumber = "";
  date = "";
  message: "";
  searchForm: FormGroup;
  displayedColumns: string[] = [
    "phoneNumber",
    "shortCode",
    "message",
    "type",
    "receivedDate",
  ];
  dataSource = [];
  count;
  page = 0;
  pageSize = 10;
  loading: boolean;
  newRowIndex: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.searchForm = this.formBuilder.group({
      message: [""],
      phoneNumber: [""],
      date: [""],
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.page = parseInt(params.get("page")) - 1 || 0;
      this.pageSize = parseInt(params.get("pageSize")) || 5;
      this.searchForm.controls["message"].setValue(params.get("message") || "");
      this.searchForm.controls["phoneNumber"].setValue(
        params.get("phoneNumber") || ""
      );
      this.searchForm.controls["date"].setValue(params.get("date") || "");
      this.getMessages({ pageIndex: this.page, pageSize: this.pageSize });
      // console.log(params);
    });
    this.route.data.subscribe((response) => {
      console.log(response)
      this.dataSource = response.data.message.rows;
      this.count = response.data.message.count;
    });
  }

  getMessages({ pageIndex, pageSize }) {
    this.page = pageIndex;
    this.pageSize = pageSize;
    let sObj = { page: pageIndex, pageSize, ...this.searchForm.value };
    sObj["date"] = sObj["date"]
      ? moment(sObj["date"]).format("YYYY-MM-DD")
      : "";
    this.userService
      .getUserMessages(sObj)
      .subscribe((messages: { message: any }) => {
        this.count = messages.message.count;
        this.dataSource = messages.message.rows;
      });
  }
  refresh() {
    this.loading = true;
    this.newRowIndex = 0;
    this.route.queryParamMap.subscribe((params) => {
      this.page = parseInt(params.get("page")) - 1 || 0;
      this.pageSize = parseInt(params.get("pageSize")) || 10;
      this.searchForm.controls["message"].setValue(params.get("message") || "");
      this.searchForm.controls["phoneNumber"].setValue(
        params.get("phoneNumber") || ""
      );
      this.searchForm.controls["date"].setValue(params.get("date") || "");
      this.getMessages({ pageIndex: this.page, pageSize: this.pageSize });
    });
  }

  setUrlValues(sObj) {
    let keys = Object.keys(sObj);
    let pObj = {};
    keys.map((key) => {
      if (key != "page") {
        pObj[key] = sObj[key];
      }
      if (key == "page") {
        pObj[key] = (sObj[key] || 0) + 1;
      }
    });
    const queryParams: Params = {
      ...pObj,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: "merge",
    });
  }

  onSubmit() {
    this.page = 0;
    let sObj = {
      page: this.page,
      pageSize: this.pageSize,
      ...this.searchForm.value,
    };
    sObj["date"] = sObj["date"]
      ? moment(sObj["date"]).format("YYYY-MM-DD")
      : "";
    this.setUrlValues(sObj);
    // this.getMessages({ pageSize: this.pageSize, pageIndex: 0 });
  }

  pageChange({ pageIndex, pageSize }) {
    let sObj = {
      page: pageIndex,
      pageSize: pageSize,
      ...this.searchForm.value,
    };
    sObj["date"] = sObj["date"]
      ? moment(sObj["date"]).format("YYYY-MM-DD")
      : "";
    this.setUrlValues(sObj);
  }

}
