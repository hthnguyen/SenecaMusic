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
