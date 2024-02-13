import {Component, OnInit} from '@angular/core';
import {SecuredAdminService} from "../../service/secured-admin/secured-admin.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  getResponse: string = "";

  constructor(private securedAdmin: SecuredAdminService) {
  }

  ngOnInit(): void {
    this.securedAdmin.securedAdminWithGet().subscribe(
      value => {
        this.getResponse = value["message"];
      }
    );
  }
}
