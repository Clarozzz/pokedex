import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Register } from './register';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the welcome title', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.title')?.textContent).toContain('¡Hola! Configuremos tu perfil')
  })

  it('should contiain the register form component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-register-form')).not.toBeNull();
  })

});
