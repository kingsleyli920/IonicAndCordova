import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { User } from '../../shared/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  user: User = {
    username: '',
    password:''
  }
  constructor(public modalCtrl: ModalController, 
    public platform: Platform,
    private formBuilder: FormBuilder,
    private storage: Storage) { 
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        remember: true
      });

      storage.get('user').then(user => {
        if (user) {
          this.user = user;
          this.loginForm.patchValue({
            'username': this.user.username,
            'password': this.user.password
          })
        } else {
          console.log('user not defined');
        }
      });
    }
  ngOnInit() {
  }


  dismiss() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;
    if (this.loginForm.get('remember').value) {
      this.storage.set('user', this.user);
    } else {
      this.storage.remove('user');
    }
    this.modalCtrl.dismiss();
  }

}
