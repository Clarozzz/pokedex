import { Component } from '@angular/core';
import { RegisterForm } from "../../components/register/register-form/register-form";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RegisterForm],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {}
