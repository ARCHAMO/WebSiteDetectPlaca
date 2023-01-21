import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule
    ],
    exports: [
        TableModule,
        ButtonModule,
        InputTextModule
    ]
})
export class SharedPrimengModule { }
