import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
  {
    path: "auth",
    // canActivate: [AuthGuard],
    data: { preload: true },
    loadChildren: () =>
      import("./auth/auth.module").then((mod) => mod.AuthModule),
  },
  {
    path: "user",
    // canActivate: [UserGuard],
    data: { preload: true,},
    loadChildren: () =>
      import("./user/user.module").then((mod) => mod.UserModule),
  },

  { path: "**", redirectTo: "/auth/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
