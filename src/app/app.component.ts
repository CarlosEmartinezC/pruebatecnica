import { Component } from '@angular/core';
import { User, Address } from './interface/User.Interface';
import { OnInit } from '@angular/core';
import { UserApiService } from './services/user-api.service';
import { FormBuilder, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { STRING_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-angular-app';
  data: User[] = []
  userForm: FormGroup
  ConsultaForm: FormGroup
  validedform = false
constructor (private UserApiService: UserApiService, private formBuilder: FormBuilder) {
  this.userForm = this.formBuilder.group({
    userId:[]
  }),
    this.ConsultaForm = this.formBuilder.group({
      name: ['' ],
      email: ['', [Validators.required, Validators.email]],
      numberphone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
    })
}
//metodo para llamar los datos y solo obtener del 1 al 5
  ngOnInit(): void {
    this.UserApiService.getData().subscribe(
      (value) => {
        this.data = value.filter(user => user.id >=1 && user.id <= 5)
        console.log('datos obtenidos de la API', this.data)
      },
      (error) => {
        console.log('error a consumir la API')
      }
    )
  }
// formulario de busqueda de usuario
  onSubmit():void {
    if(this.userForm.valid) {
      console.log('formulario valido')
      console.log(this.userForm.value)
      const idstring = this.userForm.get('userId')?.value
      const id = Number(idstring)
      const usuarioSelect = this.data.find(user => user.id === id)
      console.log('dato ingresado en el input: ', usuarioSelect)
    }
  }

// funcion para un formulario Parte 2


  Consultar() {
    console.log('estoy aqui');
    if (this.ConsultaForm.valid) {
      console.log('formulario valido')
      console.log(this.ConsultaForm.value)
    }else {
      
      console.log('datos no validos:', + this.ConsultaForm.value)
    }
  }







}
