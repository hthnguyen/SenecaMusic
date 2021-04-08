import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterUser } from '../RegisterUser';
import { AuthService } from '../auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser;
  loading: Boolean = false;
  warning;
  success: Boolean = false;
  private registerSub;
  constructor(private auth: AuthService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Register');
    this.registerUser = new RegisterUser();
  }

  onSubmit(f: NgForm) {
   // f.valid ? console.log('Data: ', this.registerUser) : console.log("INVALID");
    if (f.valid) {
      this.loading = true;
      this.registerSub = this.auth.register(this.registerUser).subscribe(
        (success) => {
          //console.log(success)
          this.success = true;
          this.warning = null;
          this.loading = false;
        },
        (err) => {
          // console.log(this.warning + "warning")
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    }
  }
}
