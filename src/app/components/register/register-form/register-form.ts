import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    hobby: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    dui: new FormControl({ value: '', disabled: true })
  })

  imagePreview = signal<string | null>(null);
  fileName = signal<string | null>(null);
  maxDate = signal<string>('');

  ngOnInit() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.maxDate.set(`${year}-${month}-${day}`);

    this.loadUserData()
  }

  private loadUserData() {
    const savedData = localStorage.getItem('user_data');
    if (savedData) {
      const data = JSON.parse(savedData);

      this.userForm.patchValue({
        name: data.name,
        hobby: data.hobby,
        birthdate: data.birthdate
      });

      if (data.birthdate) {
        this.validateAge(data.birthdate);

        if (data.dui) {
          this.userForm.get('dui')?.setValue(data.dui);
        }
      }

      if (data.profileImage) {
        this.imagePreview.set(data.profileImage);
        this.fileName.set(data.fileName || 'Foto de perfil');
      }
    }
  }

  constructor(private router: Router) {
    this.userForm.get('birthdate')?.valueChanges.subscribe(value => {
      if (value) this.validateAge(value);
    });
  }

  private validateAge(birthdateValue: string) {
    const birthdate = new Date(birthdateValue + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (birthdate > today) {
      this.userForm.get('birthdate')?.setErrors({ futureDate: true });
      this.userForm.get('dui')?.disable();
      return;
    }

    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }

    const duiControl = this.userForm.get('dui');

    if (age >= 18) {
      duiControl?.enable();
      duiControl?.setValidators([Validators.required, Validators.pattern(/^\d{8}-\d{1}$/)]);
    } else {
      duiControl?.disable();
      duiControl?.clearValidators();
      duiControl?.setValue('');
    }
    duiControl?.updateValueAndValidity();
  }

  hobbyOptions = [
    'Jugar Fútbol', 'Jugar Basquetball', 'Jugar Tennis',
    'Jugar Voleibol', 'Jugar Fifa', 'Jugar Videojuegos'
  ];

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName.set(file.name)
      const reader = new FileReader();
      reader.onload = () => this.imagePreview.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  clearImage(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.imagePreview.set(null);
    this.fileName.set(null)
  }

  isFormValid() {
    return this.userForm.invalid || !this.imagePreview()
  }

  formatDUI(event: any) {
    let value = event.target.value.replace(/\D/g, '')

    if (value.length > 9) {
      value = value.substring(0, 9)
    }

    if (value.length > 8) {
      value = value.substring(0, 8) + '-' + value.substring(8)
    }

    this.userForm.get('dui')?.setValue(value, { emitEvent: false })
  }

  onSubmit() {
    if (this.userForm.valid && this.imagePreview()) {
      const birthdateValue = this.userForm.get('birthdate')?.value

      const birthdate = new Date(birthdateValue!);
      const today = new Date();
      let age = today.getFullYear() - birthdate.getFullYear();

      const userData = {
        ...this.userForm.getRawValue(),
        age: age,
        profileImage: this.imagePreview(),
        fileName: this.fileName()
      };

      localStorage.setItem('user_data', JSON.stringify(userData))

      this.router.navigate(['/select-pokemons'])

    } else {
      console.error('Invalid data');
    }
  }
}
