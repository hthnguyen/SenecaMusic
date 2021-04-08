import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { User } from '../User'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User
  loading: Boolean = false
  warning
  constructor(private auth: AuthService, private router:Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Login');
    this.user = new User()
    //console.log(this.user._id , " " , this.user.userName)
  }

  onSubmit(f: NgForm): void {
    this.loading = true
    this.auth.login(this.user).subscribe(
      (success) =>{
        this.loading = false
        localStorage.setItem('access_token', success.token)
        this.router.navigate(['/newReleases'])
        //console.log(success.token)
      },
      (err)=>{
        this.loading = false
        this.warning = err.error.message;       
      }
    )
  }

}
