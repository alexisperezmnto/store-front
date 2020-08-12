import { Component, OnInit } from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'fast-shopping';
  constructor(private router: Router) { }
  
  ngOnInit() {
    this.loadScript('../assets/vendor/jquery/jquery-3.2.1.min.js');
    this.loadScript('../assets/vendor/bootstrap/js/popper.js');
    this.loadScript('../assets/vendor/bootstrap/js/bootstrap.min.js');
    this.loadScript('../assets/js/main.js');
    
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
    
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}

