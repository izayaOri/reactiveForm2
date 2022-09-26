import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';

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
    region  : [ '', Validators.required ],
    pais    : [ '', Validators.required ],
    frontera: [ '', Validators.required ],
  })

  //Llenar selectores
  regiones  : string[] = [];
  paises    : PaisSmall[] = [];
  fronteras : PaisSmall[] = [];



  //UI
  cargando: boolean = false;

  constructor( private fb: FormBuilder,
               private ps: PaisesService ) { }

  ngOnInit(): void {

    this.regiones = this.ps.regiones;

    //Cuando cambie la region
    // this.miFormulario.get('region')?.valueChanges.subscribe( region =>{
    //   console.log(region);
    //   this.ps.getPaisesPorRegion( region ).subscribe( paises => {
    //     console.log( paises );
    //     this.paises = paises;
    //   })
    // })
    
    this.miFormulario.get('region')?.valueChanges
    .pipe(
      tap( (_) => {
        this.miFormulario.get('pais')?.reset('')
        this.cargando = true;
      }),
      switchMap( region => this.ps.getPaisesPorRegion( region ) )
    )
      .subscribe( paises => {
        this.paises = paises;
        this.cargando = false;
    })

    //Cuando cambie el pais
    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap( () => {
          // this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
          this.cargando = true;
        }),
        switchMap( codigoPais => this.ps.getPaisPorCodigo( codigoPais ) ),
        switchMap( pais => this.ps.getPaisesPorCodigos( pais[0]?.borders! ) )
      )
      .subscribe( paises => {

        this.fronteras = paises;
        this.cargando = false;
        console.log( paises );

      })

  }

  guardar() {
    console.log( this.miFormulario.value );
  }

}
