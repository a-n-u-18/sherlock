import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements OnInit {

  failure1:boolean;
  failure1Message:string="";
  token:string="";
  constructor(private router: Router ,private activeroute: ActivatedRoute) {
    
    this.activeroute.params.subscribe(res=>{
      
     this.token=res.token;
      
    },err=>{
        this.failure1=true;
        this.failure1Message="Invalid url"
    });
    if(!this.token||this.token.toString()=='undefined')
    {
      this.failure1=true;
      this.failure1Message="Invalid url"

    }
    else{
      this.failure1=false;
      localStorage.setItem('token',this.token);
      setTimeout(() => {
        this.router.navigateByUrl('/game')
      }, 2000);
    
    }
   }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }



}
