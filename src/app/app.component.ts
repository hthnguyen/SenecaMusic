/*********************************************************************************
*  WEB422 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Hoang Trung Hieu Nguyen     Student ID: 142914191     Date: 2021-04-08
*
*  Online Link to Music App: https://hthnguyen-spotify-api.netlify.app/
*
*  Online Link to User Api: https://api-seneca-music.herokuapp.com/api/user
*
********************************************************************************/ 


import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavigationStart, Router , Event} from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{
  searchString: string;
  title = 'Seneca Music';
  public token: any;

  constructor(private router: Router, private auth:AuthService) { }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
  }

  handleSearch() {
    this.router.navigate(['/search'], {
      queryParams: {
        q: `${this.searchString}`
      }
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
