import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { UserService } from '@app/_services/user.service';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MatOptionModule } from "@angular/material/core";
import { AppDateAdapter, APP_DATE_FORMATS } from '@app/_helpers/formate-datepicker';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [UserComponent, MessagesComponent, PageHeaderComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatMenuModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatNativeDateModule

  ],
  providers: [
    [UserService],
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class UserModule { }
