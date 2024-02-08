import {Component, OnInit} from '@angular/core';
import {SecuredService} from "../../service/secured/secured.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  welcome: string = "";
  constructor(private secured: SecuredService) {
  }

  ngOnInit(): void {
    this.secured.secured().subscribe(
      value => {
        this.welcome = value["message"];
      }
    );
  }

}
