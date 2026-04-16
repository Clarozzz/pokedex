import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterForm } from './register-form';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('RegisterForm', () => {
  let component: RegisterForm;
  let fixture: ComponentFixture<RegisterForm>;
  let mockRouter = { navigate: vi.fn() };

  const userData = {
    name: 'Juan',
    hobby: 'Jugar Videojuegos',
    birthdate: '2006-02-02',
    age: 20,
    profileImage: 'image.jpeg',
    fileName: 'image.jpeg',
    dui: '12345678-9'
  };

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [RegisterForm, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable DUI field if use is unde 18', () => {
    const year = new Date().getFullYear() - 10;
    component.userForm.get('birthdate')?.setValue(`${year}-01-01`)

    fixture.detectChanges()

    expect(component.userForm.get('dui')?.disabled).toBe(true)
    expect(component.userForm.get('dui')?.value).toBe('')
  })

  it('should enable and require DUI if user is over 18', () => {
    const year = new Date().getFullYear() - 20;
    component.userForm.get('birthdate')?.setValue(`${year}-01-01`)

    fixture.detectChanges()

    expect(component.userForm.get('dui')?.enabled).toBe(true)

    const dui = component.userForm.get('dui')

    // Invalid value
    dui?.setValue('123')
    expect(dui?.valid).toBe(false)

    // Valid value
    dui?.setValue('12345678-9')
    expect(dui?.valid).toBe(true)
  })

  it('should load user data from localStorage on init', () => {
    localStorage.setItem('user_data', JSON.stringify(userData))

    component.ngOnInit()

    expect(component.userForm.get('name')?.value).toBe('Juan')
    expect(component.userForm.get('dui')?.enabled).toBe(true)
    expect(component.imagePreview()).toBe('image.jpeg')
  })

  it('should format DUI input correctly', () => {
    const duiInput = component.userForm.get('dui');
    duiInput?.enable();

    const event = { target: { value: '123456789' } };
    component.formatDUI(event);

    expect(duiInput?.value).toBe('12345678-9');
  });

  it('should not submit if image is missing', () => {
    component.userForm.patchValue({
      name: 'Juan',
      hobby: 'Jugar Fifa',
      birthdate: '2010-01-01'
    });
    component.imagePreview.set(null);

    component.onSubmit();

    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should save to localStorage and navigate if valid', () => {
    component.userForm.patchValue({
      name: 'Juan',
      hobby: 'Jugar Fifa',
      birthdate: '1990-01-01',
      dui: '12345678-9'
    });
    component.imagePreview.set('data:image/png;base64,abc');
    component.userForm.get('dui')?.enable();

    component.onSubmit();

    const saved = JSON.parse(localStorage.getItem('user_data') || '{}');
    expect(saved.name).toBe('Juan');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/select-pokemons']);
  });

});
