import {Component} from '@angular/core';
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {User} from "../../model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private auth: AuthenticationService,
              private router: Router,) {
  }

  login() {
    let user: User = {
      username: this.username,
      password: this.password,
      role: null,
      permissions: null
    };

    this.auth.login(user).subscribe(
      (value) => {
        console.log(value);
        localStorage.setItem("access-token", value["access-token"]);
        localStorage.setItem("token-expiration", value["token-expiration"])
        localStorage.setItem("refresh-token", value["refresh-token"]);

        this.router.navigate(["/home"]);
      }
    );
  }
}
