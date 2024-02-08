import {Component} from '@angular/core';
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private auth: AuthenticationService) {
  }

  login() {
    let user: User = {
      username: this.username,
      password: this.password,
      role: null,
    };

    this.auth.login(user).subscribe(
      (value) => {
        console.log(value["access-token"]);
        localStorage.setItem("access-token", value["access-token"]);
        localStorage.setItem("token-expiration", value["token-expiration"])
      }
    );
  }
}
