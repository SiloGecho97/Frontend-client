import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageResolverService } from '@app/_services/message-resolver.service';


const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [
      { path: "", redirectTo: "messages", pathMatch: "full" },
      {
        // canActivate: [UserGuard],
        path: "messages",
        component: MessagesComponent,
        data: { title: "Messages" },
        resolve: { data: MessageResolverService },
      },
      { path: "**", redirectTo: "messages", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
