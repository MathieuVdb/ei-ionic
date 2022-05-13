import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { AuthenticationService } from 'src/app/utils/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm: FormGroup;
  view = 'login'; 
  isBiometricAvailable: boolean;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationService.isBiometricAvailable().then(b => this.isBiometricAvailable = b);
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.minLength(3), Validators.required]),
    });
    this.authenticationService.loginBiometric().subscribe();
  }

  reset() {
    this.userForm.reset();
  }

  handleSubmit() {
    if(this.userForm.valid) {
      (this.view === 'login') ? this.authenticate() : this.register();
    }
  }

  authenticate() { 
    this.authenticationService.login(this.userForm.value).subscribe(); 
  }

  register() {  
    this.authenticationService.register(this.userForm.value).subscribe(); 
  }

  bioLogin() {
    this.authenticationService.loginBiometric().subscribe();
  }

}
