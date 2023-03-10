import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LecturasRoutingModule } from './lecturas-routing.module';
import { LecturasComponent } from '../lecturas/lecturas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedPrimengModule } from 'src/app/shared-primeng.module';
import { NgxJsonViewerModule } from 'ngx-json-viewer';


@NgModule({
    declarations: [
        LecturasComponent
    ],
    imports: [
        CommonModule,
        LecturasRoutingModule,
        SharedPrimengModule,
        FormsModule,
        ReactiveFormsModule,
        NgxJsonViewerModule
    ]
})
export class LecturasModule { }
