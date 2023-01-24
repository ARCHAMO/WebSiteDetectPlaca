import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculosRoutingModule } from './vehiculos-routing.module';
import { VehiculosComponent } from '../vehiculos/vehiculos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedPrimengModule } from 'src/app/shared-primeng.module';


@NgModule({
  declarations: [
    VehiculosComponent
  ],
  imports: [
    CommonModule,
    VehiculosRoutingModule,
    SharedPrimengModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class VehiculosModule { }
