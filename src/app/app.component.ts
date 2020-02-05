import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthenticationService } from './_services';
import './_content/app.less';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    constructor(
        private renderer: Renderer2,
        private router: Router,
        private authenticationService: AuthenticationService
        ) {
            
        }
        ngAfterViewInit() {
            let loader = this.renderer.selectRootElement('#loader');
            loader.style.display = "none";
          }
        public isMenuCollapsed = true;
        isLoggedIn()
        {
            return this.authenticationService.getToken();
        }
        
        logout() {
            this.authenticationService.logout();
            this.router.navigate(['/login']);
        }
    }
    