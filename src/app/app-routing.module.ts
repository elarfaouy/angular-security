import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthenticateGuard} from "./guards/authenticate/authenticate.guard";
import {hasRightAuthorityGuard} from "./guards/has-right-authority/has-right-authority.guard";
import {ProfileComponent} from "./components/profile/profile.component";
import {userDataResolver} from "./resolver/user-data/user-data.resolver";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "home", component: HomeComponent, canActivate: [AuthenticateGuard, hasRightAuthorityGuard], data: {role: "USER"}},
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthenticateGuard, hasRightAuthorityGuard], data: {role: "ADMIN"}},
  {path: "profile", component: ProfileComponent, canActivate: [AuthenticateGuard], resolve: {userData: userDataResolver}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
