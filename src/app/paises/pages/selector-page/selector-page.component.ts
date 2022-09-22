import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb. group({
    region: [ '', Validators.required ],
    pais: [ '', Validators.required ]
  })

  //Llenar selectores
  regiones: string[] = [];
  paises: PaisSmall[] = [];

  constructor( private fb: FormBuilder,
               private ps: PaisesService ) { }

  ngOnInit(): void {

    this.regiones = this.ps.regiones;

    //Cuando cambie la region
    this.miFormulario.get('region')?.valueChanges.subscribe( region =>{
      console.log(region);
      this.ps.getPaisesPorRegion( region ).subscribe( paises => {
        console.log( paises );
        this.paises = paises;
      })
    })

  }

  guardar() {
    console.log( this.miFormulario.value );
  }

}
